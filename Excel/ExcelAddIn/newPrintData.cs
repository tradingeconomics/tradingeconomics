using ExcelDna.Integration;
using Microsoft.Office.Interop.Excel;
using Newtonsoft.Json.Linq;
using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;

namespace TE
{
    public class newPrintData
    {
        public Mutex DataWriteMutex = new Mutex();

        public const int CalculationWaitTimeMs = 50;
        public const int MaxCalculationWaitIntervals = 200;
        // Retry wait if excel is busy
        public const int RetryWaitTimeMs = 500;

        private readonly Range _formulaCell;
        private readonly Range _dataStartCell;
        private Worksheet _currentWorksheet => _dataStartCell.Worksheet;
        public readonly string _names;
        public readonly string _key_value;
        public readonly string _curCel;
        public readonly bool _threaded;
        public readonly JArray _data;
        public Range writeRange = null;
        public readonly string _newFormula;
        // Function to display data in excel spreadsheet

        public newPrintData(string names, JArray data, string key_value, Range dataStartCell, string newFormula, Range formulaCell, bool threaded = false)
        {
            _names = names;
            _data = data;
            _key_value = key_value;
            _dataStartCell = dataStartCell;
            _threaded = threaded;
            _newFormula = newFormula;
            _formulaCell = formulaCell;
        }

        private object[,] ConvertNestedListToArray(JArray data, string names)
        {
            
            var newData = new object[data.Count, names.Split(',').Length];

            for (var r = 0; r != data.Count; r++)
                for (var c = 0; c < names.Split(',').Length; c++)
                {
                  try
                    {
                        newData[r, c] = data[r][names.Split(',')[c]];
                    }
                    catch(NullReferenceException )
                    {
                        continue;
                    }
                }            
            return newData;
        }

        public void PopulateData()
        {
            helperClass.log.Info("PopulateData from newPrintData");
            try
             {
                // Acquire Mutex to avoid multiple functions writing at the same time.
                DataWriteMutex.WaitOne();

                // Since this is executing in a thread wait for excel to be finished whatever calculations its currently doing before writing to other cells. Helps avoid some issues.
                if (_threaded)
                {
                    WaitForExcelToBeReady();
                }

                header_to_excel();
                data_to_excel();

                //Writing final dictionary
                WaitForExcelToBeReady();
                Range endCell = _currentWorksheet.Cells[_dataStartCell.Row + _data.Count, _dataStartCell.Column + _names.Split(',').Length - 1];
                Range used = _currentWorksheet.Range[_dataStartCell, endCell];                   
                formulaColumns frmlaColumnsPair2 = new formulaColumns(_newFormula, _names, used, _formulaCell);
                MyRibbon.myFormulasDict[_formulaCell.Address[false, false]] = frmlaColumnsPair2;                

                if (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString()))
                {
                    MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()] = MyRibbon.myFormulasDict;
                }
                else
                {
                    MyRibbon.myMainDict.Add(MyRibbon.sheet.Index.ToString(), MyRibbon.myFormulasDict);
                }
                DataWriteMutex.ReleaseMutex();                
            }
            catch (COMException ex)
            {
                Trace.WriteLine(ex.Message);

                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);

                // Release Mutex to allow another function to write data.
                DataWriteMutex.ReleaseMutex();

                // The excel RPC server is busy. We need to wait and then retry (RPC_E_SERVERCALL_RETRYLATER or VBA_E_IGNORE)
                if (ex.HResult == -2147417846 || ex.HResult == -2146777998)
                {
                    Thread.Sleep(RetryWaitTimeMs);
                    PopulateData();
                    return;
                }

                throw;
            }
            Marshal.ReleaseComObject(MyRibbon.sheet);
            Marshal.ReleaseComObject(MyRibbon.app);
            GC.Collect(); 
            GC.WaitForPendingFinalizers();
            return;
        }

        private void header_to_excel()
        {
            helperClass.log.Info("header_to_excel from newPrintData");
            try
            {
                var endCell = (Range)_currentWorksheet.Cells[_dataStartCell.Row, _dataStartCell.Column + _names.Split(',').Length - 1];
                var dl = (Range)_currentWorksheet.Cells[_dataStartCell.Row, _dataStartCell.Column + 1];
                var writeRange = _currentWorksheet.Range[dl, endCell];
                writeRange.Value2 = _names.Split(',').Skip(1).ToArray();
            }
            catch (Exception ex)
            {
                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                throw;
            }
            
        }

        private void data_to_excel()
        {
            helperClass.log.Info("data_to_excel from newPrintData");
            try
            {
                var endCell = (Range)_currentWorksheet.Cells[_dataStartCell.Row + _data.Count, _dataStartCell.Column + _names.Split(',').Length - 1];
                var writeRange = _currentWorksheet.Range[_dataStartCell[2, 1], endCell];
                var data = ConvertNestedListToArray(_data, _names);
                writeRange.ClearFormats();
                writeRange.Value = data;
                //writeRange.Value = data;
                // This sort method works perfectly !!! Ready to implement only for Historycal data 
                if (helperClass.fromHistorical == true)
                {
                    writeRange.Sort(writeRange.Columns[1], XlSortOrder.xlAscending,
                        writeRange.Columns[2], Type.Missing, XlSortOrder.xlAscending);
                    helperClass.fromHistorical = false;
                }

                if (helperClass.fromCalendar == true)
                {
                    writeRange.Sort(writeRange.Columns[1], XlSortOrder.xlAscending);
                    helperClass.fromCalendar = false;
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                throw;
            }                      
        }

        public void SetCellVolatile(bool value)
        {
            try
            {
                var reference = (ExcelReference)XlCall.Excel(XlCall.xlfCaller);
                XlCall.Excel(XlCall.xlfVolatile, value);
            }
            catch (Exception ex)
            {
                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                throw;
            }
        }


        public void WaitForExcelToBeReady()
        {
            var iterations = 0;
            var calculationState = _currentWorksheet.Application.CalculationState;
            while (calculationState != XlCalculationState.xlDone && iterations < MaxCalculationWaitIntervals)
            {
                Thread.Sleep(CalculationWaitTimeMs);
                MessageBox.Show(calculationState.ToString());
                calculationState = _currentWorksheet.Application.CalculationState;
                iterations++;
            }

            if (iterations >= MaxCalculationWaitIntervals)
            {
                MessageBox.Show("Max wait calculations iterations exceeded.");
                System.Diagnostics.Trace.WriteLine("Max wait calculations iterations exceeded.");
            }
        }
    }
}

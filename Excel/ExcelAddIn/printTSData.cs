using ExcelDna.Integration;
using Microsoft.Office.Interop.Excel;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace testClassLib
{
    public class printTSData
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
        public readonly Dictionary<string, Dictionary<string, string>> _dict;
        public readonly string _key_value;
        public readonly string _curCel;
        public readonly bool _threaded;
        public readonly string _newFormula;

        public Range writeRange = null;
        // Function to display data in excel spreadsheet

        public printTSData(string[] names, Dictionary<string, Dictionary<string, string>> dict, string key_value, Range dataStartCell, string newFormula, Range formulaCell, bool threaded = false)
        {
            _names = String.Join(",", names);
            _dict = dict;
            _key_value = key_value;
            _dataStartCell = dataStartCell;
            _threaded = threaded;
            _formulaCell = formulaCell;
            _newFormula = newFormula;
        }

        private object[,] ConvertDictionaryToArray(Dictionary<string, Dictionary<string, string>> data, string[] names)
        {
            var newData = new object[data.Count, names.Length + 1];
            for (var r = 0; r != data.Count; r++)
             {               
                 newData[r, 0] = data.Keys.ElementAt(r);                
                 for (var c = 0; c < names.Length; c++)
                 {
                    string value ;
                    if (!data[data.Keys.ElementAt(r)].TryGetValue(names[c], out value))
                    {
                        continue;
                    }
                    else
                    {
                        newData[r, c + 1] = data[data.Keys.ElementAt(r)][names[c]];
                    }
                 }
             }
            return newData;
        }

        public static Range used;

        public void PopulateData()
        {
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
                Range endCell = _currentWorksheet.Cells[_dataStartCell.Row + _dict.Count, _dataStartCell.Column + _names.Split(',').Length];
                used = _currentWorksheet.Range[_dataStartCell, endCell];
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
                // Release Mutex to allow another function to write data.
                DataWriteMutex.ReleaseMutex();
            }
            catch (COMException e)
            {
                Trace.WriteLine(e.Message);

                // Release Mutex to allow another function to write data.
                DataWriteMutex.ReleaseMutex();

                // The excel RPC server is busy. We need to wait and then retry (RPC_E_SERVERCALL_RETRYLATER or VBA_E_IGNORE)
                if (e.HResult == -2147417846 || e.HResult == -2146777998)
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
            var endCell = (Range)_currentWorksheet.Cells[_dataStartCell.Row, _dataStartCell.Column + _names.Split(',').Length ];
            var dl = (Range)_currentWorksheet.Cells[_dataStartCell.Row, _dataStartCell.Column + 1];
            var writeRange = _currentWorksheet.Range[dl, endCell];
            writeRange.Value2 = _names.Split(',').ToArray();
        }

        private void data_to_excel()
        {
            var endCell = (Range)_currentWorksheet.Cells[_dataStartCell.Row + _dict.Count, _dataStartCell.Column + _names.Split(',').Length];
            var writeRange = _currentWorksheet.Range[_dataStartCell[2, 1], endCell];            
            string[] stringOld = _names.Split(',');
            var data = ConvertDictionaryToArray(_dict, stringOld);
            writeRange.ClearFormats();
            writeRange.Value = data;
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

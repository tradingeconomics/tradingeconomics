using ExcelDna.Integration;
using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace testClassLib
{
    public class printDataClass
    {

        public static Mutex DataWriteMutex = new Mutex();
                
        public const int CalculationWaitTimeMs = 50;
        public const int MaxCalculationWaitIntervals = 200;

        // Function to display data in excel spreadsheet
        public static void data_to_excel(string[] names, string key_value, string curCel = "", bool threaded = false)
        {
            Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
            Range currentCell;
            if (helperClass.origin == true)
            {
                currentCell = app.ActiveCell;
            }
            else
            {
                currentCell = helperClass.cellRange;
            }

            helperClass.log.Info("Starting display data on Excel");
            try
            {
                helperClass.log.Info("Current cell row is {0}. From try", currentCell.Row);
                helperClass.log.Info("Current cell column is {0}. From try", currentCell.Column);
                helperClass.log.Info("Number of rows is {0}. From try", helperClass.o.Count);
                DataWriteMutex.WaitOne();

                for (int i = 0; i < helperClass.o.Count; i++)
                {
                   

                    if (i == 0)
                    {
                        threaded = true;
                    }
                    else
                    {
                        threaded = false;
                    }

                    if (threaded)
                    {
                        WaitForExcelToBeReady();
                    }

                    for (int j = 0; j < names.Length; j++)
                    {
                       
                        if(!currentCell[i + 2, j + 1].HasFormula)
                        {
                            try
                            {
                                currentCell[i + 2, j + 1].ClearFormats();
                            }
                            catch (Exception e)
                            {
                                helperClass.log.Error(e.Message);
                                helperClass.log.Trace(e.StackTrace);
                                DataWriteMutex.ReleaseMutex();
                                throw;
                            }
                            try
                            {
                                currentCell[i + 2, j + 1].ClearContents();
                            }
                            catch (Exception e)
                            {
                                helperClass.log.Error(e.Message);
                                helperClass.log.Trace(e.StackTrace);
                                DataWriteMutex.ReleaseMutex();
                                throw;
                            }
                            currentCell[1, j + 1].Font.Bold = true;

                            if (j > 0)
                            {
                                currentCell[1, j + 1].Value2 = names[j];
                            }
                            currentCell[2 + i, j + 1] = helperClass.o[i][names[j]];
                        }
                        else
                        {
                            MessageBox.Show("Not allowed to overlap existing formula.");
                            currentCell[2 + i, j + 1].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.Red);
                            return;
                        }
                    }                                     
                }
                
            }
            catch (Exception e)
            {
                helperClass.log.Error(e.Message);
                helperClass.log.Trace(e.StackTrace);
                throw;
            }
            string note = "";
            if (key_value == "guest:guest")
            {
                helperClass.log.Info("This user is a guest user");
                note = "Note: You are using a guest account with limited and random data";
                currentCell[helperClass.o.Count + 2, 1].Font.Bold = true;
                currentCell[helperClass.o.Count + 2, 1].Font.Color = System.Drawing.ColorTranslator.ToOle(System.Drawing.Color.Red);
                currentCell[helperClass.o.Count + 2, 1].Value2 = note;       
            }
            helperClass.log.Info("All requested data is printed");
            DataWriteMutex.ReleaseMutex();
        }

        public static void SetCellVolatile(bool value)
        {
            try
            {
                var reference = (ExcelReference)XlCall.Excel(XlCall.xlfCaller);
                XlCall.Excel(XlCall.xlfVolatile, value);
            }
            catch(Exception ex)
            {
                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                throw;
            }
            
        }
        
        public static void WaitForExcelToBeReady()
        {
            Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
            Microsoft.Office.Interop.Excel.Range currentCell = app.ActiveCell;
            Worksheet _currentWorksheet = currentCell.Worksheet;

            var iterations = 0;
            var calculationState = _currentWorksheet.Application.CalculationState;
            while (calculationState != XlCalculationState.xlDone && iterations < MaxCalculationWaitIntervals)
            {
                Thread.Sleep(CalculationWaitTimeMs);
                calculationState = _currentWorksheet.Application.CalculationState;
                iterations++;
            }

            if (iterations >= MaxCalculationWaitIntervals)
            {
                System.Diagnostics.Trace.WriteLine("Max wait calculations iterations exceeded.");
            }
        }

       
        public static void PopulateGrid( int rowOffset = 0, int colOffset = 0)
        {
            MessageBox.Show("2");
            Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
            Microsoft.Office.Interop.Excel.Range currentCell = app.ActiveCell;            
            Microsoft.Office.Interop.Excel.Worksheet currentSheet = app.ActiveSheet;
            MessageBox.Show("2b");
            var rowStart = rowOffset + currentCell.Row;
            var columnStart = colOffset + currentCell.Column;
            var startCell = (Range)currentSheet.Cells[rowStart, columnStart];
            MessageBox.Show("2c");
            WriteDataToGrid(startCell);
        }
        private static void WriteDataToGrid( Range startCell)
        {
            MessageBox.Show("3");
            Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
            Microsoft.Office.Interop.Excel.Worksheet currentSheet = app.ActiveSheet;

            var data = helperClass.histNames;

            try
            {
                MessageBox.Show("4");
                MessageBox.Show(startCell.Row.ToString());
                MessageBox.Show(startCell.Column.ToString());
                MessageBox.Show(data.GetLength(0).ToString());
                var endCell = (Range)currentSheet.Cells[startCell.Row , startCell.Column + data.GetLength(0) - 1];
                MessageBox.Show("5");
                var writeRange = currentSheet.Range[startCell, endCell];

                writeRange.Value2 = data;

            }
            catch (System.Runtime.InteropServices.COMException e)
            {
                System.Diagnostics.Trace.WriteLine(e.Message);
                throw;
            }
        }

    }
}

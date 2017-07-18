using ExcelDna.Integration;
using ExcelDna.Integration.CustomUI;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using System.IO;
using System.Reflection;
using Microsoft.Office.Interop.Excel;

using NLog;
using NLog.Targets;

namespace TE
{
    [ComVisible(true)]
    public class MyRibbon : ExcelRibbon
    {
        private IRibbonUI ribbon = null;
        public static Dictionary<string, Dictionary<string, formulaColumns>> myMainDict;
        public static Dictionary<string, formulaColumns> myFormulasDict;
        public static Dictionary<string, formulaColumns> myNewDict;
        public static string selectedItem;
        public static readonly string[] UserDefinedFunctions = { "TECalendar", "TEMarkets", "TEIndicators", "TEForecasts", "TEHistorical", "TESeries" };
        public static bool refresh = false;

        public static Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
        public static Worksheet sheet;
        public static Range cellRange;

        public void OnLoad(IRibbonUI ribbon)
        {
            this.ribbon = ribbon;
            myMainDict = new Dictionary<string, Dictionary<string, formulaColumns>>();
            myFormulasDict = new Dictionary<string, formulaColumns>();
        }


        public void OnMarkets2ButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Markets2 button is pressed");
            
            try
            {
                cellRange = app.ActiveCell;
            }
            catch (Exception)
            {
                app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                cellRange = app.ActiveCell;
            }
            helperClass.runFormula = "RunAutomatically = 1";

            switch (control.Id)
            {
                case "btnM_1": selectedItem = "currency" ; break;
                case "btnM_2": selectedItem = "index"; break;
                case "btnM_3": selectedItem = "commodities"; break;
                case "btnM_4": selectedItem = "bonds"; break;
                default: MessageBox.Show("There was a problem."); break;
            }

            helperClass.log.Info("Selected market is {0}", selectedItem);
            string newColumns;
            if (MyRibbon.selectedItem == "bonds")
            {
                newColumns = String.Join(",", helperClass.bondsNames);                
            }
            else
            {
                newColumns = String.Join(",", helperClass.marketsNames);
            }

            cellRange = helperClass.CellAddress(app.ActiveCell.Address[false, false].ToString());
            string fmFin = string.Format("=TEMarkets( \"{0}\", \"{1}\", {2})",
                selectedItem, 
                newColumns,
                cellRange[2, 2].Address[false, false, XlReferenceStyle.xlA1]);
            helperClass.log.Info("Formula {0}", fmFin);
            cellRange.Formula = fmFin;

        }

        public void OnIndicatorsButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Indicators button is pressed");
            var ifrm = new indicatorsFrm();
                ifrm.ShowDialog();
        }


        public void OnCalendarButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Calendar button is pressed");
                var cFrm = new calendarFrm();
                cFrm.ShowDialog();
        }


        public void OnForecastsButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Forecasts button is pressed");
            var fFrm = new forecastsFrm();
                fFrm.ShowDialog();
        }


        public void OnHistoricalButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Historical button is pressed");
            var hFrm = new historicalFrm();
                hFrm.ShowDialog();
        }

        
        public void OnRefreshButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Refresh button is pressed");
            try
            {
                sheet = app.ActiveSheet;
            }
            catch (Exception)
            {
                app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                sheet = app.ActiveSheet;
            }            
            find_formula(sheet);
            //InitTimer();
        }

       

        public static void find_formula(Worksheet worksheet)
        {
            helperClass.log.Info("Starting find_formula(Class1)");
            Range range;
            try
            {
                range = worksheet.UsedRange.SpecialCells(XlCellType.xlCellTypeFormulas);
            }
                catch(COMException)
            {
                MessageBox.Show("No TradingEconomics formula's were found to update.");
                return;
            }
           
            foreach (Range c in range.Cells)
            {
                if (c.HasFormula)
                {
                    helperClass.runFormula = "RunAutomatically = 1";
                    refresh = true;
                    worksheet.Cells[c.Row, c.Column] = c.Formula;
                    while (worksheet.Application.CalculationState != XlCalculationState.xlDone) { }
                }
            }
        }

        public  string getLabelApi(IRibbonControl control)
        {
            return ((apiKeyFrm.validApiKey == true) ? "Logout" : "Login");
        }

        public Bitmap MyGetImage(IRibbonControl control)
        {
            Assembly _assembly;
            Stream _imageStream;
            
            _assembly = Assembly.GetExecutingAssembly();
            _imageStream = _assembly.GetManifestResourceStream("TE.red2.png");
            Bitmap red = new Bitmap(_imageStream);

            _imageStream = _assembly.GetManifestResourceStream("TE.green2.png");
            Bitmap green = new Bitmap(_imageStream);

            return ((apiKeyFrm.validApiKey == true) ? new Bitmap(red) : new Bitmap(green));
            
        }

        public bool getState(IRibbonControl control)
        {
            return ((apiKeyFrm.validApiKey == true) ? true : false);
        }


        public void OnApiKeyButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Api key button is pressed");
            if (apiKeyFrm.validApiKey == true)
            {
                apiKeyFrm.validApiKey = false;
                ribbon.Invalidate();
            }
            else
            {
                var apkFrm = new apiKeyFrm();
                apkFrm.ShowDialog();
                if (ribbon != null)
                {
                    ribbon.Invalidate();                    
                }
            }           
        }


        public void OnCallButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Call button is pressed");
            System.Diagnostics.Process.Start("http://tradingeconomics.com/contact.aspx?subject=excel");
        }

        public void OnHelpButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Help button is pressed");
            System.Diagnostics.Process.Start("http://github.com/ieconomics/excel-addin/wiki");
        }

        public void OnAboutButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On About button is pressed");
            MessageBox.Show("The Trading Economics Application Programming Interface (API) provides direct access to 300.000 economic indicators, exchange rates, stock market indexes, government bond yields and commodity prices. Youre Trading Economics Excel Add In Version: 1.2.4", "About");
        }
    }
}

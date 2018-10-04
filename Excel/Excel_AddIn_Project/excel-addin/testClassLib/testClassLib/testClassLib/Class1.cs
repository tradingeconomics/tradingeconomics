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

//using NLog;
//using NLog.Targets;

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
        public static bool refresh = false;

        public static Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
        public static Worksheet sheet;
        public static Range cellRange;
        public static string fCellText;

        public void OnLoad(IRibbonUI ribbon)
        {
            try
            {
                this.ribbon = ribbon;
                myMainDict = new Dictionary<string, Dictionary<string, formulaColumns>>();
                myFormulasDict = new Dictionary<string, formulaColumns>();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        public void OnMarkets2ButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("Markets button pressed.");
            try
            {
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
                    case "btnM_1": selectedItem = "currency"; break;
                    case "btnM_2": selectedItem = "index"; break;
                    case "btnM_3": selectedItem = "commodities"; break;
                    case "btnM_4": selectedItem = "bond"; break;
                    default: MessageBox.Show("There was a problem."); break;
                }

                string newColumns = (MyRibbon.selectedItem == "bond") ? 
                    String.Join(",", helperClass.bondsNames) : String.Join(",", helperClass.marketsNames);

                cellRange = helperClass.CellAddress(app.ActiveCell.Address[false, false].ToString());
                string fmFin = string.Format("=TEMarkets( \"{0}\", \"{1}\", {2})",
                    selectedItem,
                    newColumns,
                    cellRange[2, 2].Address[false, false, XlReferenceStyle.xlA1]);
                cellRange.Formula = fmFin;
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }           
        }

        public void OnIndicatorsButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("Indicators button pressed.");
            try
            {               
                var ifrm = new indicatorsFrm();
                ifrm.ShowDialog();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        public void OnCalendarButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("Calendar button pressed.");
            try
            {
                var cFrm = new calendarFrm();
                cFrm.ShowDialog();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }           
        }

        public void OnForecastsButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("Forecasts button pressed.");
            try
            {
                var fFrm = new forecastsFrm();
                fFrm.ShowDialog();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }           
        }

        public void OnHistoricalButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("Historical button pressed.");
            try
            {
                var hFrm = new historicalFrm();
                hFrm.ShowDialog();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }           
        }
        
        public void OnRefreshButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("Refresh button pressed.");
            try
            {
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
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        public void SearchEnginePressed(IRibbonControl control)
        {
            helperClass.log.Info("Search button pressed.");
            try
            {
                var srchFrm = new SearchEngine();
                srchFrm.ShowDialog();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }        

        public static void find_formula(Worksheet worksheet)
        {
            try
            {
                Range range;
                try
                {
                    range = worksheet.UsedRange.SpecialCells(XlCellType.xlCellTypeFormulas);
                }
                catch (COMException)
                {
                    MessageBox.Show("No TradingEconomics formula's were found to update.");
                    return;
                }

                foreach (Range c in range.Cells)
                {
                    if (c.HasFormula)
                    {
                        fCellText = c.Text;
                        helperClass.runFormula = "RunAutomatically = 1";
                        refresh = true;
                        worksheet.Cells[c.Row, c.Column] = c.Formula;

                        //Was causing a deadLock. Do I remove this part? 
                        /*while (worksheet.Application.CalculationState != XlCalculationState.xlDone) {
                            System.Threading.Thread.Sleep(500);

                        }  */
                        System.Threading.Thread.Sleep(500);
                    }
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
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

        /*public bool getStateRefresh(IRibbonControl control)
        {
            return ((apiKeyFrm.validApiKey == true) ? true : false);
        }*/

        public void OnApiKeyButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("API key button pressed.");
            try
            {
                //helperClass.log.Info("On Api key button is pressed");
                if (apiKeyFrm.validApiKey == true)
                {
                    apiKeyFrm.validApiKey = false;
                    ribbon.Invalidate();
                }
                else
                {
                    var apkFrm = new apiKeyFrm();
                    apkFrm.ShowDialog();
                    if (ribbon != null) ribbon.Invalidate();
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        public void OnAboutButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("About button pressed.");
            try
            {
                //helperClass.log.Info("On About button is pressed");
                var about = new About();
                about.ShowDialog();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }
    }
}

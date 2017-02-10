using ExcelDna.Integration;
using ExcelDna.Integration.CustomUI;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using System.Reflection;


namespace testClassLib
{
    [ComVisible(true)]
    public class MyRibbon : ExcelRibbon
    {

        private IRibbonUI ribbon = null;

        public void OnLoad(IRibbonUI ribbon)
        {
            this.ribbon = ribbon;
        }

        public static string selectedItem;
        public void OnMarkets2ButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Markets2 button is pressed");

            Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
            helperClass.cellRange = app.ActiveCell;
            helperClass.runFormula = "RunAutomatically = 1";
            string rnFm = "RunAutomatically = 0";

            switch (control.Id)
            {
                case "btnM_1": selectedItem = "currency" ; break;
                case "btnM_2": selectedItem = "index"; break;
                case "btnM_3": selectedItem = "commodities"; break;
                case "btnM_4": selectedItem = "bonds"; break;
                default: MessageBox.Show("There was a problem."); break;
            }
            helperClass.log.Info("Selected market is {0}", selectedItem);
            string fmFin = string.Format("=TEMarkets( \"{0}\", \"{1}\")",
                selectedItem, rnFm);
            helperClass.log.Info("Formula {0}", fmFin);
            helperClass.cellRange.Formula = fmFin;

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



        public  string getLabelApi(IRibbonControl control)
        {
            return ((apiKeyFrm.validApiKey == true) ? "Logout" : "Login");
        }

        public Bitmap MyGetImage(IRibbonControl control)
        {
            Assembly _assembly;
            Stream _imageStream;
            

            _assembly = Assembly.GetExecutingAssembly();
            _imageStream = _assembly.GetManifestResourceStream("testClassLib.red2.png");
            Bitmap red = new Bitmap(_imageStream);

            _imageStream = _assembly.GetManifestResourceStream("testClassLib.green2.png");
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
            System.Diagnostics.Process.Start("http://www.tradingeconomics.com/contact.aspx?subject=excel");
        }

        public void OnHelpButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On Help button is pressed");
            System.Diagnostics.Process.Start("https://github.com/ieconomics/excel-addin/wiki");
        }

        public void OnAboutButtonPressed(IRibbonControl control)
        {
            helperClass.log.Info("On About button is pressed");
            System.Diagnostics.Process.Start("http://www.tradingeconomics.com/about-te.aspx");
        }
    }
}

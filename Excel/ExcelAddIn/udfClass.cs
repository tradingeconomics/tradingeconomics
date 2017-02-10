using ExcelDna.Integration;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Windows.Forms;
using System.Threading;

namespace testClassLib
{
    public class udfClass
    {
        public static Mutex DataWriteMutex = new Mutex();

        public static string url;
        public static string host = helperClass.host;

        [ExcelFunction(Name = "TEMarkets", IsMacroType = true, IsThreadSafe = true)]
        public static string teGetMarkets(string mrkt, string runFrmla = "RunAutomatically = 0")
        {
            string run = helperClass.AutoRun(runFrmla);
            if (run == "RunAutomatically = 1")
            {
                helperClass.log.Info("udfClass_Markets code is starting");
                string key = Properties.Settings.Default["userApiKey"].ToString();
                url = host + "markets/" + mrkt + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                {
                    helperClass.parsed_json(url);

                    string[] names;
                    if (MyRibbon.selectedItem == "bonds")
                        names = helperClass.bondsNames;
                    else
                        names = helperClass.marketsNames;

                    if (helperClass.o.Count == 0)
                    {
                        MessageBox.Show("No data provided for selected parameters");
                    }
                    else
                    {
                        helperClass.log.Info("Starting function data_to_excel");
                        printDataClass.data_to_excel(names, key);
                    }
                }
            }
            helperClass.log.Info("Printing current cell value and finishing process");
            helperClass.runFormula = "RunAutomatically = 0";
            
            return "Symbol";
        }




        [ExcelFunction(Name = "TEIndicators", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetIndicators(string cntry = "", string indctr = "", string runFrmla = "RunAutomatically = 0")
        {
            string run = helperClass.AutoRun(runFrmla);

            if (run == "RunAutomatically = 1")
            {
                helperClass.log.Info("udfClass_Indicators code is starting");
                string key = Properties.Settings.Default["userApiKey"].ToString();
                if (cntry.Length == 0 & indctr.Length == 0)
                {
                    url = host + "indicators?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else if (cntry.Length != 0 & indctr.Length == 0)
                {
                    url = host + "country/" + cntry + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else
                {
                    url = host + "country/" + cntry + "/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }

                helperClass.parsed_json(url);
                if (helperClass.o.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.log.Info("Starting function data_to_excel");
                    printDataClass.data_to_excel(helperClass.indNames, key);
                }
            }
            helperClass.log.Info("Printing current cell value and finishing process");
            helperClass.runFormula = "RunAutomatically = 0";
            helperClass.origin = true;
            return "Country";
        }

            
        [ExcelFunction(Name = "TECalendar", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetCalendar(string cntry = "", string indctr = "", string startDate = "", string endDate = "", 
                                            string runFrmla = "RunAutomatically = 0")
        {
            string run = helperClass.AutoRun(runFrmla);

          
            if (run == "RunAutomatically = 1")               
            {
                helperClass.log.Info("udfClass_Calendar code is starting");

                string key = Properties.Settings.Default["userApiKey"].ToString();
                if (cntry.Length == 0 & indctr.Length == 0)
                {
                    url = host + "calendar/country/All/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else if (cntry.Length != 0 & indctr.Length == 0)
                {
                    url = host + "calendar/country/" + cntry + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else if (cntry.Length == 0 & indctr.Length != 0)
                {
                    url = host + "calendar/indicator/" + indctr + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else if (cntry.Length != 0 & indctr.Length != 0)
                {
                    url = host + "calendar/country/" + cntry + "/indicator/" + indctr + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }

                helperClass.parsed_json(url);
                
                if (helperClass.o.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                   
                }
                else
                {                    
                    helperClass.log.Info("Starting function data_to_excel");
                    printDataClass.data_to_excel(helperClass.calendNames, key);
                    
                }
            }
            helperClass.log.Info("Printing current cell value and finishing process");
            helperClass.runFormula = "RunAutomatically = 0";
            helperClass.origin = true;
            return "Date";
        }

        [ExcelFunction(Name = "TEForecasts", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetForecasts(string cntry = "", string indctr = "", string runFrmla = "RunAutomatically = 0")
        {
            string run = helperClass.AutoRun(runFrmla);
            if (run == "RunAutomatically = 1")
            {
                helperClass.log.Info("udfClass_Forecasts code is starting");
                string key = Properties.Settings.Default["userApiKey"].ToString();
                if (cntry.Length == 0)
                {
                    url = host + "forecast/indicator/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else if (indctr.Length == 0)
                {
                    url = host + "forecast/country/" + cntry + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else
                {
                    url = host + "forecast/country/" + cntry + "/indicator/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }

                helperClass.parsed_json(url);
                if (helperClass.o.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.log.Info("Starting function data_to_excel");
                    printDataClass.data_to_excel(helperClass.forcNames, key);
                }
            }
            helperClass.log.Info("Printing current cell value and finishing process");
            helperClass.runFormula = "RunAutomatically = 0";
            helperClass.origin = true;
            return "Country";
        }

  

        [ExcelFunction(Name = "TEHistorical", IsMacroType = true, IsThreadSafe = true, IsVolatile = false)]
        public static string teGetHistorical(string cntry = "", string indctr = "", string startDate = "", string endDate = "", string runFrmla = "RunAutomatically = 0")
        {
            string run = helperClass.AutoRun(runFrmla);

            if(run == "RunAutomatically = 1")
            {
                printDataClass.SetCellVolatile(false);
                helperClass.log.Info("udfClass_Historical code is starting");

                string key = Properties.Settings.Default["userApiKey"].ToString();
                if (startDate == null & endDate == null)
                {
                    endDate = DateTime.Today.AddYears(0).ToString();
                    url = host + "historical/country/" + cntry + "/indicator/" + indctr + "/" + startDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else if (startDate != null & endDate == null)
                {
                    endDate = DateTime.Today.ToString("d");
                    url = host + "historical/country/" + cntry + "/indicator/" + indctr + "/" + startDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else if (startDate == null & endDate != null)
                {
                    startDate = DateTime.Today.AddYears(-10).ToString();
                    url = host + "historical/country/" + cntry + "/indicator/" + indctr + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }
                else
                {
                    url = host + "historical/country/" + cntry + "/indicator/" + indctr + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                }

                helperClass.parsed_json(url);
                if (helperClass.o.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.log.Info("Starting function data_to_excel");
                    printDataClass.data_to_excel(helperClass.histNames, key);
                }
                helperClass.log.Info("Printing current cell value and finishing process");
            }
   
            try
            {
                helperClass.log.Info("historical finish");
                helperClass.runFormula = "RunAutomatically = 0";
                helperClass.origin = true;
                return "Country";
            }
            catch (Exception ex)
            {
                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                throw;
            }           
        }               
    }
}

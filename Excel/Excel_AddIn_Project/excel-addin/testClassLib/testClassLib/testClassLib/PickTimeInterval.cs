using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Threading;
using System.Windows.Forms;

namespace TE
{
    public partial class PickTimeInterval : Form
    {
        public static Mutex DataWriteMutex = new Mutex();
        public static bool fromSearch = false;
        public static bool fromWinForm = false;
        public static string searchAnswer;

        string startUrl = "https://brains.tradingeconomics.com/v2/search/";//"http://daedalus:3000/v2/search/";
        string endtUrl = "&pp=100&nogroup=Overview;Financial%20Statements&app=excel";
        int page;
        int rowsNumber;
        int totalPages;
        int maxPage;
        JObject myTabList;
		
		string start_date = DateTime.Now.AddDays(-10).ToString("yyyy/MM/dd");
		string end_date = DateTime.Now.ToString("yyyy/MM/dd");
        System.Windows.Forms.ListBox searchResults;

        public PickTimeInterval(System.Windows.Forms.ListBox searchResults, JObject myTabList)
        {
                            // search engine passes searchresults as argument to picktimeinterval contructor.
            try
            {
                InitializeComponent();
                page = 0;
                this.searchResults = searchResults;
                this.myTabList = myTabList;
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }           

       

        private void DataBtn_Click(object sender, EventArgs e)
        {
            try
            {
                fromWinForm = true;
                string country = "";
                int i = searchResults.SelectedIndex;
                var idx = searchResults.SelectedItem.ToString().LastIndexOf("(");
				string result = "";
				if (idx < 1)
					result = searchResults.SelectedItem.ToString();
				else
					result = searchResults.SelectedItem.ToString().Substring(0, idx).Trim();

				if (result == myTabList["hits"][i]["pretty_name"].ToString().Trim())
                {
                    //helperClass.log.Info("Let's GO");
                    if (!String.IsNullOrEmpty(myTabList["hits"][i]["country"].ToString()))
                    {
                        country = (helperClass.myCountrysDict.ContainsKey(myTabList["hits"][i]["country"][0].ToString())) ?
                            helperClass.myCountrysDict[myTabList["hits"][i]["country"][0].ToString()] : myTabList["hits"][i]["country"][0].ToString();
                    }
                    
                    string[] allMarkets = { "commodity", "idx", "forex", "bond", "equity" };
                    string[] newMarkets = { "fred", "wb", "comtrade", "mkt"};

                    searchAnswer = (myTabList["hits"][i]["unit"].ToString().Length < 1) ?
                         myTabList["hits"][i]["pretty_name"].ToString() :
                          myTabList["hits"][i]["pretty_name"].ToString() + " in "
                        + myTabList["hits"][i]["unit"][0].ToString();

                    if (allMarkets.Contains(myTabList["hits"][i]["type"].ToString()))
                    {
                        helperClass.formula = string.Format("=TEMrktsHist( \"{0}\",\"{1}\", \"{2}\", \"{3}\", \"{4}\", {5})",
                            "historical",
                            myTabList["hits"][i]["s"],
                            String.Join(",", helperClass.MarketHistColumns),
                            start_date,
                            end_date,
                            helperClass.CellAddress(helperClass.RangeAddress())[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);

                        helperClass.log.Info(helperClass.formula);

                    }
                    else if (newMarkets.Contains(myTabList["hits"][i]["type"].ToString()))
                    {
                        string myCat;
                        switch (myTabList["hits"][i]["type"].ToString())
                        {
                            case "wb": myCat = "worldBank"; break;
                            case "fred": myCat = "fred"; break;
                            case "comtrade": myCat = "comtrade"; break;
                            case "mkt": myCat = "markets"; break;
                            default: myCat = ""; break;
                        }
                        string newMarketsCols = (myCat == "markets") ? 
                            String.Join(",", helperClass.MarketHistColumns) : String.Join(",", helperClass.fredColumns);
                        
                            helperClass.formula = string.Format("=TEMrktsHist( \"{0}\",\"{1}\",\"{2}\", \"{3}\", \"{4}\", {5})",
                            myCat,
                            myTabList["hits"][i]["s"].ToString().Replace(":wb", "").Replace(":fred", ""),
                            newMarketsCols,
                            start_date,
                            end_date,
                            helperClass.CellAddress(helperClass.RangeAddress())[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);
                    }
                   
                    MyRibbon.cellRange = helperClass.CellAddress(helperClass.RangeAddress());
                    MyRibbon.cellRange.Formula = helperClass.formula;
                }
                
                Close();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }                        
        }
		

        private void selectedIndicator_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            DataBtn_Click(sender, e);
        }

        private void SearchEngine_Load(object sender, EventArgs e)
        {

        }

      
        private void dateTimePicker2_ValueChanged(object sender, EventArgs e)
        {
            end_date = dateTimePicker2.Value.ToString("yyyy-MM-dd");
        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void dateTimePicker1_ValueChanged_1(object sender, EventArgs e)
        {
            start_date = dateTimePicker1.Value.ToString("yyyy-MM-dd");
        }
    }
}

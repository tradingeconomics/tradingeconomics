using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
//using System.ComponentModel;
using System.Data;
using System.Drawing;
//using System.Diagnostics;
//using System.Drawing;
//using System.IO;
using System.Linq;
using System.Net;
//using System.Text;
using System.Threading;
//using System.Threading.Tasks;
using System.Windows.Forms;
//using Microsoft.Office.Interop.Excel;
//using ExcelDna.Integration;

namespace TE
{
    public partial class SearchEngine : Form
    {
        public static Mutex DataWriteMutex = new Mutex();
        public static bool fromSearch = false;
        public static string searchAnswer;

        //string startUrl = "https://ieconomics.com/brains/more?q=";
        string startUrl = "https://brains.tradingeconomics.com/v1/search/";
        string endtUrl = "&pp=100&app=excel";
        int page;
        int rowsNumber;
        int totalPages;
        public SearchEngine()
        {
            InitializeComponent();
            page = 0;
            //searchResults.DrawMode = DrawMode.OwnerDrawFixed;
            //this.searchResults.DrawItem +=
              //  new System.Windows.Forms.DrawItemEventHandler(this.searchResults_DrawItem);


            this.search.KeyDown += new KeyEventHandler(search_KeyDown);
            this.searchResults.KeyDown += new KeyEventHandler(searchResults_KeyDown);
            this.pageBox.KeyDown += new KeyEventHandler(pageBox_KeyDown);
            this.searchResults.MouseDoubleClick += new MouseEventHandler(selectedIndicator_MouseDoubleClick);
        }

        JObject myTabList;

        private void populateResultsList_2(string URL)
        {
            helperClass.log.Info("SearchEngine - request, URL = " + URL);
            searchResults.Items.Clear();
            using (WebClient wc = new WebClient())
            {
                helperClass.log.Trace(URL);
                var json = wc.DownloadString(URL);
                myTabList = JObject.Parse(json);

                for (int h = 0; h < myTabList["hits"].Count(); h++)
                {
                    string unit = (
                        !String.IsNullOrEmpty(myTabList["hits"][h]["unit"].ToString())) ? 
                        myTabList["hits"][h]["unit"].ToString() : "--";

                    string frequency = (
                        !String.IsNullOrEmpty(myTabList["hits"][h]["frequency"].ToString())) ?
                        myTabList["hits"][h]["frequency"].ToString() : "--";

                    searchResults.Items.Insert(h, myTabList["hits"][h]["pretty_name"].ToString() + "  (" + unit + "/" + frequency + ")");
                } 
            }
            if (searchResults.Items.Count == 0)
            {
                MessageBox.Show("No data provided for inserted keyword");
            }
            else
            {
                searchResults.SetSelected(0, true);
                rowsNumber = Int32.Parse(myTabList["info"]["hits"].ToString());
                totalPages = (rowsNumber + 100 - 1) / 100;
            }            
        }

        private void searchBtn_Click(object sender, EventArgs e)
        {
            searchResults.Items.Clear();
            filterResults.Items.Clear();
            if (search.Text == "")
            {
                MessageBox.Show("Please insert search keyword");
                search.Select();
            }
            else
            {
                string url = startUrl + "more?q=" + search.Text + "&t=all&p=" + page.ToString() + endtUrl;
                populateResultsList_2(url);
                
                using (WebClient wc = new WebClient())
                {
                    //var tabJson = wc.DownloadString("https://ieconomics.com/brains/all?q=" + search.Text);
                    JObject tabJson = JObject.Parse(wc.DownloadString("https://brains.tradingeconomics.com/v1/search/all?q=" + search.Text + "&app=excel"));

                    IList<string> keys = tabJson.Properties().Select(p => p.Name).ToList();

                    for (int i = 0; i < keys.Count - 1; i++)
                    {
                        filterResults.Items.Insert(i, helperClass.searchTabs[keys[i]].ToString() +
                            "  (" + tabJson[keys[i]]["info"]["hits"].ToString() + ")");
                    }
                }
                
                if (filterResults.Items.Count == 0)
                {
                    MessageBox.Show("No data provided for inserted keyword");
                }
                else
                {
                    nextPage.Enabled = true;
                    previousPage.Enabled = true;
                    firstPage.Enabled = true;
                    lastPage.Enabled = true;
                    pageBox.Enabled = true;
                    getDataBtn.Enabled = true;
                    
                    filterResults.SetItemChecked(0, true);
                    pageBox.Text = (page + 1).ToString();
                }
            }            
        }

        private void getDataBtn_Click(object sender, EventArgs e)
        {
            if (searchResults.SelectedItems.Count == 0)
            {
                MessageBox.Show("Select something");
            }
            else
            {
                string country;
                int i = searchResults.SelectedIndex;
                
                if (searchResults.SelectedItem.ToString().Split(new[] { "  " }, StringSplitOptions.None)[0] == myTabList["hits"][i]["pretty_name"].ToString())
                {
                    country = (helperClass.myCountrysDict.ContainsKey(myTabList["hits"][i]["country"].ToString())) ?
                        helperClass.myCountrysDict[myTabList["hits"][i]["country"].ToString()] : myTabList["hits"][i]["country"].ToString();

                    string[] allMarkets = { "commodity", "index", "forex", "bond", "equity"};
                    string[] newMarkets = { "fred", "wb", "comtrade" };

                    /*searchAnswer = (myTabList["hits"][i]["unit"].ToString().Length < 1) ?
                         myTabList["hits"][i]["country"].ToString() + " " + myTabList["hits"][i]["category"].ToString():
                          myTabList["hits"][i]["country"].ToString() + " "
                        + myTabList["hits"][i]["category"].ToString() + " in "
                        + myTabList["hits"][i]["unit"].ToString();*/


                    searchAnswer = (myTabList["hits"][i]["unit"].ToString().Length < 1) ?
                         myTabList["hits"][i]["pretty_name"].ToString() :
                          myTabList["hits"][i]["pretty_name"].ToString() + " in "
                        + myTabList["hits"][i]["unit"].ToString(); 


                    if (allMarkets.Contains(myTabList["hits"][i]["type"].ToString()))
                    {
                        helperClass.formula = string.Format("=TEMrktsHist( \"{0}\",\"{1}\", \"{2}\", {3})",
                            "historical",
                            myTabList["hits"][i]["s"],
                            String.Join(",", helperClass.MarketHistColumns),
                            helperClass.CellAddress(helperClass.RangeAddress())[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);
                    }
                    else if (newMarkets.Contains(myTabList["hits"][i]["type"].ToString()))
                    {
                        string myCat;// = (myTabList["hits"][i]["type"].ToString() == "wb") ? "worldBank" : "fred";

                        switch (myTabList["hits"][i]["type"].ToString())
                        {
                            case "wb": myCat = "worldBank"; break;
                            case "fred": myCat = "fred"; break;
                            case "comtrade": myCat = "comtrade"; break;
                            default: myCat = ""; break;
                        }

                        helperClass.formula = string.Format("=TEMrktsHist( \"{0}\",\"{1}\", \"{2}\", {3})",
                            myCat,
                            myTabList["hits"][i]["s"].ToString().Replace(":wb", "").Replace(":fred", ""),
                            String.Join(",", helperClass.fredColumns),
                            helperClass.CellAddress(helperClass.RangeAddress())[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);                        

                    }
                    else if (myTabList["hits"][i]["type"].ToString() == "economic")
                    {
                        helperClass.formula = string.Format("=SearchEconomy( \"{0}\", \"{1}\", \"{2}\", {3})",
                            country,
                            myTabList["hits"][i]["category"],
                            String.Join(",", helperClass.histNames),
                            helperClass.CellAddress(helperClass.RangeAddress())[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);
                    }
                    else
                    {
                        helperClass.formula = string.Format("=TESeries( \"{0}\", \"{1}\", {2})",
                            country,
                            myTabList["hits"][i]["category"],
                            helperClass.CellAddress(helperClass.RangeAddress())[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);
                    }
                    helperClass.log.Info("Formula {0}", helperClass.formula);
                    MyRibbon.cellRange = helperClass.CellAddress(helperClass.RangeAddress());
                    MyRibbon.cellRange.Formula = helperClass.formula;
                }
                Close();
            }            
        }

        private void search_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                searchBtn_Click(sender, e);

                e.Handled = true;
                e.SuppressKeyPress = true;
            }
        }

        private void searchResults_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) getDataBtn_Click(sender, e);
        }

        private void filterResults_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (filterResults.CheckedItems.Count == 0)
            {
                searchResults.Items.Clear();
                filterResults.ClearSelected();
                return;
            }
            page = 0;
            
            foreach (int i in filterResults.CheckedIndices)
            {
                if (i != filterResults.SelectedIndex) filterResults.SetItemCheckState(i, CheckState.Unchecked);
            }

            if (search.Text != "")
            {
                populateResultsList_2(startUrl + "more?q=" + search.Text + "&t=" + 
                    helperClass.searchTabsOriginal[filterResults.SelectedItem.ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + "&p=0" + endtUrl);
                pageBox.Text = (page + 1).ToString();
            }                
        }

        private void nextPage_Click(object sender, EventArgs e)
        {
            if (page < totalPages-1 && search.Text != "")
            {
                ++page;
                string myUrl = startUrl + "more?q=" + search.Text +
                           "&t=" + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + "&p=" + page.ToString() + endtUrl;
                populateResultsList_2(myUrl);
                pageBox.Text = (page + 1).ToString();
            }            
        }

        private void previousPage_Click(object sender, EventArgs e)
        {
            if (page > 0 && search.Text != "")
            {
                --page;
                string myUrl = startUrl + "more?q=" + search.Text +
                           "&t=" + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + "&p=" + page.ToString() + endtUrl;
                populateResultsList_2(myUrl);
                pageBox.Text = (page + 1).ToString();
            }
        }

        private void firstPage_Click(object sender, EventArgs e)
        {
            if (page > 0 && search.Text != "")
            {
                page = 0;
                string myUrl = startUrl + "more?q=" + search.Text +
                               "&t=" + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + "&p=0" + endtUrl;
                populateResultsList_2(myUrl);
                pageBox.Text = (page + 1).ToString();
            }            
        }

        private void lastPage_Click(object sender, EventArgs e)
        {
            if (page < totalPages - 1 && search.Text != "")
            {
                page = totalPages - 1;
                string myUrl = startUrl + "more?q=" + search.Text +
                               "&t=" + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + 
                               "&p=" + page.ToString() + endtUrl;
                populateResultsList_2(myUrl);
                pageBox.Text = (page + 1).ToString();
            }           
        }

        private void pageBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (Int32.Parse(pageBox.Text) > 0 && Int32.Parse(pageBox.Text) < totalPages - 1 && search.Text != "" && !String.IsNullOrEmpty(pageBox.Text.ToString()))
                {
                    page = Int32.Parse(pageBox.Text) - 1;
                    string myUrl = startUrl + "more?q=" + search.Text +
                                   "&t=" + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + 
                                   "&p=" + page.ToString() + endtUrl;
                    populateResultsList_2(myUrl);
                }                
            }
        }

        private void selectedIndicator_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            getDataBtn_Click(sender, e);
        }
    }
}

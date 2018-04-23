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
    public partial class SearchEngine : Form
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

        public SearchEngine()
        {
            try
            {
                InitializeComponent();
                page = 0;

                this.search.KeyDown += new KeyEventHandler(search_KeyDown);
                this.searchResults.KeyDown += new KeyEventHandler(searchResults_KeyDown);
                this.pageBox.KeyDown += new KeyEventHandler(pageBox_KeyDown);
                this.searchResults.MouseDoubleClick += new MouseEventHandler(selectedIndicator_MouseDoubleClick);
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }        

        private void populateResultsList_2(string URL)
        {
            helperClass.log.Info(URL);
            try
            {
                searchResults.Items.Clear();
                using (WebClient wc = new WebClient())
                {
                    myTabList = JObject.Parse(wc.DownloadString(URL));

                    for (int h = 0; h < myTabList["hits"].Count(); h++)
                    {
                        /*helperClass.log.Info(myTabList["hits"][h]);
                        helperClass.log.Info("Unit Type: " + (myTabList["hits"][h]["unit"].GetType() == typeof(JArray)).ToString());
                        helperClass.log.Info(myTabList["hits"][h]["unit"].GetType());
                        helperClass.log.Info("Unit is NULL: " + (myTabList["hits"][h]["unit"] == null).ToString());
                        */


                        string unit = (
                            !String.IsNullOrEmpty(myTabList["hits"][h]["unit"].ToString())) ?
                            myTabList["hits"][h]["unit"][0].ToString() : "--";

                        string frequency = (
                            !String.IsNullOrEmpty(myTabList["hits"][h]["frequency"].ToString())) ?
                            myTabList["hits"][h]["frequency"][0].ToString() : "--";

                        searchResults.Items.Insert(h, myTabList["hits"][h]["pretty_name"].ToString() + "  (" + unit + "/" + frequency + ")");

                        /*if ((myTabList["hits"][h]["unit"].GetType() == typeof(JArray) || myTabList["hits"][h]["unit"] == null) &
                            (myTabList["hits"][h]["frequency"].GetType() == typeof(JArray) || myTabList["hits"][h]["frequency"] == null))
                        {
                            string unit = (
                            !String.IsNullOrEmpty(myTabList["hits"][h]["unit"].ToString())) ?
                            myTabList["hits"][h]["unit"][0].ToString() : "--";

                            string frequency = (
                                !String.IsNullOrEmpty(myTabList["hits"][h]["frequency"].ToString())) ?
                                myTabList["hits"][h]["frequency"][0].ToString() : "--";

                            searchResults.Items.Insert(h, myTabList["hits"][h]["pretty_name"].ToString() + "  (" + unit + "/" + frequency + ")");
                        }
                        else
                        {
                            searchResults.Items.Insert(h, myTabList["hits"][h]["pretty_name"].ToString());
                        }     */
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
                    maxPage = (totalPages < 100) ? totalPages : 100;
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Info(URL);
                helperClass.log.Error(ex);
            }              
        }

        private void searchBtn_Click(object sender, EventArgs e)
        {
            try
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
                    string url = startUrl + "all?q=" + search.Text + "&p=" + page.ToString() + endtUrl;
                    populateResultsList_2(url);

                    using (WebClient wc = new WebClient())
                    {
                        JObject tabJson = JObject.Parse(wc.DownloadString(url));

                        filterResults.Items.Insert(0, "All" +
                                "  (" + tabJson["info"]["hits"].ToString() + ")");

                        for (int i = 0; i < tabJson["info"]["facets"]["type"].Count(); i++)
                        {
                            filterResults.Items.Insert(i+1, helperClass.searchTabs[tabJson["info"]["facets"]["type"][i]["key"].ToString()].ToString() +
                                "  (" + tabJson["info"]["facets"]["type"][i]["doc_count"].ToString() + ")");
                        }
                    }

                    if (filterResults.Items.Count > 0)
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
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }                   
        }

        private void getDataBtn_Click(object sender, EventArgs e)
        {
            try
            {
                fromWinForm = true;
                string country = "";
                int i = searchResults.SelectedIndex;
                var idx = searchResults.SelectedItem.ToString().LastIndexOf("(");
                if (searchResults.SelectedItem.ToString().Substring(0, idx).Trim() == myTabList["hits"][i]["pretty_name"].ToString().Trim())
                {
                    helperClass.log.Info("Let's GO");
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
                        helperClass.formula = string.Format("=TEMrktsHist( \"{0}\",\"{1}\", \"{2}\", {3})",
                            "historical",
                            myTabList["hits"][i]["s"],
                            String.Join(",", helperClass.MarketHistColumns),
                            helperClass.CellAddress(helperClass.RangeAddress())[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);
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
                        
                            helperClass.formula = string.Format("=TEMrktsHist( \"{0}\",\"{1}\", \"{2}\", {3})",
                            myCat,
                            myTabList["hits"][i]["s"].ToString().Replace(":wb", "").Replace(":fred", ""),
                            newMarketsCols,
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
                    //helperClass.log.Info("Formula {0}", helperClass.formula);
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
            try
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
                    populateResultsList_2(startUrl + helperClass.searchTabsOriginal[filterResults.SelectedItem.ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] +
                        "?q=" + search.Text + "&p=0" + endtUrl);
                    pageBox.Text = (page + 1).ToString();
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }                            
        }

        private void nextPage_Click(object sender, EventArgs e)
        {
            try
            {
                if (page < maxPage-1 && search.Text != "")
                {
                    ++page;
                    string myUrl = startUrl + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] +
                        "?q=" + search.Text + "&p=" + page.ToString() + endtUrl;
                    populateResultsList_2(myUrl);
                    pageBox.Text = (page + 1).ToString();
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }                        
        }

        private void previousPage_Click(object sender, EventArgs e)
        {
            try
            {
                if (page > 0 && search.Text != "")
                {
                    --page;
                    string myUrl = startUrl + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] +
                        "?q=" + search.Text + "&p=" + page.ToString() + endtUrl;
                    populateResultsList_2(myUrl);
                    pageBox.Text = (page + 1).ToString();
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        
        private void firstPage_Click(object sender, EventArgs e)
        {
            try
            {
                if (page > 0 && search.Text != "")
                {
                    page = 0;
                    string myUrl = startUrl + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + 
                        "?q=" + search.Text + "&p=0" + endtUrl;
                    populateResultsList_2(myUrl);
                    pageBox.Text = (page + 1).ToString();
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }               
        }

        private void lastPage_Click(object sender, EventArgs e)
        {
            try
            {                
                if (page < totalPages - 1 && search.Text != "")
                {
                    page = totalPages - 1;
                    string myUrl = startUrl + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + 
                        "?q=" + search.Text + "&p=" + page.ToString() + endtUrl;
                    populateResultsList_2(myUrl);
                    pageBox.Text = (page + 1).ToString();
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }             
        }

        private void pageBox_KeyDown(object sender, KeyEventArgs e)
        {
            try
            {
                if (e.KeyCode == Keys.Enter)
                {                    
                    if (Int32.Parse(pageBox.Text) > 0 && Int32.Parse(pageBox.Text) <= maxPage && search.Text != "" && !String.IsNullOrEmpty(pageBox.Text.ToString()))
                    {
                        page = Int32.Parse(pageBox.Text) - 1;
                        string myUrl = startUrl + helperClass.searchTabsOriginal[filterResults.CheckedItems[0].ToString().Split(new[] { "  " }, StringSplitOptions.None)[0]] + 
                            "?q=" + search.Text + "&p=" + page.ToString() + endtUrl;
                        populateResultsList_2(myUrl);
                    }
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void selectedIndicator_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            getDataBtn_Click(sender, e);
        }
    }
}

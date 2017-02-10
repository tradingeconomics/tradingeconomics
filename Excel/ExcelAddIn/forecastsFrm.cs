using ExcelDna.Integration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace testClassLib
{
    public partial class forecastsFrm : Form
    {
        List<string> AutoCompleteList;

        public forecastsFrm()
        {
            InitializeComponent();
            cntryTextBox.Select();
            activeCellPositionBox.Text = helperClass.RangeAddress();
            for (int i = 0; i < helperClass.cntry2.Length; i++)
            {
                countryLstBx.Items.Insert(i, helperClass.cntry2[i]);
            }
            for (int i = 0; i < helperClass.category.Length; i++)
            {
                indicatorLstBx.Items.Insert(i, helperClass.category[i]);
            }

            AutoCompleteList = indics_list();
            this.cntryTextBox.KeyDown += new KeyEventHandler(cntryTextBox_KeyDown);
            this.indctrTextBox.KeyDown += new KeyEventHandler(indctrTextBox_KeyDown);
            this.countryLstBx.KeyDown += new KeyEventHandler(countryLstBx_KeyDown);
            this.countryLstBx.MouseDoubleClick += new MouseEventHandler(countryLstBx_MouseDoubleClick);
            this.indicatorLstBx.KeyDown += new KeyEventHandler(indicatorLstBx_KeyDown);
            this.indicatorLstBx.MouseDoubleClick += new MouseEventHandler(indicatorLstBx_MouseDoubleClick);
        }

        private void hideAutoCompleteMenu()
        {
            countryLstBx.Visible = false;
        }

        private void hideAutoCompleteMenu2()
        {
            indicatorLstBx.Visible = false;
        }

        private String getLatestString()
        {
            return cntryTextBox.Text.ToString().Substring
             (cntryTextBox.Text.ToString().LastIndexOf(";") + 1).Trim();
        }

        private String getLatestString2()
        {
            return indctrTextBox.Text.ToString().Substring
             (indctrTextBox.Text.ToString().LastIndexOf(";") + 1).Trim();
        }

        private List<string> indics_list()
        {
            helperClass.log.Info("Creating Indicators list");
            List<string> values_test = new List<string>();
            for (int j = 0; j < indicatorLstBx.Items.Count; j++)
            {
                values_test.Add(indicatorLstBx.Items[j].ToString());
            }
            return values_test;
        }
        

        private void btnCntryAdd_Click(object sender, EventArgs e)
        {
            helperClass.log.Info("Adding countrys in forecasts");
            foreach (string item in countryLstBx.SelectedItems)
            {
                if (selectedCountryLstBx.Items.Count < 10)
                {
                    if (!selectedCountryLstBx.Items.Contains(item))
                        selectedCountryLstBx.Items.Add(item);
                }
                else
                {
                    MessageBox.Show("You hit max number of items");
                    break;
                }
            }

            if (selectedCountryLstBx.Items.Count == 1)
            {
                string url2 = helperClass.host + "forecast/country/" + selectedCountryLstBx.Items[0].ToString() + "?client=" + apiKeyFrm.apiKey + "&excel=" + helperClass.Determine_OfficeVersion();
                try
                {
                    using (WebClient wc = new WebClient())
                    {
                        var json = wc.DownloadString(url2);
                        JArray o = JArray.Parse(json);
                        indicatorLstBx.Items.Clear();
                        for (int i = 0; i < o.Count; i++)
                        {
                            if (selectedCountryLstBx.Items[0].ToString() == "Commodity")
                            {
                                indicatorLstBx.Items.Insert(i, o[i]["Title"]);
                            }
                            else
                            {
                                indicatorLstBx.Items.Insert(i, o[i]["Category"]);
                            }
                            indicatorLstBx.Items[i] = indicatorLstBx.Items[i].ToString();
                        }
                        for (int i = 0; i < indicatorLstBx.Items.Count; i++)
                        {
                            if (indicatorLstBx.Items[i].ToString() == "Credit Rating") indicatorLstBx.Items.RemoveAt(i);
                        }
                    }
                }
                catch(Exception q)
                {
                    helperClass.log.Info("Something went wrong trying get from web a list of indicators");
                    helperClass.log.Error(q.Message);
                    helperClass.log.Error(q.StackTrace);
                    helperClass.log.Trace(q.StackTrace);
                    throw;
                }
                
            }
            else
            {
                indicatorLstBx.Items.Clear();
                for (int i = 0; i < helperClass.category.Length; i++)
                {
                    if (!indicatorLstBx.Items.Contains(helperClass.category[i]))
                        indicatorLstBx.Items.Insert(i, helperClass.category[i]);
                }
            }
            AutoCompleteList = indics_list();
        }

        private void btnCntryRemove_Click(object sender, EventArgs e)
        {
            helperClass.log.Info("Removing country(s)");
            for (int i = selectedCountryLstBx.SelectedIndices.Count - 1; i >= 0; i--)
            {
                selectedCountryLstBx.Items.RemoveAt(selectedCountryLstBx.SelectedIndices[i]);
            }
        }

        private void btnIndctrAdd_Click(object sender, EventArgs e)
        {
            foreach (string item in indicatorLstBx.SelectedItems)
            {
                if (selectedIndicatorLstBx.Items.Count < 10)
                {
                    if (!selectedIndicatorLstBx.Items.Contains(item))
                        selectedIndicatorLstBx.Items.Add(item);
                }
                else
                {
                    MessageBox.Show("You hit max number of items");
                    break;
                }
            }
        }

        private void btnIndctrRemove_Click(object sender, EventArgs e)
        {
            for (int i = selectedIndicatorLstBx.SelectedIndices.Count - 1; i >= 0; i--)
            {
                selectedIndicatorLstBx.Items.RemoveAt(selectedIndicatorLstBx.SelectedIndices[i]);
            }
        }


        string selectedCntry;
        string selectedIndic;
        private void btnOK_Click(object sender, EventArgs e)
        {
            helperClass.log.Info("Forecasts button OK is clicked");
            helperClass.origin = false;
            if (selectedCountryLstBx.Items.Count == 0 & selectedIndicatorLstBx.Items.Count == 0)
            {
                MessageBox.Show("Country or Indicator should be provided");
            }
            else
            {
                List<string> values1 = new List<string>();
                foreach (string item in selectedIndicatorLstBx.Items)
                {
                    values1.Add(item.ToString());
                }
                selectedIndic = String.Join(",", values1);

                List<string> values = new List<string>();
                foreach (string item in selectedCountryLstBx.Items)
                {
                    values.Add(item.ToString());
                }
                selectedCntry = String.Join(",", values);

                //Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                //Microsoft.Office.Interop.Excel.Range cellRange = app.ActiveCell;

                helperClass.runFormula = "RunAutomatically = 1";
                string rnFm = "RunAutomatically = 0";
                string indFm = string.Format("=TEForecasts( \"{0}\", \"{1}\", \"{2}\")",
                    selectedCntry, selectedIndic, rnFm);
                helperClass.log.Info("Formula {0}", indFm);

                helperClass.cellRange = helperClass.CellAddress(activeCellPositionBox.Text);
                helperClass.cellRange.Formula = indFm;
                Close();
            }
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void cntryTextBox_TextChanged(object sender, EventArgs e)
        {
            helperClass.log.Info("Textbox text is changed");
            countryLstBx.Items.Clear();
            if (cntryTextBox.Text.Length == 0)
            {
                hideAutoCompleteMenu(); 
                countryLstBx.Show();
                for (int i = 0; i < helperClass.cntry.Length; i++)
                {
                    countryLstBx.Items.Insert(i, helperClass.cntry[i]);
                }
                return;
            }

            String compareText = getLatestString();
            foreach (String s in helperClass.autoCompleteList2)
            {
                if (compareText == null ||
                compareText.Equals("") || s.StartsWith(compareText.Trim(), helperClass.comparison))
                {
                    countryLstBx.Items.Add(s);
                }
            }

            if (countryLstBx.Items.Count > 0)
            {
                Point point = this.cntryTextBox.GetPositionFromCharIndex
                 (cntryTextBox.SelectionStart);
                point.Y += (int)Math.Ceiling(this.cntryTextBox.Font.GetHeight()) + 33;
                point.X += 14;
                countryLstBx.Location = point;
                this.countryLstBx.BringToFront();
                this.countryLstBx.Show();
            }
        }


        private void countryLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            cntryTextBox.Focus();
            btnCntryAdd_Click(sender, e);
            cntryTextBox.SelectionStart = cntryTextBox.Text.Length + 1;
            cntryTextBox.SelectionLength = 0;
            countryLstBx.ClearSelected();
        }

        private void indicatorLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            btnIndctrAdd_Click(sender, e);
            indicatorLstBx.ClearSelected();
        }

        private void countryLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                cntryTextBox.Focus();
                btnCntryAdd_Click(sender, e);
                cntryTextBox.SelectionStart = cntryTextBox.Text.Length + 1;
                cntryTextBox.SelectionLength = 0;
                countryLstBx.ClearSelected();
            }

            if (e.KeyCode == Keys.Escape || e.KeyCode == Keys.Back)
            {
                cntryTextBox.Focus();
                countryLstBx.ClearSelected();
            }
        }

        private void indicatorLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                btnIndctrAdd_Click(sender, e);
                indicatorLstBx.ClearSelected();
            }

            if (e.KeyCode == Keys.Escape || e.KeyCode == Keys.Back)
            {
                indicatorLstBx.ClearSelected();
                indctrTextBox.Select();
            }
        }

        private void cntryTextBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (countryLstBx.Visible && (e.KeyCode == Keys.Up || e.KeyCode == Keys.Down))
            {
                countryLstBx.Select();
                countryLstBx.SetSelected(0, true);
            }
        }

        private void indctrTextBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (indicatorLstBx.Visible && (e.KeyCode == Keys.Up || e.KeyCode == Keys.Down))
            {
                indicatorLstBx.Select();
                indicatorLstBx.SetSelected(0, true);
            }
        }

        private void indctrTextBox_TextChanged(object sender, EventArgs e)
        {
            indicatorLstBx.Items.Clear();
            if (indctrTextBox.Text.Length == 0)
            {
                hideAutoCompleteMenu2();
                if (selectedCountryLstBx.Items.Count == 0)
                {
                    for (int i = 0; i < helperClass.category.Length; i++)
                    {
                        indicatorLstBx.Items.Insert(i, helperClass.category[i]);
                    }
                }
                else
                {
                    for (int i= 0; i < AutoCompleteList.ToList().Count; i++)
                    {
                        indicatorLstBx.Items.Insert(i, AutoCompleteList.ToList()[i]);
                    }
                }
                indicatorLstBx.Show();
                return;
            }
            
                String compareText = getLatestString2();
                foreach (String s in AutoCompleteList)
                {
                    if (compareText == null ||
                    compareText.Equals("") || s.StartsWith(compareText.Trim(), helperClass.comparison))
                    {
                        indicatorLstBx.Items.Add(s);
                    }
                }                                

            if (indicatorLstBx.Items.Count > 0)
            {
                Point point = this.indctrTextBox.GetPositionFromCharIndex
                 (indctrTextBox.SelectionStart);
                point.Y += (int)Math.Ceiling(this.indctrTextBox.Font.GetHeight()) + 228;
                point.X += 14;
                indicatorLstBx.Location = point;
                this.indicatorLstBx.BringToFront();
                this.indicatorLstBx.Show();
            }
        }
    }
}

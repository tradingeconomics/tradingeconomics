using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
//using System.Diagnostics;
using System.Drawing;
using System.Net;
using System.Threading;
using System.Windows.Forms;


namespace TE
{
    public partial class historicalFrm : Form
    {
        public static Mutex DataWriteMutex = new Mutex();
        List<string> AutoCompleteList;
        string date1;
        string date2;
        private bool fromIndTxtBox;

        public historicalFrm()
        {
            InitializeComponent();
            cntryTextBox.Select();
            activeCellPositionBox.Text = helperClass.RangeAddress();
            for (int i = 0; i < helperClass.cntry2.Length; i++)
            {
                countryLstBx.Items.Insert(i, helperClass.cntry2[i]);
            }
            dateTimePicker1.Value = new DateTime(2010, 01, 01);
            date1 = dateTimePicker1.Value.ToString("yyyy-MM-dd");

            for (int n = 0; n < helperClass.histNames.Length; n++)
            {
                columnsListBox.Items.Insert(n, helperClass.histNames[n]);
            }

            this.cntryTextBox.KeyDown += new KeyEventHandler(cntryTextBox_KeyDown);
            this.indctrTextBox.KeyDown += new KeyEventHandler(indctrTextBox_KeyDown);
            this.countryLstBx.KeyDown += new KeyEventHandler(countryLstBx_KeyDown);
            this.selectedCountryLstBx.KeyDown += new KeyEventHandler(selectedCountryLstBx_KeyDown);
            this.countryLstBx.MouseDoubleClick += new MouseEventHandler(countryLstBx_MouseDoubleClick);
            this.selectedCountryLstBx.MouseDoubleClick += new MouseEventHandler(selectedCountryLstBx_MouseDoubleClick);
            this.indicatorLstBx.KeyDown += new KeyEventHandler(indicatorLstBx_KeyDown);
            this.selectedIndicatorLstBx.KeyDown += new KeyEventHandler(selectedIndicatorLstBx_KeyDown);
            this.indicatorLstBx.MouseDoubleClick += new MouseEventHandler(indicatorLstBx_MouseDoubleClick);
            this.selectedIndicatorLstBx.MouseDoubleClick += new MouseEventHandler(selectedIndicatorLstBx_MouseDoubleClick);
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

        private void indicatorListPopulate(string url2)
        {
            helperClass.log.Info("historicalFrm - btnCntryAdd_Click, url2 = " + url2);
            using (WebClient wc = new WebClient())
            {
                JArray o = JArray.Parse(wc.DownloadString(url2));
                indicatorLstBx.Items.Clear();
                int k = 0;
                for (int i = 0; i < o.Count; i++)
                {
                    if (selectedCountryLstBx.Items[0].ToString() == "Commodity")
                    {
                        if (o[i]["Category"].ToString() != "Credit Rating")// && o[i]["Title"].ToString() != "Commodity")
                        {
                            indicatorLstBx.Items.Insert(k, o[i]["Title"].ToString());
                            k++;
                        }
                    }
                    else
                    {
                        if (o[i]["Category"].ToString() != "Credit Rating")// && o[i]["Title"].ToString() != "Commodity")
                        {
                            indicatorLstBx.Items.Insert(k, o[i]["Category"].ToString());
                            k++;
                        }
                    }
                }
            }
        }

        private List<string> indics_list()
        {
            List<string> values_test = new List<string>();
            for (int j = 0; j < indicatorLstBx.Items.Count; j++)
            {
                values_test.Add(indicatorLstBx.Items[j].ToString());
            }
            return values_test;
        }        

        private void btnCntryAdd_Click(object sender, EventArgs e)
        {
            foreach (string item in countryLstBx.SelectedItems)
            {
                    if (!selectedCountryLstBx.Items.Contains(item))
                        selectedCountryLstBx.Items.Add(item);
            }
            if (selectedCountryLstBx.Items.Count == 1)
            {
                string url2 = helperClass.host + "country/" + selectedCountryLstBx.Items[0].ToString() + 
                    "?client=" + apiKeyFrm.apiKey + "&excel=" + apiKeyFrm.excelVersion;
                /*helperClass.log.Info("historicalFrm - btnCntryAdd_Click, url2 = " + url2);
                using (WebClient wc = new WebClient())
                {
                    JArray o = JArray.Parse(wc.DownloadString(url2));
                    indicatorLstBx.Items.Clear();
                    int k = 0;
                    for (int i = 0; i < o.Count; i++)
                    {
                        if (selectedCountryLstBx.Items[0].ToString() == "Commodity")
                        {
                            if (o[i]["Category"].ToString() != "Credit Rating")// && o[i]["Title"].ToString() != "Commodity")
                            {
                                indicatorLstBx.Items.Insert(k, o[i]["Title"].ToString());
                                k++;
                            }
                                
                        }
                        else
                        {
                            if (o[i]["Category"].ToString() != "Credit Rating")// && o[i]["Title"].ToString() != "Commodity")
                            {
                                indicatorLstBx.Items.Insert(k, o[i]["Category"].ToString());
                                k++;
                            }                                
                        }
                    }
                }*/
                indicatorListPopulate(url2);
            }
            else
            {
                indicatorLstBx.Items.Clear();
                for (int i = 0; i < helperClass.category.Length; i++)
                {
                    if (!indicatorLstBx.Items.Contains(helperClass.category[i]))
                        indicatorLstBx.Items.Insert(i, helperClass.category[i]);
                }

                for (int i = 0; i < indicatorLstBx.Items.Count; i++)
                {
                    if ( indicatorLstBx.Items[i].ToString() == "Commodity") indicatorLstBx.Items.RemoveAt(i);
                }
            }
            //cntryTextBox.Focus();
            if (!fromIndTxtBox)
            {
                cntryTextBox.Focus();
            }
            else
            {
                fromIndTxtBox = false;
            }
            countryLstBx.ClearSelected();
            AutoCompleteList = indics_list();
        }

        private void btnCntryRemove_Click(object sender, EventArgs e)
        {
            for (int i = selectedCountryLstBx.SelectedIndices.Count - 1; i >= 0; i--)
            {
                selectedCountryLstBx.Items.RemoveAt(selectedCountryLstBx.SelectedIndices[i]);
            }

            if (selectedCountryLstBx.Items.Count == 1)
            {
                string url2 = helperClass.host + "country/" + selectedCountryLstBx.Items[0].ToString() + 
                    "?client=" + apiKeyFrm.apiKey + "&excel=" + apiKeyFrm.excelVersion;
                /*helperClass.log.Info("historicalFrm - btnCntryRemove_Click, url2 = " + url2);
                using (WebClient wc = new WebClient())
                {
                    JArray o = JArray.Parse(wc.DownloadString(url2));
                    indicatorLstBx.Items.Clear();
                    for (int i = 0; i < o.Count; i++)
                    {
                        if (selectedCountryLstBx.Items[0].ToString() == "Commodity")
                        {
                            if (o[i]["Category"].ToString() != "Credit Rating" && o[i]["Category"].ToString() != "Commodity")
                                indicatorLstBx.Items.Insert(i, o[i]["Title"].ToString());
                        }
                        else
                        {
                            if (o[i]["Category"].ToString() != "Credit Rating" && o[i]["Category"].ToString() != "Commodity")
                                indicatorLstBx.Items.Insert(i, o[i]["Category"].ToString());
                        }
                    }
                }*/
                indicatorListPopulate(url2);
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
            selectedCountryLstBx.Focus();
        }

        private void btnIndctrAdd_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < indicatorLstBx.Items.Count; i++)
            {
                indicatorLstBx.Items[i] = indicatorLstBx.Items[i].ToString();
            }
            foreach (string item in indicatorLstBx.SelectedItems)
            {
                    if (!selectedIndicatorLstBx.Items.Contains(item))
                        selectedIndicatorLstBx.Items.Add(item);
            }
            indctrTextBox.Focus();
            indicatorLstBx.ClearSelected();
        }

        private void btnIndctrRemove_Click(object sender, EventArgs e)
        {
            for (int i = selectedIndicatorLstBx.SelectedIndices.Count - 1; i >= 0; i--)
            {
                selectedIndicatorLstBx.Items.RemoveAt(selectedIndicatorLstBx.SelectedIndices[i]);
            }
            selectedIndicatorLstBx.Focus();
        }
        
        private void dateTimePicker1_ValueChanged(object sender, EventArgs e)
        {
            date1 = dateTimePicker1.Value.ToString("yyyy-MM-dd");
        }
        
        private void dateTimePicker2_ValueChanged(object sender, EventArgs e)
        {
            date2 = dateTimePicker2.Value.ToString("yyyy-MM-dd");
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            helperClass.log.Info("Button OK is klicked on Historical form.");
            helperClass.origin = false;
            if (selectedCountryLstBx.Items.Count == 0 & selectedIndicatorLstBx.Items.Count == 0)
            {
                MessageBox.Show("Select country and available indicator");
            }
            else if (selectedCountryLstBx.Items.Count != 0 & selectedIndicatorLstBx.Items.Count == 0)
            {
                MessageBox.Show("Select available indicator");
            }
            else
            {
                string selectedIsoCntry = sharedFunctions.toIsoCountry(selectedCountryLstBx);
                if (sharedFunctions.checkCountryLength(selectedIsoCntry)) return;

                string selectedIndic = sharedFunctions.getIndicators(selectedIndicatorLstBx);
                if (sharedFunctions.checkIndicatorsLength(selectedIndic)) return;

                List<string> columns = sharedFunctions.getColumns(columnsListBox);

                if (StartDateCheckBox.Checked)
                {
                    date1 = "";
                    date2 = "";
                }
                helperClass.runFormula = "RunAutomatically = 1";
                Microsoft.Office.Interop.Excel.Range dateCell = helperClass.CellAddress(activeCellPositionBox.Text);
               
                if (columnsListBox.CheckedItems.Count > 0)
                {
                    if (columns.Count == 1)
                    {
                        MessageBox.Show("Please select at least two columns");
                        return;
                    }
                    helperClass.formula = string.Format("=TEHistorical( \"{0}\", \"{1}\", \"{2}\", \"{3}\", \"{4}\", {5})",
                      selectedIsoCntry,
                      selectedIndic,
                      date1,
                      date2,
                      String.Join(",", columns),
                      dateCell[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);
                }
                else
                {
                    helperClass.formula = string.Format("=TESeries( \"{0}\", \"{1}\", \"{2}\", \"{3}\", {4})", 
                      selectedIsoCntry,
                      selectedIndic,
                      date1,
                      date2,
                      dateCell[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);
                }

                helperClass.log.Info("Formula {0}", helperClass.formula);
                MyRibbon.cellRange = helperClass.CellAddress(activeCellPositionBox.Text);
                MyRibbon.cellRange.Formula = helperClass.formula; 
                helperClass.log.Info("Executing Close from historicalFrm");
                Close();
            }
        }
        
        private void btnRemove_Click(object sender, EventArgs e)
        {
            Close();            
        }

        private void cntryTextBox_TextChanged(object sender, EventArgs e)
        {
            countryLstBx.Items.Clear();
            if (cntryTextBox.Text.Length == 0)
            {
                hideAutoCompleteMenu(); 
                countryLstBx.Show();
                for (int i = 0; i < helperClass.cntry2.Length; i++)
                {
                    countryLstBx.Items.Insert(i, helperClass.cntry2[i]);
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
                point.Y += (int)Math.Ceiling(this.cntryTextBox.Font.GetHeight()) + 31;
                point.X += 7;
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

        private void selectedCountryLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            btnCntryRemove_Click(sender, e);
        }

        private void indicatorLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            btnIndctrAdd_Click(sender, e);
            indicatorLstBx.ClearSelected();
        }

        private void selectedIndicatorLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            btnIndctrRemove_Click(sender, e);
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

        private void selectedCountryLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) btnCntryRemove_Click(sender, e);
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

        private void selectedIndicatorLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) btnIndctrRemove_Click(sender, e);
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

                if (selectedCountryLstBx.Items.Count > 0)
                {
                    fromIndTxtBox = true;
                    btnCntryAdd_Click(sender, e);
                }

                indicatorLstBx.Show();
                return;
            }
            if (AutoCompleteList != null)
            {
                String compareText = getLatestString2();
                foreach (String s in AutoCompleteList)
                {
                    if (compareText == null ||
                    compareText.Equals("") || s.StartsWith(compareText.Trim(), helperClass.comparison))
                    {
                        indicatorLstBx.Items.Add(s);
                    }
                }
            }
            else
            {
                MessageBox.Show("Please select country first");
                indctrTextBox.Clear();
                cntryTextBox.Select();
            }
            

            if (indicatorLstBx.Items.Count > 0)
            {
                Point point = this.indctrTextBox.GetPositionFromCharIndex
                 (indctrTextBox.SelectionStart);
                point.Y += (int)Math.Ceiling(this.indctrTextBox.Font.GetHeight()) + 232;
                point.X += 7;
                indicatorLstBx.Location = point;
                this.indicatorLstBx.BringToFront();
                this.indicatorLstBx.Show();
            }
        }

        private void StartDateCheckBox_CheckedChanged(object sender, EventArgs e)
        {
            if(StartDateCheckBox.Checked == false)
            {
                dateTimePicker1.Enabled = true;
                dateTimePicker2.Enabled = true;
            }
            else
            {
                dateTimePicker1.Enabled = false;
                dateTimePicker2.Enabled = false;
            }            
        }
    }
}

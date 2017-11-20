using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Net;
using System.Windows.Forms;

namespace TE
{
    public partial class indicatorsFrm : Form
    {
        public indicatorsFrm()
        {
            InitializeComponent();
            cntryTextBox.Select();
            allIndicatorsBox.Enabled = false;
            activeCellPositionBox.Text = helperClass.RangeAddress();
            for (int i = 0; i < helperClass.cntry.Length; i++)
            {
                countryLstBx.Items.Insert(i, helperClass.cntry[i]);
            }

            for (int n = 0; n < helperClass.indNames.Length; n++)
            {
                columnsListBox.Items.Insert(n, helperClass.indNames[n]);
                columnsListBox.SetItemChecked(n, true);
            }
            this.cntryTextBox.KeyDown += new KeyEventHandler(cntryTextBox_KeyDown);
            this.indctrTextBox.KeyDown += new KeyEventHandler(indctrTextBox_KeyDown);
            this.countryLstBx.KeyDown += new KeyEventHandler(countryLstBx_KeyDown);
            this.selectedCountryLstBx.KeyDown += new KeyEventHandler(selectedCountryLstBx_KeyDown);
            this.countryLstBx.MouseDoubleClick += new MouseEventHandler(countryLstBx_MouseDoubleClick);
            this.selectedCountryLstBx.MouseDoubleClick += new MouseEventHandler(selectedCountryLstBx_MouseDoubleClick);
            this.indicatorsLstBx.KeyDown += new KeyEventHandler(indicatorLstBx_KeyDown);
            this.selectedIndicatorsLstBx.KeyDown += new KeyEventHandler(selectedIndicatorLstBx_KeyDown);
            this.indicatorsLstBx.MouseDoubleClick += new MouseEventHandler(indicatorLstBx_MouseDoubleClick);
            this.selectedIndicatorsLstBx.MouseDoubleClick += new MouseEventHandler(selectedIndicatorLstBx_MouseDoubleClick);
        }

        private void hideAutoCompleteMenu()
        {
            countryLstBx.Visible = false;
        }

        private void hideAutoCompleteMenu2()
        {
            indicatorsLstBx.Visible = false;
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
            List<string> values_test = new List<string>();
            try
            {
                for (int j = 0; j < indicatorsLstBx.Items.Count; j++)
                {
                    values_test.Add(indicatorsLstBx.Items[j].ToString());
                }
            }
            catch(Exception e)
            {
                helperClass.log.Info("Something went wrong trying get indicators list");
                helperClass.log.Trace(e.StackTrace);
            }
            return values_test;
        }
        List<string> AutoCompleteList;

        private void btnCntryAdd_Click(object sender, EventArgs e)
        {
            allIndicatorsBox.Enabled = true;
            foreach (string item in countryLstBx.SelectedItems)
            {
                    if (!selectedCountryLstBx.Items.Contains(item))
                        selectedCountryLstBx.Items.Add(item);
            }

            if ((selectedCountryLstBx.Items.Count == 1) && (selectedCountryLstBx.Items[0].ToString() != "All"))
            {
                string url2 = helperClass.host + "country/" + selectedCountryLstBx.Items[0].ToString() + "?client=" + apiKeyFrm.apiKey + "&excel=" + helperClass.Determine_OfficeVersion();
                try
                {
                    helperClass.log.Info("indicatorsFrm - btnCntryAdd_Click, url2 = " + url2);
                    using (WebClient wc = new WebClient())
                    {
                        var json = wc.DownloadString(url2);
                        JArray o = JArray.Parse(json);
                        indicatorsLstBx.Items.Clear();
                        for (int i = 0; i < o.Count; i++)
                        {
                            indicatorsLstBx.Items.Insert(i, o[i]["Category"]);
                            indicatorsLstBx.Items[i] = indicatorsLstBx.Items[i].ToString();
                        }
                        for (int i = 0; i < indicatorsLstBx.Items.Count; i++)
                        {
                            if (indicatorsLstBx.Items[i].ToString() == "Credit Rating") indicatorsLstBx.Items.RemoveAt(i);
                        }
                    }
                }
                catch(Exception ex)
                {
                    helperClass.log.Info("Something went wrong trying get indicators list for specific country.");
                    helperClass.log.Trace(ex.StackTrace);
                }                
            }
            else
            {
                indicatorsLstBx.Items.Clear();
                for (int i = 0; i < helperClass.category.Length; i++)
                {
                    if (!indicatorsLstBx.Items.Contains(helperClass.category[i]))
                        indicatorsLstBx.Items.Insert(i, helperClass.category[i]);
                }
            }
            cntryTextBox.Focus();
            countryLstBx.ClearSelected();
            AutoCompleteList = indics_list();
        }

        private void btnCntryRemove_Click(object sender, EventArgs e)
        {
            for (int i = selectedCountryLstBx.SelectedIndices.Count - 1; i >= 0; i--)
            {
                selectedCountryLstBx.Items.RemoveAt(selectedCountryLstBx.SelectedIndices[i]);
            }

            if ((selectedCountryLstBx.Items.Count == 1) && (selectedCountryLstBx.Items[0].ToString() != "All"))
            {
                string url2 = helperClass.host + "country/" + selectedCountryLstBx.Items[0].ToString() + "?client=" + apiKeyFrm.apiKey + "&excel=" + helperClass.Determine_OfficeVersion();
                try
                {
                    helperClass.log.Info("indicatorsFrm - btnCntryRemove_Click, url2 = " + url2);
                    using (WebClient wc = new WebClient())
                    {
                        var json = wc.DownloadString(url2);
                        JArray o = JArray.Parse(json);
                        indicatorsLstBx.Items.Clear();
                        for (int i = 0; i < o.Count; i++)
                        {
                            indicatorsLstBx.Items.Insert(i, o[i]["Category"]);
                            indicatorsLstBx.Items[i] = indicatorsLstBx.Items[i].ToString();
                        }
                        for (int i = 0; i < indicatorsLstBx.Items.Count; i++)
                        {
                            if (indicatorsLstBx.Items[i].ToString() == "Credit Rating") indicatorsLstBx.Items.RemoveAt(i);
                        }
                    }
                }
                catch (Exception ex)
                {
                    helperClass.log.Info("Something went wrong trying get indicators list for specific country.");
                    helperClass.log.Trace(ex.StackTrace);
                }
            }
            else
            {
                indicatorsLstBx.Items.Clear();
                for (int i = 0; i < helperClass.category.Length; i++)
                {
                    if (!indicatorsLstBx.Items.Contains(helperClass.category[i]))
                        indicatorsLstBx.Items.Insert(i, helperClass.category[i]);
                }
            }
            selectedCountryLstBx.Focus();
        }

        private void btnIndctrAdd_Click(object sender, EventArgs e)
        {
            foreach (string item in indicatorsLstBx.SelectedItems)
            {
                    if (!selectedIndicatorsLstBx.Items.Contains(item))
                        selectedIndicatorsLstBx.Items.Add(item);
            }
            indctrTextBox.Focus();
            indicatorsLstBx.ClearSelected();
        }

        private void btnIndctrRemove_Click(object sender, EventArgs e)
        {
            for (int i = selectedIndicatorsLstBx.SelectedIndices.Count - 1; i >= 0; i--)
            {
                selectedIndicatorsLstBx.Items.RemoveAt(selectedIndicatorsLstBx.SelectedIndices[i]);
            }
            selectedIndicatorsLstBx.Focus();
        }

        
        string selectedIsoCntry;
        string selectedIndic;
        public static string[] selectedColumns = null;

        private void btnOK_Click(object sender, EventArgs e)
        {
            if (selectedCountryLstBx.Items.Count == 0)
            {
                MessageBox.Show("Please select available country");
                return;
            }

            if (selectedCountryLstBx.Items[0].ToString() == "All" && selectedIndicatorsLstBx.Items.Count == 0)
            {
                MessageBox.Show("Please select available indicator");
                return;
            }
            helperClass.log.Info("Indicators button OK is clicked");
            helperClass.origin = false;
            if (selectedCountryLstBx.Items.Count != 0 & selectedIndicatorsLstBx.Items.Count == 0)
            {
                List<string> isoValues = new List<string>();
                foreach (string item in selectedCountryLstBx.Items)
                {
                    if (helperClass.myCountrysDict.ContainsKey(item))
                    {
                        isoValues.Add(helperClass.myCountrysDict[item]);
                    }
                    else
                    {
                        isoValues.Add(item.ToString());
                    }
                }
                selectedIsoCntry = String.Join(",", isoValues);

                if (selectedIsoCntry.Length > 255)
                {
                    //MessageBox.Show("selectedIsoCntry: " + selectedIsoCntry.Length.ToString());
                    MessageBox.Show("You selected too many countries. Please remove some of them.");
                    return;
                }
            }
            else
            {
                List<string> isoValues = new List<string>();
                foreach (string item in selectedCountryLstBx.Items)
                {
                    if (helperClass.myCountrysDict.ContainsKey(item))
                    {
                        isoValues.Add(helperClass.myCountrysDict[item]);
                    }
                    else
                    {
                        isoValues.Add(item.ToString());
                    }                    
                }
                selectedIsoCntry = String.Join(",", isoValues);

                List<string> values1 = new List<string>();
                foreach (string item in selectedIndicatorsLstBx.Items)
                {
                    values1.Add(item.ToString());
                }
                selectedIndic = String.Join(",", values1);

                if (selectedIsoCntry.Length > 255)
                {
                    //MessageBox.Show("selectedIsoCntry: " + selectedIsoCntry.Length.ToString());
                    MessageBox.Show("You selected too many countries. Please remove some of them.");
                    return;
                }

                if (selectedIndic.Length > 255)
                {
                    //MessageBox.Show("selectedIndic: " + selectedIndic.Length.ToString());
                    MessageBox.Show("You selected too many indicators. Please remove some of them.");
                    return;
                }
            }

            List<string> columns = new List<string>();
            foreach (string item in columnsListBox.CheckedItems)
            {
                columns.Add(item.ToString());
            }
            string newColumns = String.Join(",", columns);

            helperClass.runFormula = "RunAutomatically = 1";
            Microsoft.Office.Interop.Excel.Range dateCell = helperClass.CellAddress(activeCellPositionBox.Text);

            string indFm = string.Format("=TEIndicators( \"{0}\", \"{1}\", \"{2}\", {3})",
                    selectedIsoCntry, 
                    selectedIndic, 
                    newColumns,
                    dateCell[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);

            helperClass.log.Info("Formula {0}", indFm);
            MyRibbon.cellRange = helperClass.CellAddress(activeCellPositionBox.Text);
            MyRibbon.cellRange.Formula = indFm;
            Close();
        }

        private void btnCancel_Click(object sender, EventArgs e)
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
                for (int i = 0; i < helperClass.cntry.Length; i++)
                {
                    countryLstBx.Items.Insert(i, helperClass.cntry[i]);
                }
                return;
            }

            String compareText = getLatestString();
            foreach (String s in helperClass.autoCompleteList)
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
                point.Y += (int)Math.Ceiling(this.cntryTextBox.Font.GetHeight()) + 29;
                point.X += 7;
                countryLstBx.Location = point;
                this.countryLstBx.BringToFront();
                this.countryLstBx.Show();
            }
        }


        private void countryLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            btnCntryAdd_Click(sender, e);
            cntryTextBox.SelectionStart = cntryTextBox.Text.Length + 1;
            cntryTextBox.SelectionLength = 0;
        }

        private void selectedCountryLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {            
            btnCntryRemove_Click(sender, e);
        }

        private void indicatorLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            btnIndctrAdd_Click(sender, e);
        }

        private void selectedIndicatorLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            btnIndctrRemove_Click(sender, e);
        }

        private void countryLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                btnCntryAdd_Click(sender, e);
                cntryTextBox.SelectionStart = cntryTextBox.Text.Length + 1;
                cntryTextBox.SelectionLength = 0;
            }

            if (e.KeyCode == Keys.Escape || e.KeyCode == Keys.Back)
            {
                cntryTextBox.Focus();
                countryLstBx.ClearSelected();
            }
        }

        private void selectedCountryLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                btnCntryRemove_Click(sender, e);
            }
        }

        private void indicatorLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                btnIndctrAdd_Click(sender, e);
            }

            if (e.KeyCode == Keys.Escape || e.KeyCode == Keys.Back)
            {
                indicatorsLstBx.ClearSelected();
                indctrTextBox.Select();
            }
        }

        private void selectedIndicatorLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                btnIndctrRemove_Click(sender, e);
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
            if (indicatorsLstBx.Visible && (e.KeyCode == Keys.Up || e.KeyCode == Keys.Down))
            {
                indicatorsLstBx.Select();
                indicatorsLstBx.SetSelected(0, true);
            }
        }

        private void indctrTextBox_TextChanged(object sender, EventArgs e)
        {
            indicatorsLstBx.Items.Clear();
            if (indctrTextBox.Text.Length == 0)
            {
                hideAutoCompleteMenu2();
                if (selectedCountryLstBx.Items.Count > 0)
                {
                    btnCntryAdd_Click(sender, e);
                }
                indicatorsLstBx.Show();
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
                        indicatorsLstBx.Items.Add(s);
                    }
                }
            }
            else
            {
                MessageBox.Show("Please select country first");
                indctrTextBox.Clear();
                cntryTextBox.Select();
            }

            if (indicatorsLstBx.Items.Count > 0)
            {
                Point point = this.indctrTextBox.GetPositionFromCharIndex
                 (indctrTextBox.SelectionStart);
                point.Y += (int)Math.Ceiling(this.indctrTextBox.Font.GetHeight()) + 261;
                point.X += 7;
                indicatorsLstBx.Location = point;
                this.indicatorsLstBx.BringToFront();
                this.indicatorsLstBx.Show();
            }
        }

        private void allCountriesBox_CheckedChanged(object sender, EventArgs e)
        {
            if (allCountriesBox.Checked == true)
            {
                countryLstBx.Enabled = false;
                allIndicatorsBox.Enabled = false;
                selectedCountryLstBx.Items.Clear();
                selectedCountryLstBx.Items.Add("All");
                indicatorsLstBx.Items.Clear();
                for (int i = 0; i < helperClass.category.Length; i++)
                {
                    if (!indicatorsLstBx.Items.Contains(helperClass.category[i]))
                        indicatorsLstBx.Items.Insert(i, helperClass.category[i]);
                }
                indctrTextBox.Focus();
                AutoCompleteList = indics_list();
            }
            else
            {
                countryLstBx.Enabled = true;
                allIndicatorsBox.Enabled = true;
                selectedCountryLstBx.Items.Clear();
            }
        }

        private void allIndicatorsBox_CheckedChanged(object sender, EventArgs e)
        {
            if (allIndicatorsBox.Checked == true)
            {
                indicatorsLstBx.Enabled = false;
                allCountriesBox.Enabled = false;
                selectedIndicatorsLstBx.Items.Clear();
                selectedIndicatorsLstBx.Items.Add("All");
            }
            else
            {
                indicatorsLstBx.Enabled = true;
                allCountriesBox.Enabled = true;
                selectedIndicatorsLstBx.Items.Clear();
            }
        }
    }
 }


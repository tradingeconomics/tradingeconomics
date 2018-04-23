using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Windows.Forms;

namespace TE
{
    public partial class forecastsFrm : Form
    {
        List<string> AutoCompleteList;

        public forecastsFrm()
        {
            try
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
                for (int n = 0; n < helperClass.forcNames.Length; n++)
                {
                    columnsListBox.Items.Insert(n, helperClass.forcNames[n]);
                    columnsListBox.SetItemChecked(n, true);
                }
                AutoCompleteList = indics_list();
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
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
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
            try
            {
                using (WebClient wc = new WebClient())
                {
                    JArray o = JArray.Parse(wc.DownloadString(url2));
                    indicatorLstBx.Items.Clear();
                    int k = 0;
                    for (int i = 0; i < o.Count; i++)
                    {
                        if (o[i]["Category"].ToString() != "Credit Rating")
                        {
                            if (selectedCountryLstBx.Items[0].ToString() == "Commodity")
                            {
                                indicatorLstBx.Items.Insert(k, o[i]["Title"].ToString());
                                columnsListBox.Items.Clear();
                                for (int n = 0; n < helperClass.forcComodNames.Length; n++)
                                {
                                    columnsListBox.Items.Insert(n, helperClass.forcComodNames[n]);
                                    columnsListBox.SetItemChecked(n, true);
                                }
                            }
                            else
                            {
                                indicatorLstBx.Items.Insert(k, o[i]["Category"].ToString());
                            }
                            k++;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Info("url2 = " + url2);
                helperClass.log.Error(ex);
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
            try
            {
                foreach (string item in countryLstBx.SelectedItems)
                {
                    if (!selectedCountryLstBx.Items.Contains(item))
                        selectedCountryLstBx.Items.Add(item);
                }

                if (selectedCountryLstBx.Items.Count == 1)
                {
                    string url2 = helperClass.host + "forecast/country/" + selectedCountryLstBx.Items[0].ToString() +
                        "?client=" + apiKeyFrm.apiKey + "&excel=" + apiKeyFrm.excelVersion;

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
                cntryTextBox.Focus();
                countryLstBx.ClearSelected();
                AutoCompleteList = indics_list();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void btnCntryRemove_Click(object sender, EventArgs e)
        {
            try
            {
                for (int i = selectedCountryLstBx.SelectedIndices.Count - 1; i >= 0; i--)
                {
                    selectedCountryLstBx.Items.RemoveAt(selectedCountryLstBx.SelectedIndices[i]);
                }

                if (selectedCountryLstBx.Items.Count == 1)
                {
                    string url2 = helperClass.host + "forecast/country/" + selectedCountryLstBx.Items[0].ToString() +
                        "?client=" + apiKeyFrm.apiKey + "&excel=" + apiKeyFrm.excelVersion;

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
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void btnIndctrAdd_Click(object sender, EventArgs e)
        {
            try
            {
                foreach (string item in indicatorLstBx.SelectedItems)
                {
                    if (!selectedIndicatorLstBx.Items.Contains(item))
                        selectedIndicatorLstBx.Items.Add(item);
                }
                indctrTextBox.Focus();
                indicatorLstBx.ClearSelected();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void btnIndctrRemove_Click(object sender, EventArgs e)
        {
            try
            {
                for (int i = selectedIndicatorLstBx.SelectedIndices.Count - 1; i >= 0; i--)
                {
                    selectedIndicatorLstBx.Items.RemoveAt(selectedIndicatorLstBx.SelectedIndices[i]);
                }
                selectedIndicatorLstBx.Focus();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            try
            {
                helperClass.origin = false;
                if (selectedCountryLstBx.Items.Count == 0 || selectedIndicatorLstBx.Items.Count == 0)
                {
                    string field = (selectedCountryLstBx.Items.Count == 0) ? "Country" : "Indicator";
                    MessageBox.Show( field + " should be provided");
                }
                else
                {
                    string selectedIsoCntry = sharedFunctions.toIsoCountry(selectedCountryLstBx);
                    if (sharedFunctions.checkCountryLength(selectedIsoCntry)) return;

                    string selectedIndic = sharedFunctions.getIndicators(selectedIndicatorLstBx);
                    if (sharedFunctions.checkIndicatorsLength(selectedIndic)) return;

                    Microsoft.Office.Interop.Excel.Range dateCell = helperClass.CellAddress(activeCellPositionBox.Text);
                    helperClass.runFormula = "RunAutomatically = 1";

                    string indFm = string.Format("=TEForecasts( \"{0}\", \"{1}\", \"{2}\", {3})",
                        selectedIsoCntry,
                        selectedIndic,
                        String.Join(",", sharedFunctions.getColumns(columnsListBox)),
                        dateCell[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]);

                    MyRibbon.cellRange = helperClass.CellAddress(activeCellPositionBox.Text);
                    MyRibbon.cellRange.Formula = indFm;
                    Close();
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }           
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
                Close();         
        }

        private void cntryTextBox_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (countryLstBx.Enabled)
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
                        point.Y += (int)Math.Ceiling(this.cntryTextBox.Font.GetHeight()) + 32;
                        point.X += 7;
                        countryLstBx.Location = point;
                        this.countryLstBx.BringToFront();
                        this.countryLstBx.Show();
                    }
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }               
        }

        private void countryLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            try
            {
                btnCntryAdd_Click(sender, e);
                cntryTextBox.SelectionStart = cntryTextBox.Text.Length + 1;
                cntryTextBox.SelectionLength = 0;
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
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
            if (e.KeyCode == Keys.Enter) btnCntryRemove_Click(sender, e);
        }

        private void indicatorLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) btnIndctrAdd_Click(sender, e);

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
            if (countryLstBx.Enabled && (e.KeyCode == Keys.Up || e.KeyCode == Keys.Down))
            {
                countryLstBx.Select();
                countryLstBx.SetSelected(0, true);
            }
        }

        private void indctrTextBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (indicatorLstBx.Enabled && (e.KeyCode == Keys.Up || e.KeyCode == Keys.Down))
            {
                indicatorLstBx.Select();
                indicatorLstBx.SetSelected(0, true);
            }
        }

        private void indctrTextBox_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (indicatorLstBx.Enabled)
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
                            for (int i = 0; i < AutoCompleteList.ToList().Count; i++)
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
                        point.Y += (int)Math.Ceiling(this.indctrTextBox.Font.GetHeight()) + 259;
                        point.X += 7;
                        indicatorLstBx.Location = point;
                        this.indicatorLstBx.BringToFront();
                        this.indicatorLstBx.Show();
                    }
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }                        
        }

        private void allIndicatorsChckBox_CheckedChanged(object sender, EventArgs e)
        {
            if (allIndicatorsChckBox.Checked == true)
            {                
                indicatorLstBx.Enabled = false;
                allCountriesChckBox.Enabled = false;
                selectedIndicatorLstBx.Items.Clear();
                selectedIndicatorLstBx.Items.Add("All");
            }
            else
            {
                indicatorLstBx.Enabled = true;
                allCountriesChckBox.Enabled = true;
                selectedIndicatorLstBx.Items.Clear();
            }
        }

        private void allCountriesChckBox_CheckedChanged(object sender, EventArgs e)
        {
            if (allCountriesChckBox.Checked == true)
            {
                countryLstBx.Enabled = false;
                allIndicatorsChckBox.Enabled = false;
                selectedCountryLstBx.Items.Clear();
                selectedCountryLstBx.Items.Add("All");
                indctrTextBox.Focus();
                AutoCompleteList = indics_list();
            }
            else
            {
                countryLstBx.Enabled = true;
                allIndicatorsChckBox.Enabled = true;
                selectedCountryLstBx.Items.Clear();
            }
        }
    }
}

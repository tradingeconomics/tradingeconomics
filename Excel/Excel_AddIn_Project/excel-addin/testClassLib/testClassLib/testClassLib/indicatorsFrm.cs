using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
//using System.Diagnostics;
using System.Drawing;
using System.Net;
using System.Windows.Forms;

namespace TE
{
    public partial class indicatorsFrm : Form
    {
        List<string> AutoCompleteList;
        string selectedIndic;
        public static string[] selectedColumns = null;
        private bool fromIndTxtBox;

        public indicatorsFrm()
        {
            try
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

        private void indicatorListPopulate(string url2)
        {
            try
            {
                using (WebClient wc = new WebClient())
                {
                    JArray o = JArray.Parse(wc.DownloadString(url2));
                    indicatorsLstBx.Items.Clear();
                    int k = 0;
                    for (int i = 0; i < o.Count; i++)
                    {
                        if (o[i]["Category"].ToString() != "Credit Rating")
                        {
                            indicatorsLstBx.Items.Insert(k, o[i]["Category"].ToString());
                            k++;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Info(url2);
                //helperClass.log.Trace(ex.StackTrace);
                helperClass.log.Error(ex);
            }
        }

        private void countyAddRemoveHelper()
        {
            try
            {
                if ((selectedCountryLstBx.Items.Count == 1) && (selectedCountryLstBx.Items[0].ToString() != "All"))
                {
                    string url2 = helperClass.host + "country/" + selectedCountryLstBx.Items[0].ToString() +
                        "?client=" + apiKeyFrm.apiKey + "&excel=" + apiKeyFrm.excelVersion;

                    indicatorListPopulate(url2);
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
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }
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
                //helperClass.log.Info("Something went wrong trying get indicators list: " + e);
                helperClass.log.Trace(e.StackTrace);
            }
            return values_test;
        }

        private void btnCntryAdd_Click(object sender, EventArgs e)
        {
            try
            {
                allIndicatorsBox.Enabled = true;
                foreach (string item in countryLstBx.SelectedItems)
                {
                    if (!selectedCountryLstBx.Items.Contains(item))
                        selectedCountryLstBx.Items.Add(item);
                }

                countyAddRemoveHelper();
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

                countyAddRemoveHelper();
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
                foreach (string item in indicatorsLstBx.SelectedItems)
                {
                    if (!selectedIndicatorsLstBx.Items.Contains(item))
                        selectedIndicatorsLstBx.Items.Add(item);
                }
                indctrTextBox.Focus();
                indicatorsLstBx.ClearSelected();
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
                for (int i = selectedIndicatorsLstBx.SelectedIndices.Count - 1; i >= 0; i--)
                {
                    selectedIndicatorsLstBx.Items.RemoveAt(selectedIndicatorsLstBx.SelectedIndices[i]);
                }
                selectedIndicatorsLstBx.Focus();
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
                if (selectedCountryLstBx.Items.Count == 0 || selectedIndicatorsLstBx.Items.Count == 0)
                {
                    string field = (selectedCountryLstBx.Items.Count == 0) ? "Country" : "Indicator";
                    MessageBox.Show(field + " should be provided");
                }
                else
                {
                    string selectedIsoCntry = sharedFunctions.toIsoCountry(selectedCountryLstBx);
                    if (sharedFunctions.checkCountryLength(selectedIsoCntry)) return;

                    if (selectedIndicatorsLstBx.Items.Count > 0)
                    {
                        selectedIndic = sharedFunctions.getIndicators(selectedIndicatorsLstBx);
                        if (sharedFunctions.checkIndicatorsLength(selectedIndic)) return;
                    }

                    helperClass.runFormula = "RunAutomatically = 1";
                    Microsoft.Office.Interop.Excel.Range dateCell = helperClass.CellAddress(activeCellPositionBox.Text);

                    string indFm = string.Format("=TEIndicators( \"{0}\", \"{1}\", \"{2}\", {3})",
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
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
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
            if (e.KeyCode == Keys.Enter) btnCntryRemove_Click(sender, e);
        }

        private void indicatorLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) btnIndctrAdd_Click(sender, e);

            if (e.KeyCode == Keys.Escape || e.KeyCode == Keys.Back)
            {
                indicatorsLstBx.ClearSelected();
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
            if (indicatorsLstBx.Enabled && (e.KeyCode == Keys.Up || e.KeyCode == Keys.Down))
            {
                indicatorsLstBx.Select();
                indicatorsLstBx.SetSelected(0, true);
            }
        }

        private void indctrTextBox_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (indicatorsLstBx.Enabled)
                {
                    indicatorsLstBx.Items.Clear();
                    if (indctrTextBox.Text.Length == 0)
                    {
                        hideAutoCompleteMenu2();

                        if (selectedCountryLstBx.Items.Count > 0)
                        {
                            fromIndTxtBox = true;
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
                        point.Y += (int)Math.Ceiling(this.indctrTextBox.Font.GetHeight()) + 251;
                        point.X += 7;
                        indicatorsLstBx.Location = point;
                        this.indicatorsLstBx.BringToFront();
                        this.indicatorsLstBx.Show();
                    }
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }                      
        }

        private void allCountriesBox_CheckedChanged(object sender, EventArgs e)
        {
            try
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
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void allIndicatorsBox_CheckedChanged(object sender, EventArgs e)
        {
            try
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
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }
    }
 }
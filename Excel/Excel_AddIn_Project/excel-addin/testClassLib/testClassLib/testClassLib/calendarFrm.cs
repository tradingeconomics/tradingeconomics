using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace TE
{
    public partial class calendarFrm : Form
    {
        List<string> AutoCompleteList;
        string date1;
        string date2;

        public calendarFrm()
        {
            try
            {
                InitializeComponent();
                cntryTextBox.Select();
                activeCellPositionBox.Text = helperClass.RangeAddress();
                for (int i = 0; i < helperClass.cntry.Length; i++)
                {
                    countryLstBx.Items.Insert(i, helperClass.cntry[i]);
                }

                indicatorLstBx.Items.Clear();
                for (int i = 0; i < helperClass.calendarIndicator.Length; i++)
                {
                    if (!indicatorLstBx.Items.Contains(helperClass.calendarIndicator[i]))
                        indicatorLstBx.Items.Insert(i, helperClass.calendarIndicator[i]);
                }

                for (int n = 0; n < helperClass.calendNames.Length; n++)
                {
                    columnsListBox.Items.Insert(n, helperClass.calendNames[n]);
                    columnsListBox.SetItemChecked(n, true);
                }

                dateTimePicker1.Value = DateTime.Today;
                dateTimePicker2.Value = DateTime.Today.AddMonths(3);
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
            //helperClass.log.Info("Adding country(s)");
            try
            {
                foreach (string item in countryLstBx.SelectedItems)
                {
                    if (!selectedCountryLstBx.Items.Contains(item))
                        selectedCountryLstBx.Items.Add(item);
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
        
        private void dateTimePicker1_ValueChanged(object sender, EventArgs e)
        {
            try
            {
                date1 = dateTimePicker1.Value.ToString("yyyy-MM-dd");
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }
        
        private void dateTimePicker2_ValueChanged(object sender, EventArgs e)
        {
            try
            {
                date2 = dateTimePicker2.Value.ToString("yyyy-MM-dd");
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
                if (selectedCountryLstBx.Items.Count == 0 || selectedIndicatorLstBx.Items.Count == 0)
                {
                    string field = (selectedCountryLstBx.Items.Count == 0) ? "Country" : "Indicator";
                    MessageBox.Show(field + " should be provided");
                }
                else
                {
                    helperClass.origin = false;
                    if (date1 == null & date2 == null)
                    {
                        date1 = dateTimePicker1.Value.ToString("yyyy-MM-dd");
                        date2 = dateTimePicker2.Value.ToString("yyyy-MM-dd");
                    }

                    string selectedIsoCntry = sharedFunctions.toIsoCountry(selectedCountryLstBx);
                    if (sharedFunctions.checkCountryLength(selectedIsoCntry)) return;

                    string selectedIndic = sharedFunctions.getIndicators(selectedIndicatorLstBx);
                    if (sharedFunctions.checkIndicatorsLength(selectedIndic)) return;

                    List<string> columns = sharedFunctions.getColumns(columnsListBox);

                    helperClass.runFormula = "RunAutomatically = 1";
                    Microsoft.Office.Interop.Excel.Range dateCell = helperClass.CellAddress(activeCellPositionBox.Text);

                    string clndrFm = string.Format(
                        $"=TECalendar( \"{selectedIsoCntry}\", \"{selectedIndic}\", \"{date1}\", \"{date2}\", \"{String.Join(",", columns)}\", {dateCell[2, 2].Address[false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1]})");

                    MyRibbon.cellRange = helperClass.CellAddress(activeCellPositionBox.Text);
                    MyRibbon.cellRange.Formula = clndrFm;
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
                        if (compareText == null || compareText.Equals("") || s.StartsWith(compareText.Trim(),
                            helperClass.comparison))
                        {
                            countryLstBx.Items.Add(s);
                        }
                    }

                    if (countryLstBx.Items.Count > 0)
                    {
                        Point point = this.cntryTextBox.GetPositionFromCharIndex
                         (cntryTextBox.SelectionStart);
                        point.Y += (int)Math.Ceiling(this.cntryTextBox.Font.GetHeight()) + 37;
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
                cntryTextBox.Focus();
                btnCntryAdd_Click(sender, e);
                cntryTextBox.SelectionStart = cntryTextBox.Text.Length + 1;
                cntryTextBox.SelectionLength = 0;
                countryLstBx.ClearSelected();
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
            try
            {
                btnIndctrAdd_Click(sender, e);
                indicatorLstBx.ClearSelected();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void selectedIndicatorLstBx_MouseDoubleClick(object sender, MouseEventArgs e)
        {
            btnIndctrRemove_Click(sender, e);         
        }

        private void countryLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            try
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
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void selectedCountryLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) btnCntryRemove_Click(sender, e);           
        }

        private void indicatorLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            try
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
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void selectedIndicatorLstBx_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) btnIndctrRemove_Click(sender, e);                          
        }

        private void cntryTextBox_KeyDown(object sender, KeyEventArgs e)
        {
            try
            {
                if (countryLstBx.Enabled && (e.KeyCode == Keys.Up || e.KeyCode == Keys.Down))
                {
                    countryLstBx.Select();
                    countryLstBx.SetSelected(0, true);
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        private void indctrTextBox_KeyDown(object sender, KeyEventArgs e)
        {
            try
            {
                if (indicatorLstBx.Enabled && (e.KeyCode == Keys.Up || e.KeyCode == Keys.Down))
                {
                    indicatorLstBx.Select();
                    indicatorLstBx.SetSelected(0, true);
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
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
                            for (int i = 0; i < helperClass.calendarIndicator.Length; i++)
                            {
                                if (!indicatorLstBx.Items.Contains(helperClass.calendarIndicator[i]))
                                    indicatorLstBx.Items.Insert(i, helperClass.calendarIndicator[i]);
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
                        point.Y += (int)Math.Ceiling(this.indctrTextBox.Font.GetHeight()) + 263;
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

        private void allCountriesBox_CheckedChanged(object sender, EventArgs e)
        {
            try
            {
                if (allCountriesBox.Checked == true)
                {
                    countryLstBx.Enabled = false;
                    selectedCountryLstBx.Items.Clear();
                    selectedCountryLstBx.Items.Add("All");
                    indctrTextBox.Focus();
                }
                else
                {
                    countryLstBx.Enabled = true;
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
                    indicatorLstBx.Enabled = false;
                    selectedIndicatorLstBx.Items.Clear();
                    selectedIndicatorLstBx.Items.Add("All");
                }
                else
                {
                    indicatorLstBx.Enabled = true;
                    selectedIndicatorLstBx.Items.Clear();
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }
    }
}

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
    public partial class indicatorsFrm : Form
    {
        public indicatorsFrm()
        {
            InitializeComponent();
            cntryTextBox.Select();
            activeCellPositionBox.Text = helperClass.RangeAddress();
            for (int i = 0; i < helperClass.cntry.Length; i++)
            {
                countryLstBx.Items.Insert(i, helperClass.cntry[i]);
            }

            this.cntryTextBox.KeyDown += new KeyEventHandler(cntryTextBox_KeyDown);
            this.indctrTextBox.KeyDown += new KeyEventHandler(indctrTextBox_KeyDown);
            this.countryLstBx.KeyDown += new KeyEventHandler(countryLstBx_KeyDown);
            this.countryLstBx.MouseDoubleClick += new MouseEventHandler(countryLstBx_MouseDoubleClick);
            this.indicatorsLstBx.KeyDown += new KeyEventHandler(indicatorLstBx_KeyDown);
            this.indicatorsLstBx.MouseDoubleClick += new MouseEventHandler(indicatorLstBx_MouseDoubleClick);
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
                string url2 = helperClass.host + "country/" + selectedCountryLstBx.Items[0].ToString() + "?client=" + apiKeyFrm.apiKey + "&excel=" + helperClass.Determine_OfficeVersion();
                try
                {
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
            AutoCompleteList = indics_list();
        }

        private void btnCntryRemove_Click(object sender, EventArgs e)
        {
            for (int i = selectedCountryLstBx.SelectedIndices.Count - 1; i >= 0; i--)
            {
                selectedCountryLstBx.Items.RemoveAt(selectedCountryLstBx.SelectedIndices[i]);
            }
        }

        private void btnIndctrAdd_Click(object sender, EventArgs e)
        {
            foreach (string item in indicatorsLstBx.SelectedItems)
            {
                if (selectedIndicatorsLstBx.Items.Count < 10)
                {
                    if (!selectedIndicatorsLstBx.Items.Contains(item))
                        selectedIndicatorsLstBx.Items.Add(item);
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
            for (int i = selectedIndicatorsLstBx.SelectedIndices.Count - 1; i >= 0; i--)
            {
                selectedIndicatorsLstBx.Items.RemoveAt(selectedIndicatorsLstBx.SelectedIndices[i]);
            }
        }


        
        string selectedCntry;
        string selectedIndic;
        private void btnOK_Click(object sender, EventArgs e)
        {
            helperClass.log.Info("Indicators button OK is clicked");
            helperClass.origin = false;
            if (selectedCountryLstBx.Items.Count != 0 & selectedIndicatorsLstBx.Items.Count == 0)
            {
                List<string> values = new List<string>();
                foreach (string item in selectedCountryLstBx.Items)
                {                    
                    values.Add(item.ToString());
                }
                selectedCntry = String.Join(",", values);
            }
            else
            {
                List<string> values = new List<string>();
                foreach (string item in selectedCountryLstBx.Items)
                {
                    values.Add(item.ToString());
                }
                selectedCntry = String.Join(",", values);

                List<string> values1 = new List<string>();
                foreach (string item in selectedIndicatorsLstBx.Items)
                {
                    values1.Add(item.ToString());
                }
                selectedIndic = String.Join(",", values1);
            }

            //Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
            //Microsoft.Office.Interop.Excel.Range cellRange = app.ActiveCell;
            helperClass.runFormula = "RunAutomatically = 1";
            string rnFm = "RunAutomatically = 0";
            string indFm = string.Format("=TEIndicators( \"{0}\", \"{1}\", \"{2}\")",
                    selectedCntry, selectedIndic, rnFm);
                helperClass.log.Info("Formula {0}", indFm);
            helperClass.cellRange = helperClass.CellAddress(activeCellPositionBox.Text);
            helperClass.cellRange.Formula = indFm;
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
            indicatorsLstBx.ClearSelected();
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
                indicatorsLstBx.ClearSelected();
            }

            if (e.KeyCode == Keys.Escape || e.KeyCode == Keys.Back)
            {
                indicatorsLstBx.ClearSelected();
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
                point.Y += (int)Math.Ceiling(this.indctrTextBox.Font.GetHeight()) + 222;
                point.X += 14;
                indicatorsLstBx.Location = point;
                this.indicatorsLstBx.BringToFront();
                this.indicatorsLstBx.Show();
            }
        }
    }
    }


using Newtonsoft.Json.Linq;
using System;
//using System.Diagnostics;
using System.Net;
using System.Windows.Forms;


namespace TE
{


    public partial class apiKeyFrm : Form
    {
        public static String apiKey = Properties.Settings.Default.userApiKey;
        public static bool validApiKey;
        public static String excelVersion;

        public apiKeyFrm()
        {
            try
            {
                InitializeComponent();
                apiKeyTextBox.Text = apiKey;
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }
      
        private void apiKeyTextBox_TextChanged(object sender, EventArgs e)
        {
            try
            {
                apiKey = apiKeyTextBox.Text.Trim();
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
                //helperClass.log.Info("Submit button is pressed");
                if (apiKey.Length == 0)
                {
                    DialogResult dialogResult = MessageBox.Show(
                        "You will be logged in with guest credentials. For any request only default datasets will be provided. Do you want to proceed?",
                        "", MessageBoxButtons.YesNo);
                    if (dialogResult == DialogResult.No)
                    {
                        return;
                    }
                    else
                    {
                        apiKey = "guest:guest";
                    }
                }

                try
                {
                    excelVersion = helperClass.Determine_OfficeVersion();
                }
                catch (Exception)
                {
                    excelVersion = "NoExcelVersion";
                }

                try
                {
                    using (WebClient wc = new WebClient())
                    {
                        //helperClass.log.Info("Checking credentials...");
                        //string url = helperClass.host + "markets/bond?client=" + apiKey + "&excel=" + excelVersion;
                        //helperClass.log.Info("apiKeyFrm - btnOK_Click, url = " + url);
                        JArray.Parse(wc.DownloadString(
                            helperClass.host + "markets/bond?client=" + apiKey + "&excel=" + excelVersion));
                    }
                    validApiKey = true;
                    Properties.Settings.Default.userApiKey = apiKey;
                    Properties.Settings.Default.Save();
                    Properties.Settings.Default.Reload();
                }
                catch (System.Net.WebException ex)
                {
                    helperClass.log.Error("API key Error: " + ex);

                    MessageBox.Show("Wrong API Key");
                    validApiKey = false;
                    return;
                }
                Close();
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

        private void btnGetKey_Click(object sender, EventArgs e)
        {
            try
            {
                System.Diagnostics.Process.Start("https://sso.tradingeconomics.com/member/excel");
                //helperClass.log.Info("On API key form, GetKey button is pressed");
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }
    }
}

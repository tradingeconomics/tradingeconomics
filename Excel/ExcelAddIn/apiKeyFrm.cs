using Newtonsoft.Json.Linq;
using System;
using System.Diagnostics;
using System.Net;
using System.Windows.Forms;


namespace TE
{


    public partial class apiKeyFrm : Form
    {
        public static String apiKey = Properties.Settings.Default.userApiKey;
        public static bool validApiKey;

        public apiKeyFrm()
        {
            InitializeComponent();
            apiKeyTextBox.Text = apiKey;
        }
      

        private void apiKeyTextBox_TextChanged(object sender, EventArgs e)
        {
            apiKey = apiKeyTextBox.Text.Trim(); 
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            helperClass.log.Info("Submit button is pressed");
            if (apiKey.Length == 0)
            {
                DialogResult dialogResult = MessageBox.Show("You will be logged in with guest credentials. For any request only default datasets will be provided. Do you want to proceed?", "" ,MessageBoxButtons.YesNo);
                if(dialogResult == DialogResult.No)
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
                using (WebClient wc = new WebClient())
                {
                    helperClass.log.Info("Checking credentials...");
                    string url = helperClass.host + "markets/bonds?client=" + apiKey + "&excel=" + helperClass.Determine_OfficeVersion();
                    var json = wc.DownloadString(url);
                    JArray o = JArray.Parse(json);
                }
                validApiKey = true;
                Properties.Settings.Default.userApiKey = apiKey;
                Properties.Settings.Default.Save();                
                Properties.Settings.Default.Reload();
            }
            catch (System.Net.WebException)
            {
                MessageBox.Show("Wrong API Key");
                validApiKey = false;                               
                return;
            }
            Close();
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            Close();
            helperClass.log.Info("On API key form, Cancel button is pressed");
        }

        private void btnGetKey_Click(object sender, EventArgs e)
        {
            System.Diagnostics.Process.Start("http://www.tradingeconomics.com/analytics/");// ("http://sso.tradingeconomics.com/?returnurl=analytics.tradingeconomics.com/api/");
            helperClass.log.Info("On API key form, GetKey button is pressed");
        }
    }
}

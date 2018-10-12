using Newtonsoft.Json.Linq;
//using System.Diagnostics;
using System.Net;
using System.Windows.Forms;
using System.Collections;

namespace TE
{
    public class requestData
    {
        public readonly string _url;

        public requestData(string url)
        {
            _url = url;
        }

        public JArray getJSON()
        {
            try
            {
                using (WebClient wc = new WebClient())
                {
                    string json = "{}";
                    wc.Encoding = System.Text.Encoding.UTF8;
                    try
                    {
                        helperClass.log.Info("Requesting data from URL: " + _url + ".");
                        json = wc.DownloadString(_url);
                    }
                    catch (WebException ex)
                    {         
						
						// depending error code do something
						               
                        MessageBox.Show("No available data for your request. This could be due to your account subscription plan.\rPlease contact support or subscribe to one of our paid plans.");
                        helperClass.log.Info("An error occurred when making a api request, status code: " + ((HttpWebResponse)ex.Response).StatusCode);
                        helperClass.log.Trace(ex.StackTrace);                        
                        throw;                        
                    }

					//helperClass.log.Info(JArray.Parse(json).ToString());
					return JArray.Parse(json);
                }
            }
            catch (System.Exception ex)
            {
                helperClass.log.Info("Unable to parse json from response - " + ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                //JArray empty_array = new JArray();
                //return empty_array;
                throw;
            }           
        }
    }
}

using Newtonsoft.Json.Linq;
//using System.Diagnostics;
using System.Net;
using System.Windows.Forms;

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
                    string json;
                    wc.Encoding = System.Text.Encoding.UTF8;
                    try
                    {
                        helperClass.log.Info("URL From request data: " + _url);
                        json = wc.DownloadString(_url);
                    }
                    catch (WebException ex)
                    {                        
                        MessageBox.Show("An error occurred, status code: " + ((HttpWebResponse)ex.Response).StatusCode);
                        helperClass.log.Info(ex.Message);
                        helperClass.log.Trace(ex.StackTrace);                        
                        throw;                        
                    }                                        
                    return JArray.Parse(json);
                }
            }
            catch (System.Exception ex)
            {
                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                throw;
            }           
        }
    }
}

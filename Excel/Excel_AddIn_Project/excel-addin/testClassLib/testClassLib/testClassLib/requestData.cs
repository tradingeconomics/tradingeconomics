using Newtonsoft.Json.Linq;
using System.Diagnostics;
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
            JArray jsonData = new JArray();
            helperClass.log.Info("Parsing JSon string (requestData)");
            try
            {
                using (WebClient wc = new WebClient())
                {
                    string json;
                    wc.Encoding = System.Text.Encoding.UTF8;
                    helperClass.log.Info("requestData - getJSON, _url = " + _url);
                    try
                    {
                        json = wc.DownloadString(_url);
                    }
                    catch (WebException ex)
                    {
                        
                        var statusCode = ((HttpWebResponse)ex.Response).StatusCode;
                        MessageBox.Show("An error occurred, status code: " + statusCode);
                        helperClass.log.Info(ex.Message);
                        helperClass.log.Trace(ex.StackTrace);                        
                        throw;                        
                    }
                                        
                    jsonData = JArray.Parse(json);
                }
            }
            catch (System.Exception ex)
            {
                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                throw;
            }
           
            return jsonData;
        }
    }
}

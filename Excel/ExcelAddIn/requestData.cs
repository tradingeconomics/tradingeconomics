using Newtonsoft.Json.Linq;
using System.Diagnostics;
using System.Net;

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
                    wc.Encoding = System.Text.Encoding.UTF8;
                    var json = wc.DownloadString(_url);                    
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

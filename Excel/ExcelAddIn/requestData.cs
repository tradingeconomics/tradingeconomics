using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace testClassLib
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
            var jsonData = new JArray();
            helperClass.log.Info("Parsing JSon string");
            using (WebClient wc = new WebClient())
            {
                wc.Encoding = System.Text.Encoding.UTF8;
                var json = wc.DownloadString(_url);
                jsonData = JArray.Parse(json);
            }
            return jsonData;
        }
    }
}

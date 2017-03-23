using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testClassLib
{
    class getDictionary
    {
        public readonly string _url;

        public getDictionary(string url)
        {
            _url = url;
        }

        public Dictionary<string, Dictionary<string, string>> getDic()
        {
            var jsnData = new requestData(_url);
            var jsData = jsnData.getJSON();

            Dictionary<string, Dictionary<string, string>> myDictDict = new Dictionary<string, Dictionary<string, string>>();
            List<string> column_keys = new List<string>();
            for (int r = 0; r < jsData.Count; r++)
            {
                Dictionary<string, string> dict = new Dictionary<string, string>();                
                dict.Add(jsData[r]["Country"].ToString() + " " + jsData[r]["Category"].ToString(), jsData[r]["Value"].ToString());           

                if (myDictDict.ContainsKey(jsData[r]["DateTime"].ToString()))
                {
                    myDictDict[jsData[r]["DateTime"].ToString()].Add(jsData[r]["Country"].ToString() + " " + jsData[r]["Category"].ToString(), jsData[r]["Value"].ToString());
                }
                else
                {
                    myDictDict.Add(jsData[r]["DateTime"].ToString(), dict);
                }
            }
            return myDictDict;
        }

        public List<string> getColumns()
        {
            List<string> column_keys = new List<string>();

            var jsnData = new requestData(_url);
            var jsData = jsnData.getJSON();
            for (int r = 0; r < jsData.Count; r++)
            {
                if (!column_keys.Contains(jsData[r]["Country"].ToString() + " " + jsData[r]["Category"].ToString(), StringComparer.OrdinalIgnoreCase))
                {
                    column_keys.Add(jsData[r]["Country"].ToString() + " " + jsData[r]["Category"].ToString());
                }
            }
            return column_keys;
        }
    }
}

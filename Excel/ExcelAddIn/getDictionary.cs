using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;


namespace TE
{
    class getDictionary
    {
        //public readonly string _url;
        public readonly string _cntry;
        public readonly string _indctr;
        public readonly string _key;
        public readonly string _iniDate;
        public readonly string _clsDate;

        public getDictionary(string cntry, string indctr, string key, string iniDate, string clsDate)//string url)
        {
            //Debug.WriteLine("getDictionary cntry: " + cntry);
            //Debug.WriteLine("getDictionary indctr: " + indctr);

            //_url = url;
            _cntry = cntry;
            _indctr = indctr;
            _key = key;
            _iniDate = iniDate;
            _clsDate = clsDate;
        }

        public Dictionary<string, Dictionary<string, string>> getDic()
        {
            helperClass.log.Info("getDictionary");
            //var jsnData = new requestData(_url);
            //var jsData = jsnData.getJSON();

            JArray jsData = new JArray();
            string[][] cntrStaff = helperClass.getStaff(_cntry);
            for (int j = 0; j < cntrStaff.Length; j++)
            {
                string chunk = "";
                for (int i = 0; i < cntrStaff[j].Length; i++)
                {
                    chunk += cntrStaff[j][i] + ",";
                }
                //Debug.WriteLine("Cntry to URL: " + chunk);
                 string url = helperClass.getTsUrl(chunk, _indctr, _key, _iniDate, _clsDate);
                //Debug.WriteLine(url);
                var jsnData = new requestData(url);
                foreach (var k in jsnData.getJSON())
                {
                    jsData.Add(k);
                }
            }

            //for (int r = 0; r < jsData.Count; r++)
            //{
            //    Debug.WriteLine(jsData[r]);
            //}

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
            helperClass.log.Info("getColumns from getDictionary");
            List<string> column_keys = new List<string>();
            //var jsnData = new requestData(_url);
            //var jsData = jsnData.getJSON();

            JArray jsData = new JArray();
            string[][] cntrStaff = helperClass.getStaff(_cntry);
            for (int j = 0; j < cntrStaff.Length; j++)
            {
                string chunk = "";
                for (int i = 0; i < cntrStaff[j].Length; i++)
                {
                    chunk += cntrStaff[j][i] + ",";
                }
                //Debug.WriteLine("Cntry to URL: " + chunk);
                string url = helperClass.getTsUrl(chunk, _indctr, _key, _iniDate, _clsDate);
                //Debug.WriteLine(url);
                var jsnData = new requestData(url);
                foreach (var k in jsnData.getJSON())
                {
                    jsData.Add(k);
                }
            }

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

using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
//using System.Diagnostics;
using System.Linq;
using System.Windows.Forms;
//using System.Windows.Forms;

namespace TE
{
    class getDictionary
    {
        public readonly string _cntry;
        public readonly string _indctr;
        public readonly string _iniDate;
        public readonly string _clsDate;

        public getDictionary(string cntry, string indctr, string iniDate, string clsDate)//string url)
        {
            _cntry = cntry;
            _indctr = indctr;
            _iniDate = iniDate;
            _clsDate = clsDate;
        }

        public Dictionary<DateTime, Dictionary<string, string>> getDic()
        {
            //helperClass.log.Info("getDictionary");

            JArray jsData = new JArray();
            string[][] cntrStaff = helperClass.getStaff(_cntry);
            for (int j = 0; j < cntrStaff.Length; j++)
            {
                string chunk = "";
                for (int i = 0; i < cntrStaff[j].Length; i++)
                {
                    chunk += cntrStaff[j][i] + ",";
                }
                var jsnData = new requestData(helperClass.getTsUrl(chunk, _indctr, _iniDate, _clsDate));
                foreach (var k in jsnData.getJSON())
                {
                    jsData.Add(k);
                }
            }

            if (jsData.Count == 0) MessageBox.Show("No data provided for selected parameters");                

            Dictionary<DateTime, Dictionary<string, string>> myDictDict = new Dictionary<DateTime, Dictionary<string, string>>();

            for (int r = 0; r < jsData.Count; r++)
            {
                Dictionary<string, string> dict = new Dictionary<string, string>();                
                dict.Add(jsData[r]["Country"].ToString() + "-" + jsData[r]["Category"].ToString(), jsData[r]["Value"].ToString());
                if (myDictDict.ContainsKey(Convert.ToDateTime(jsData[r]["DateTime"])))
                {            
                    myDictDict[Convert.ToDateTime(jsData[r]["DateTime"])].Add(jsData[r]["Country"].ToString() + "-" + 
                        jsData[r]["Category"].ToString(), jsData[r]["Value"].ToString());
                }
                else
                {
                    myDictDict.Add(Convert.ToDateTime(jsData[r]["DateTime"]), dict);
                }
            }
            return myDictDict;
        }

        public List<string> getColumns()
        {
            //helperClass.log.Info("getColumns from getDictionary");
            List<string> column_keys = new List<string>();
            JArray jsData = new JArray();
            string[][] cntrStaff = helperClass.getStaff(_cntry);
            for (int j = 0; j < cntrStaff.Length; j++)
            {
                string chunk = "";
                for (int i = 0; i < cntrStaff[j].Length; i++)
                {
                    chunk += cntrStaff[j][i] + ",";
                }
                var jsnData = new requestData(helperClass.getTsUrl(chunk, _indctr, _iniDate, _clsDate));
                foreach (var k in jsnData.getJSON())
                {
                    jsData.Add(k);
                }
            }

            for (int r = 0; r < jsData.Count; r++)
            {
                if (!column_keys.Contains(jsData[r]["Country"].ToString() + "-" + jsData[r]["Category"].ToString(), StringComparer.OrdinalIgnoreCase))
                {
                    column_keys.Add(jsData[r]["Country"].ToString() + "-" + jsData[r]["Category"].ToString());
                }
            }
                        
            List<string> ordered_fullCntryNm = new List<string>(); ;
            foreach (var item in _cntry.Split(',').ToList())
            {
                if (helperClass.myCountrysDict.ContainsValue(item))
                    ordered_fullCntryNm.Add(helperClass.myLongCountrysDict[item]);
            }

            List<string> results;
            results = column_keys.OrderBy(d => {
                var index = ordered_fullCntryNm.IndexOf(d.Split('.', '-')[0]);
                return index == -1 ? int.MaxValue : index;
            }).ThenBy(p => {
                var index = _indctr.Split(',').ToList().IndexOf(p.Split('.', '-')[1]);
                return index == -1 ? int.MaxValue : index;
            }).ToList();

            return results;
        }
    }
}

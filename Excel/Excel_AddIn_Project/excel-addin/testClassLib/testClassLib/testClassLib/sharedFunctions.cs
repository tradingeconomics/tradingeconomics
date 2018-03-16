using Microsoft.Win32;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TE
{
    class sharedFunctions
    {
        //toIsoCountry - Convert country full name to ISO3 format. Hack to overcome Excel limitation of 255 characters per function parameter
        public static string toIsoCountry(ListBox countries)
        {
            List<string> isoValues = new List<string>();
            foreach (string item in countries.Items)
            {
                if (helperClass.myCountrysDict.ContainsKey(item))
                {
                    isoValues.Add(helperClass.myCountrysDict[item]);
                }
                else
                {
                    isoValues.Add(item.ToString());
                }
            }
            return String.Join(",", isoValues);
        }

        public static string getIndicators(ListBox selectedIndicatorsLstBx)
        {
            List<string> values1 = new List<string>();
            foreach (string item in selectedIndicatorsLstBx.Items)
            {
                values1.Add(item.ToString());
            }
            return String.Join(",", values1);
        }

        public static List<string> getColumns(CheckedListBox columnsListBox)
        {
            List<string> columns = new List<string>();
            foreach (string item in columnsListBox.CheckedItems)
            {
                columns.Add(item.ToString());
            }
            return columns;
        }

        public static bool checkCountryLength(string isoCntryString)
        {
            if (isoCntryString.Length > 255)
            {
                MessageBox.Show("You selected too many countries. Please remove some of them.");
                return true;
            }
            return false;
        }

        public static bool checkIndicatorsLength(string indctrsString)
        {
            if (indctrsString.Length > 255)
            {
                MessageBox.Show("You selected too many indicators. Please remove some of them.");
                return true;
            }
            return false;
        }
    }
}

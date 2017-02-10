using ExcelDna.Integration;
using Microsoft.Win32;
using Newtonsoft.Json.Linq;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace testClassLib
{
    class helperClass
    {
        public static string host = "http://api.tradingeconomics.com/";

        public static Logger log = LogManager.GetCurrentClassLogger();

        public static string[] cntry = {"Afghanistan",
                            "Albania",
                            "Algeria",
                            "Andorra",
                            "Angola",
                            "Antigua and Barbuda",
                            "Argentina",
                            "Armenia",
                            "Aruba",
                            "Australia",
                            "Austria",
                            "Azerbaijan",
                            "Bahamas",
                            "Bahrain",
                            "Bangladesh",
                            "Barbados",
                            "Belarus",
                            "Belgium",
                            "Belize",
                            "Benin",
                            "Bermuda",
                            "Bhutan",
                            "Bolivia",
                            "Bosnia and Herzegovina",
                            "Botswana",
                            "Brazil",
                            "Brunei",
                            "Bulgaria",
                            "Burkina Faso",
                            "Burundi",
                            "Cabo Verde",
                            "Cambodia",
                            "Cameroon",
                            "Canada",
                            "Cape Verde",
                            "Cayman Islands",
                            "Central African Republic",
                            "Chad",
                            "Chile",
                            "China",
                            "Colombia",
                            "Comoros",
                            "Congo",
                            "Costa Rica",
                            "Croatia",
                            "Cuba",
                            "Cyprus",
                            "Czech Republic",
                            "Denmark",
                            "Djibouti",
                            "Dominica",
                            "Dominican Republic",
                            "East Timor",
                            "Ecuador",
                            "Egypt",
                            "El Salvador",
                            "Equatorial Guinea",
                            "Eritrea",
                            "Estonia",
                            "Ethiopia",
                            "Euro Area",
                            "European Union",
                            "Fiji",
                            "Finland",
                            "France",
                            "Gabon",
                            "Gambia",
                            "Georgia",
                            "Germany",
                            "Ghana",
                            "Greece",
                            "Greenland",
                            "Grenada",
                            "Guam",
                            "Guatemala",
                            "Guinea",
                            "Guinea Bissau",
                            "Guyana",
                            "Haiti",
                            "Honduras",
                            "Hong Kong",
                            "Hungary",
                            "Iceland",
                            "India",
                            "Indonesia",
                            "Iran",
                            "Iraq",
                            "Ireland",
                            "Isle Of Man",
                            "Israel",
                            "Italy",
                            "Ivory Coast",
                            "Jamaica",
                            "Japan",
                            "Jordan",
                            "Kazakhstan",
                            "Kenya",
                            "Kiribati",
                            "Korea",
                            "Kosovo",
                            "Kuwait",
                            "Kyrgyzstan",
                            "Laos",
                            "Latvia",
                            "Lebanon",
                            "Lesotho",
                            "Liberia",
                            "Libya",
                            "Liechtenstein",
                            "Lithuania",
                            "Luxembourg",
                            "Macao",
                            "Macau",
                            "Macedonia",
                            "Madagascar",
                            "Malawi",
                            "Malaysia",
                            "Maldives",
                            "Mali",
                            "Malta",
                            "Marshall Islands",
                            "Mauritania",
                            "Mauritius",
                            "Mexico",
                            "Micronesia",
                            "Moldova",
                            "Monaco",
                            "Mongolia",
                            "Montenegro",
                            "Morocco",
                            "Mozambique",
                            "Myanmar",
                            "Namibia",
                            "Nepal",
                            "Netherlands",
                            "New Caledonia",
                            "New Zealand",
                            "Nicaragua",
                            "Niger",
                            "Nigeria",
                            "North Korea",
                            "Northern Mariana Islands",
                            "Norway",
                            "Oman",
                            "Pakistan",
                            "Palau",
                            "Palestine",
                            "Panama",
                            "Papua New Guinea",
                            "Paraguay",
                            "Peru",
                            "Philippines",
                            "Poland",
                            "Portugal",
                            "Puerto Rico",
                            "Qatar",
                            "Republic of the Congo",
                            "Romania",
                            "Russia",
                            "Rwanda",
                            "Samoa",
                            "San Marino",
                            "Sao Tome And Principe",
                            "Saudi Arabia",
                            "Senegal",
                            "Serbia",
                            "Seychelles",
                            "Sierra Leone",
                            "Singapore",
                            "Slovakia",
                            "Slovenia",
                            "Solomon Islands",
                            "Somalia",
                            "South Africa",
                            "South Korea",
                            "South Sudan",
                            "Spain",
                            "Sri Lanka",
                            "St Kitts And Nevis",
                            "St Lucia",
                            "St Vincent and the Grenadines",
                            "Sudan","Suriname",
                            "Swaziland",
                            "Sweden",
                            "Switzerland",
                            "Syria",
                            "Taiwan",
                            "Tajikistan",
                            "Tanzania",
                            "Thailand",
                            "Togo",
                            "Tonga",
                            "Trinidad and Tobago",
                            "Tunisia",
                            "Turkey",
                            "Turkmenistan",
                            "Uganda",
                            "Ukraine",
                            "United Arab Emirates",
                            "United Kingdom",
                            "United States",
                            "Uruguay",
                            "Uzbekistan",
                            "Vanuatu",
                            "Venezuela",
                            "Vietnam",
                            "Yemen",
                            "Zambia",
                            "Zimbabwe" };

        public static string[] cntry2 = {"Afghanistan",
                            "Albania",
                            "Algeria",
                            "Andorra",
                            "Angola",
                            "Antigua and Barbuda",
                            "Argentina",
                            "Armenia",
                            "Aruba",
                            "Australia",
                            "Austria",
                            "Azerbaijan",
                            "Bahamas",
                            "Bahrain",
                            "Bangladesh",
                            "Barbados",
                            "Belarus",
                            "Belgium",
                            "Belize",
                            "Benin",
                            "Bermuda",
                            "Bhutan",
                            "Bolivia",
                            "Bosnia and Herzegovina",
                            "Botswana",
                            "Brazil",
                            "Brunei",
                            "Bulgaria",
                            "Burkina Faso",
                            "Burundi",
                            "Cabo Verde",
                            "Cambodia",
                            "Cameroon",
                            "Canada",
                            "Cape Verde",
                            "Cayman Islands",
                            "Central African Republic",
                            "Chad",
                            "Chile",
                            "China",
                            "Colombia",
                            "Commodity",
                            "Comoros",
                            "Congo",
                            "Costa Rica",
                            "Croatia",
                            "Cuba",
                            "Cyprus",
                            "Czech Republic",
                            "Denmark",
                            "Djibouti",
                            "Dominica",
                            "Dominican Republic",
                            "East Timor",
                            "Ecuador",
                            "Egypt",
                            "El Salvador",
                            "Equatorial Guinea",
                            "Eritrea",
                            "Estonia",
                            "Ethiopia",
                            "Euro Area",
                            "European Union",
                            "Fiji",
                            "Finland",
                            "France",
                            "Gabon",
                            "Gambia",
                            "Georgia",
                            "Germany",
                            "Ghana",
                            "Greece",
                            "Greenland",
                            "Grenada",
                            "Guam",
                            "Guatemala",
                            "Guinea",
                            "Guinea Bissau",
                            "Guyana",
                            "Haiti",
                            "Honduras",
                            "Hong Kong",
                            "Hungary",
                            "Iceland",
                            "India",
                            "Indonesia",
                            "Iran",
                            "Iraq",
                            "Ireland",
                            "Isle Of Man",
                            "Israel",
                            "Italy",
                            "Ivory Coast",
                            "Jamaica",
                            "Japan",
                            "Jordan",
                            "Kazakhstan",
                            "Kenya",
                            "Kiribati",
                            "Korea",
                            "Kosovo",
                            "Kuwait",
                            "Kyrgyzstan",
                            "Laos",
                            "Latvia",
                            "Lebanon",
                            "Lesotho",
                            "Liberia",
                            "Libya",
                            "Liechtenstein",
                            "Lithuania",
                            "Luxembourg",
                            "Macao",
                            "Macau",
                            "Macedonia",
                            "Madagascar",
                            "Malawi",
                            "Malaysia",
                            "Maldives",
                            "Mali",
                            "Malta",
                            "Marshall Islands",
                            "Mauritania",
                            "Mauritius",
                            "Mexico",
                            "Micronesia",
                            "Moldova",
                            "Monaco",
                            "Mongolia",
                            "Montenegro",
                            "Morocco",
                            "Mozambique",
                            "Myanmar",
                            "Namibia",
                            "Nepal",
                            "Netherlands",
                            "New Caledonia",
                            "New Zealand",
                            "Nicaragua",
                            "Niger",
                            "Nigeria",
                            "North Korea",
                            "Northern Mariana Islands",
                            "Norway",
                            "Oman",
                            "Pakistan",
                            "Palau",
                            "Palestine",
                            "Panama",
                            "Papua New Guinea",
                            "Paraguay",
                            "Peru",
                            "Philippines",
                            "Poland",
                            "Portugal",
                            "Puerto Rico",
                            "Qatar",
                            "Republic of the Congo",
                            "Romania",
                            "Russia",
                            "Rwanda",
                            "Samoa",
                            "San Marino",
                            "Sao Tome And Principe",
                            "Saudi Arabia",
                            "Senegal",
                            "Serbia",
                            "Seychelles",
                            "Sierra Leone",
                            "Singapore",
                            "Slovakia",
                            "Slovenia",
                            "Solomon Islands",
                            "Somalia",
                            "South Africa",
                            "South Korea",
                            "South Sudan",
                            "Spain",
                            "Sri Lanka",
                            "St Kitts And Nevis",
                            "St Lucia",
                            "St Vincent and the Grenadines",
                            "Sudan","Suriname",
                            "Swaziland",
                            "Sweden",
                            "Switzerland",
                            "Syria",
                            "Taiwan",
                            "Tajikistan",
                            "Tanzania",
                            "Thailand",
                            "Togo",
                            "Tonga",
                            "Trinidad and Tobago",
                            "Tunisia",
                            "Turkey",
                            "Turkmenistan",
                            "Uganda",
                            "Ukraine",
                            "United Arab Emirates",
                            "United Kingdom",
                            "United States",
                            "Uruguay",
                            "Uzbekistan",
                            "Vanuatu",
                            "Venezuela",
                            "Vietnam",
                            "Yemen",
                            "Zambia",
                            "Zimbabwe" };

        public static string[] category = {"GDP",
                                "GDP per capita",
                                "GDP per capita PPP",
                                "Corruption Index",
                                "Corruption Rank",
                                "Ease of Doing Business",
                                "Exports",
                                "Imports",
                                "Balance of Trade",
                                "Inflation Rate",
                                "GDP Annual Growth Rate",
                                "Population",
                                "Unemployment Rate",
                                "Current Account",
                                "Government Budget",
                                "Current Account to GDP",
                                "Sales Tax Rate",
                                "Currency",
                                "Government Debt to GDP",
                                "Interest Rate",
                                "Food Inflation",
                                "Terrorism Index",
                                "Corporate Tax Rate",
                                "Deposit Interest Rate",
                                "Personal Income Tax Rate",
                                "Consumer Price Index Cpi",
                                "Competitiveness Rank",
                                "Competitiveness Index",
                                "Military Expenditure",
                                "GDP Constant Prices",
                                "Inflation Rate Mom",
                                "Gold Reserves",
                                "Government Spending",
                                "Industrial Production",
                                "Money Supply M1",
                                "Money Supply M2",
                                "Gross Fixed Capital Formation",
                                "Consumer Spending",
                                "Foreign Direct Investment",
                                "Social Security Rate For Companies",
                                "Social Security Rate",
                                "Social Security Rate For Employees",
                                "Cpi Transportation",
                                "Foreign Exchange Reserves",
                                "Government Budget Value",
                                "Changes in Inventories",
                                "Government Revenues",
                                "GDP Growth Rate",
                                "Employed Persons",
                                "Capital Flows",
                                "External Debt",
                                "Producer Prices",
                                "Fiscal Expenditure",
                                "Loans To Private Sector",
                                "Crude Oil Production",
                                "Unemployed Persons",
                                "Stock Market",
                                "GDP From Agriculture",
                                "GDP From Construction",
                                "GDP From Manufacturing",
                                "Retail Sales YoY",
                                "Money Supply M0",
                                "Gasoline Prices",
                                "Wages",
                                "Tourist Arrivals",
                                "Money Supply M3",
                                "Interbank Rate",
                                "Producer Prices Change",
                                "GDP From Services",
                                "Labor Force Participation Rate",
                                "Manufacturing Production",
                                "Central Bank Balance Sheet",
                                "Consumer Confidence",
                                "Business Confidence",
                                "Mining Production",
                                "Remittances",
                                "GDP From Public Administration",
                                "Core Inflation Rate",
                                "Retirement Age Men",
                                "Retirement Age Women",
                                "Consumer Credit",
                                "Employment Rate",
                                "Housing Index",
                                "Retail Sales MoM",
                                "Import Prices",
                                "GDP Deflator",
                                "Export Prices",
                                "GDP From Mining",
                                "Wages In Manufacturing",
                                "Core Consumer Prices",
                                "Banks Balance Sheet",
                                "Car Registrations",
                                "GDP From Transport",
                                "Industrial Production Mom",
                                "Minimum Wages",
                                "Steel Production",
                                "Youth Unemployment Rate",
                                "Government Bond 10Y",
                                "Capacity Utilization",
                                "GDP From Utilities",
                                "Wages High Skilled",
                                "Terms Of Trade",
                                "Gross National Product",
                                "Bank Lending Rate",
                                "Government Debt",
                                "Home Ownership Rate",
                                "Wages Low Skilled",
                                "Manufacturing PMI",
                                "Labour Costs",
                                "Productivity",
                                "Living Wage Individual",
                                "Personal Savings",
                                "Commodity",
                                "Job Vacancies",
                                "Private Sector Credit",
                                "Living Wage Family",
                                "Full Time Employment",
                                "Government Spending To Gdp",
                                "Part Time Employment",
                                "Construction Output",
                                "Electricity Production",
                                "Weapons Sales",
                                "Leading Economic Index",
                                "Employment Change",
                                "Asylum Applications",
                                "Long Term Unemployment Rate",
                                "Households Debt To Gdp",
                                "Building Permits",
                                "Harmonised Consumer Prices",
                                "Households Debt To Income",
                                "Disposable Personal Income",
                                "Private Debt to GDP",
                                "Bankruptcies",
                                "New Orders",
                                "Wage Growth",
                                "Housing Starts",
                                "Car Production",
                                "Lending Rate",
                                "Tourism Revenues" };


        public static string[] bondsNames = { "Symbol", "Name", "Country", "Date", "Last", "Group", "URL", "Importance", "DailyChange",
            "DailyPercentualChange", "WeeklyChange", "WeeklyPercentualChange", "MonthlyChange", "MonthlyPercentualChange", "YearlyChange",
            "YearlyPercentualChange", "YTDChange", "YTDPercentualChange", "yesterday", "lastWeek", "lastMonth", "lastYear", "startYear" };

        public static string[] marketsNames = new string[] { "Symbol", "Ticker", "Name", "Country", "Date", "Last", "Group", "URL", "Importance",
            "DailyChange", "DailyPercentualChange", "WeeklyChange", "WeeklyPercentualChange", "MonthlyChange", "MonthlyPercentualChange",
            "YearlyChange", "YearlyPercentualChange", "YTDChange", "YTDPercentualChange", "yesterday", "lastWeek", "lastMonth", "lastYear", "startYear" };

        public static string[] indNames = { "Country", "Category", "Title", "LatestValue", "LatestValueDate", "Source", "Unit", "URL",
            "CategoryGroup", "Frequency", "HistoricalDataSymbol", "PreviousValue", "PreviousValueDate" };

        public static string[] calendNames = { "Date", "Country", "Category", "Event", "Reference", "Source", "Actual", "Previous", "Forecast", "TEForecast",
            "URL", "Importance", "LastUpdate" };

        public static string[] forcNames = { "Country", "Category", "LatestValue", "LatestValueDate", "YearEnd", "YearEnd2", "YearEnd3",
            "q1", "q1_date", "q2", "q2_date", "q3", "q3_date", "q4", "q4_date" };

        public static string[] histNames = { "Country", "Category", "DateTime", "Value", "Frequency", "HistoricalDataSymbol", "LastUpdate" };

        public static string runFormula;
        public static bool origin = true;

        public static string AutoRun(string runFrmla)
        {
            string run;
            if (runFormula == "RunAutomatically = 1")
            {
                run = "RunAutomatically = 1";
            }
            else
            {
                run = runFrmla;
            }
            return run;
        }

        // List of the countries for AutoComplete
        public static List<string> autoCompleteList = cntry.ToList();
        public static List<string> autoCompleteList2 = cntry2.ToList();

        // Command to ignore upper/lower case distinction
        public static StringComparison comparison = StringComparison.InvariantCultureIgnoreCase;

        // Gives parsed json data from given URL
        public static JArray o;
        public static void parsed_json(string url)
        {
            helperClass.log.Info("Parsing JSon string");
            using (WebClient wc = new WebClient())
            {
                wc.Encoding = System.Text.Encoding.UTF8;
                var json = wc.DownloadString(url);
                o = JArray.Parse(json);
            }
        }

        public static string RangeAddress()
        {
            Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
            Microsoft.Office.Interop.Excel.Range rng = app.ActiveCell;
            return rng.get_AddressLocal(false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1);
        }

        public static Microsoft.Office.Interop.Excel.Range cellRange;

         public static Microsoft.Office.Interop.Excel.Range CellAddress( string cellPosition)
         {
            Microsoft.Office.Interop.Excel.Application app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
            Microsoft.Office.Interop.Excel.Worksheet sheet = app.ActiveSheet;
            string position = sheet.Name.ToString() + "!" + cellPosition;
            return sheet.Range[position];
        }

        //public static readonly string UserDefinedFunctions =  "true_val" ;
        public static string Determine_OfficeVersion()
        {

            string strEVersionSubKey = "\\Excel.Application\\CurVer"; //HKEY_CLASSES_ROOT/Excel.Application/Curver

            string strValue = null; //Value Present In Above Key
            string strVersion = null; //Determines Excel Version

            RegistryKey rkVersion = null; //Registry Key To Determine Excel Version

            rkVersion = Registry.ClassesRoot.OpenSubKey(strEVersionSubKey, false); //Open Registry Key

            if ((rkVersion != null)) //If Key Exists
            {
                strValue = (string)rkVersion.GetValue(string.Empty); //Get Value

                strValue = strValue.Substring(strValue.LastIndexOf(".") + 1); //Store Value

                switch (strValue) //Determine Version
                {
                    case "10":
                        strVersion = "2002";
                        break;

                    case "11":
                        strVersion = "2003";
                        break;

                    case "12":
                        strVersion = "2007";
                        break;

                    case "14":
                        strVersion = "2010";
                        break;

                    case "15":
                        strVersion = "2013";
                        break;

                    case "16":
                        strVersion = "2016";
                        break;

                    default:
                        strVersion = "New/Old version";
                        break;                      
                }                
            }
            return strVersion;
        }
}
}

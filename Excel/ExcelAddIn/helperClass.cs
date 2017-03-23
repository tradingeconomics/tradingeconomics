using ExcelDna.Integration;
using Microsoft.Office.Interop.Excel;
using Microsoft.Win32;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLog;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using static testClassLib.udfClass;

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

        public static string[] calendarIndicator = {
                                                "2 Year Note Yield",
                                                "3 Month Bill Yield",
                                                "3 Year Note Yield",
                                                "30 Year Bond Yield",
                                                "4 Week Bill Yield",
                                                "5 Year Note Yield",
                                                "52 Week Bill Yield",
                                                "6 Month Bill Yield",
                                                "7 Year Note Yield",
                                                "ADP Employment Change",
                                                "Average Hourly Earnings",
                                                "Average Weekly Hours",
                                                "Balance of Trade",
                                                "Banks Balance Sheet",
                                                "Building Permits",
                                                "Business Confidence",
                                                "Business Inventories",
                                                "Capacity Utilization",
                                                "Capital Flows",
                                                "Car Production",
                                                "Car Registrations",
                                                "Case Shiller Home Price Index",
                                                "Cash Reserve Ratio",
                                                "Cement Production",
                                                "Challenger Job Cuts",
                                                "Chicago Fed National Activity Index",
                                                "Chicago Pmi",
                                                "Claimant Count Change",
                                                "Coincident Index",
                                                "Composite Pmi",
                                                "Construction Orders",
                                                "Construction Output",
                                                "Construction Pmi",
                                                "Construction Spending",
                                                "Consumer Confidence",
                                                "Consumer Credit",
                                                "Consumer Spending",
                                                "Continuing Jobless Claims",
                                                "Copper Production",
                                                "Core Consumer Prices",
                                                "Core Inflation Rate",
                                                "Core Pce Price Index",
                                                "Corporate Profits",
                                                "Crude Oil Stocks Change",
                                                "Current Account",
                                                "Dallas Fed Manufacturing Index",
                                                "Deposit Interest Rate",
                                                "Durable Goods Orders",
                                                "Durable Goods Orders Ex Defense",
                                                "Durable Goods Orders Ex Transportation",
                                                "Economic Optimism Index",
                                                "Economy Watchers Survey",
                                                "Employment Change",
                                                "Employment Cost Index",
                                                "Existing Home Sales",
                                                "Export Prices",
                                                "Exports",
                                                "External Debt",
                                                "Factory Orders",
                                                "Factory Orders Ex Transportation",
                                                "Fixed Asset Investment",
                                                "Food Inflation",
                                                "Foreign Bond Investment",
                                                "Foreign Direct Investment",
                                                "Foreign Exchange Reserves",
                                                "Foreign Stock Investment",
                                                "Full Time Employment",
                                                "Gasoline Stocks Change",
                                                "GDP Annual Growth Rate",
                                                "GDP Deflator",
                                                "Gdp Growth Annualized",
                                                "GDP Growth Rate",
                                                "Government Bond 10Y",
                                                "Government Budget",
                                                "Government Budget Value",
                                                "Government Debt",
                                                "Government Payrolls",
                                                "Government Revenues",
                                                "Gross Fixed Capital Formation",
                                                "Harmonised Consumer Prices",
                                                "Holidays",
                                                "Household Spending",
                                                "Housing Index",
                                                "Housing Starts",
                                                "Import Prices",
                                                "Imports",
                                                "Industrial Production",
                                                "Industrial Production Mom",
                                                "Inflation Rate",
                                                "Inflation Rate Mom",
                                                "Initial Jobless Claims",
                                                "Interest Rate",
                                                "Ism New York Index",
                                                "Job Advertisements",
                                                "Job Offers",
                                                "Job Vacancies",
                                                "Labor Force Participation Rate",
                                                "Labor Market Conditions Index ",
                                                "Labour Costs",
                                                "Leading Composite Index",
                                                "Leading Economic Index",
                                                "Lending Rate",
                                                "Loan Growth",
                                                "Loans to Private Sector",
                                                "Machinery Orders",
                                                "Manufacturing Payrolls",
                                                "Manufacturing Pmi",
                                                "Manufacturing Production",
                                                "Mining Production",
                                                "Mni Consumer Sentiment",
                                                "Money Supply M1",
                                                "Money Supply M2",
                                                "Money Supply M3",
                                                "Mortgage Applications",
                                                "Mortgage Approvals",
                                                "Mortgage Rate",
                                                "Nahb Housing Market Index",
                                                "Natural Gas Stocks Change",
                                                "Net Long-term Tic Flows",
                                                "New Home Sales",
                                                "New Orders",
                                                "Nfib Business Optimism Index",
                                                "Non Farm Payrolls",
                                                "Non Manufacturing PMI",
                                                "Nonfarm Payrolls Private",
                                                "Ny Empire State Manufacturing Index",
                                                "Part Time Employment",
                                                "Pce Price Index",
                                                "Pending Home Sales",
                                                "Personal Income",
                                                "Personal Spending",
                                                "Philadelphia Fed Manufacturing Index",
                                                "Private Investment",
                                                "Private Sector Credit",
                                                "Producer Prices",
                                                "Producer Prices Change",
                                                "Productivity",
                                                "Redbook Index",
                                                "Retail Sales Ex Autos",
                                                "Retail Sales MoM",
                                                "Retail Sales YoY",
                                                "Richmond Fed Manufacturing Index",
                                                "Services PMI",
                                                "Small Business Sentiment",
                                                "Terms of Trade",
                                                "Total Vehicle Sales",
                                                "Tourism Revenues",
                                                "Tourist Arrivals",
                                                "Unemployed Persons",
                                                "Unemployment Change",
                                                "Unemployment Rate",
                                                "Wage Growth",
                                                "Wholesale Inventories",
                                                "Zew Economic Sentiment Index",

                                                };


        public static string[] bondsNames = { "Symbol", "Name", "Country", "Date", "Last", "Importance", "DailyChange",
            "DailyPercentChange", "WeeklyChange", "WeeklyPercentChange", "MonthlyChange", "MonthlyPercentChange", "YearlyChange",
            "YearlyPercentChange", "YTDChange", "YTDPercentChange", "yesterday", "lastWeek", "lastMonth", "lastYear", "startYear" };

        public static string[] bondsNamesFull = { "Symbol", "Name", "Country", "Date", "Last", "Importance", "DailyChange",
            "DailyPercentualChange", "WeeklyChange", "WeeklyPercentualChange", "MonthlyChange", "MonthlyPercentualChange", "YearlyChange",
            "YearlyPercentualChange", "YTDChange", "YTDPercentualChange", "yesterday", "lastWeek", "lastMonth", "lastYear", "startYear" };

        public static string[] marketsNames = new string[] { "Symbol", "Ticker", "Name", "Country", "Date", "Last", "Importance" ,
            "DailyChange", "DailyPercentChange", "WeeklyChange", "WeeklyPercentChange", "MonthlyChange", "MonthlyPercentChange",
            "YearlyChange", "YearlyPercentChange", "YTDChange", "YTDPercentChange", "yesterday", "lastWeek", "lastMonth", "lastYear", "startYear"};

        public static string[] marketsNamesFull = new string[] { "Symbol", "Ticker", "Name", "Country", "Date", "Last", "Importance" ,
            "DailyChange", "DailyPercentualChange", "WeeklyChange", "WeeklyPercentualChange", "MonthlyChange", "MonthlyPercentualChange",
            "YearlyChange", "YearlyPercentualChange", "YTDChange", "YTDPercentualChange", "yesterday", "lastWeek", "lastMonth", "lastYear", "startYear"};
        
        public static string[] indNames = { "Country", "Category", "Title", "LatestValue", "LatestValueDate", "Source", "Unit", "URL",
            "CategoryGroup", "Frequency", "HistoricalDataSymbol", "PreviousValue", "PreviousValueDate" };

        public static string[] calendNames = { "Date", "Country", "Category", "Event", "Reference", "Source", "Actual", "Previous", "Forecast", "TEForecast",
            "URL", "Importance", "LastUpdate" };

        public static string[] forcNames = { "Country", "Category", "LatestValue", "LatestValueDate", "YearEnd", "YearEnd2", "YearEnd3",
            "q1", "q1_date", "q2", "q2_date", "q3", "q3_date", "q4", "q4_date" };

        public static string[] histNames = { "Country", "Category", "DateTime", "Value", "Frequency", "HistoricalDataSymbol", "LastUpdate" };

        public static string[] tsNames = {  "DateTime", "Value"};

        public static bool fromHistorical = false;

        public static string formula = "";
        public static string runFormula;
        public static bool origin = true;
        public static List<string> fList = new List<string>();
        public static Range oldRange;
              

        public static void get_formulaList()
        {
            Range range;
            try
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
                range = MyRibbon.sheet.UsedRange.SpecialCells(XlCellType.xlCellTypeFormulas);
                oldRange = range;
            }
            catch (COMException)
            {
                MessageBox.Show("No TradingEconomics formula's were found to update.");
                return;
            }
            
            foreach (Range c in range.Cells)
            {
                if (c.HasFormula)
                {
                    if (!fList.Contains(c.Formula))
                    {
                        fList.Add(c.Formula);
                    } 
                }
            }
        }

        // List of the countries for AutoComplete
        public static List<string> autoCompleteList = cntry.ToList();
        public static List<string> autoCompleteList2 = cntry2.ToList();

        // Command to ignore upper/lower case distinction
        public static StringComparison comparison = StringComparison.InvariantCultureIgnoreCase;

        public static string RangeAddress()
        {
            try
            {
                MyRibbon.cellRange = MyRibbon.app.ActiveCell;
            }
            catch (Exception)
            {

                MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                MyRibbon.cellRange = MyRibbon.app.ActiveCell;
            }            
            return MyRibbon.cellRange.get_AddressLocal(false, false, Microsoft.Office.Interop.Excel.XlReferenceStyle.xlA1);
        }

        public static Microsoft.Office.Interop.Excel.Range CellAddress(string cellPosition)
        {
            MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            string position = MyRibbon.sheet.Name.ToString() + "!" + cellPosition;
            return MyRibbon.sheet.Range[position];
        }

        public static dynamic ReferenceToRange(ExcelReference xlref)
        {
            dynamic app = ExcelDnaUtil.Application;
            return app.Range[XlCall.Excel(XlCall.xlfReftext, xlref,
                true)];
        }

        public static Dictionary<string, formulaColumns> getNewDict(bool fromTS = false)
        {
            try
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            catch (Exception)
            {
                MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            
            Range range = MyRibbon.sheet.UsedRange.SpecialCells(XlCellType.xlCellTypeFormulas);
            Dictionary<string, formulaColumns> myNewDict = new Dictionary<string, formulaColumns>();
            foreach (Range c in range.Cells)
            {
                formulaColumns newFclmObj = new formulaColumns(c.Formula, null, null, c);
                string sheetKey = MyRibbon.sheet.Name + c.Address[false, false];
                myNewDict.Add(c.Address[false, false], newFclmObj);
            }
            foreach (var item in MyRibbon.myFormulasDict.Keys)
            {
                // Comparing two strings
                string normalized1;
                try
                {
                    normalized1 = Regex.Replace(myNewDict[item]._formula, @"[^\w\d]", "");
                }
                catch (System.Collections.Generic.KeyNotFoundException)
                {
                    normalized1 = "";
                }

                string normalized2 = Regex.Replace(MyRibbon.myFormulasDict[item]._formula, @"[^\w\d]", "");
                bool stringEquals = String.Equals(
                    normalized1,
                    normalized2,
                    StringComparison.OrdinalIgnoreCase);
                // End of comparison

                if (myNewDict.ContainsKey(item) && !stringEquals)
                {
                    Range dtStrt = MyRibbon.myFormulasDict[item]._cells;
                    Range hdrEnd;
                    MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                    if (fromTS)
                    {
                        hdrEnd = MyRibbon.myFormulasDict[item]._cells[1, MyRibbon.myFormulasDict[item]._cells.Columns.Count + 1];
                    }
                    else
                    {
                        hdrEnd = MyRibbon.myFormulasDict[item]._cells[1, MyRibbon.myFormulasDict[item]._cells.Columns.Count];
                    }
                    Range dtEnd = MyRibbon.myFormulasDict[item]._cells[MyRibbon.myFormulasDict[item]._cells.Rows.Count, MyRibbon.myFormulasDict[item]._cells.Columns.Count];
                    try
                    {
                        Range hdrRng = MyRibbon.sheet.Range[dtStrt[1, 2], hdrEnd];
                        Range dtRng = MyRibbon.sheet.Range[dtStrt[2, 1], dtEnd];
                        if (refError == true)
                        {
                             hdrRng = MyRibbon.sheet.Range[dtStrt, hdrEnd];
                             dtRng = MyRibbon.sheet.Range[dtStrt, dtEnd];
                        }
                        dtRng.Clear();
                        hdrRng.Clear();
                    }
                    catch (Exception)
                    {
                        MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                        MyRibbon.sheet = MyRibbon.app.ActiveSheet;
                        Range dtStrt_1 = dtStrt[1, 2];
                        string dtStart = dtStrt_1.Address[false,false];
                        string EndOfHeader = hdrEnd.Address[false, false];
                        Range hdrRng = MyRibbon.sheet.Range[dtStart, EndOfHeader];
                        Range dtStrt_2 = dtStrt[2, 1];
                        string dtStart_2 = dtStrt_2.Address[false, false];
                        string EndOfDate = dtEnd.Address[false, false];
                        Range dtRng = MyRibbon.sheet.Range[dtStart_2, EndOfDate];
                        dtRng.Clear();
                        hdrRng.Clear();
                    }                                       
                }
            }

            foreach (var item in MyRibbon.myFormulasDict.Keys)
            {
                if (!myNewDict.ContainsKey(item))
                {
                    Range dtStrt = MyRibbon.myFormulasDict[item]._cells;
                    Range hdrEnd;
                    if (fromTS)
                    {
                        hdrEnd = MyRibbon.myFormulasDict[item]._cells[1, MyRibbon.myFormulasDict[item]._cells.Columns.Count + 1];
                    }
                    else
                    {
                        hdrEnd = MyRibbon.myFormulasDict[item]._cells[1, MyRibbon.myFormulasDict[item]._cells.Columns.Count];
                    }
                    
                    Range dtEnd = MyRibbon.myFormulasDict[item]._cells[MyRibbon.myFormulasDict[item]._cells.Rows.Count, MyRibbon.myFormulasDict[item]._cells.Columns.Count];
                    Range hdrRng;
                    Range dtRng;
                    try
                    {
                        hdrRng = MyRibbon.sheet.Range[dtStrt[1, 2], hdrEnd];
                        dtRng = MyRibbon.sheet.Range[dtStrt[2, 1], dtEnd];
                        dtRng.Clear();
                        hdrRng.Clear();
                    }
                    catch (System.Runtime.InteropServices.COMException)
                    {

                        continue;
                    }  
                }
            }
            return myNewDict;
        }

        public static void elseFunction(string columns, JArray jsData, string key, Range dataStartCell, string newFormula, Range formulaCell)
        {
            helperClass.log.Info("Starting function data_to_excel");
            var retriever = new RetrieveAndWriteData(columns, jsData, key, dataStartCell, newFormula, formulaCell);
            var thready = new Thread(retriever.fetchData);
            thready.Priority = ThreadPriority.Normal;
            thready.IsBackground = true;
            thready.Start();
        }

        public static void RemoveOldKey(Dictionary<string, formulaColumns>  myNewDict)
        {
            Dictionary<string, formulaColumns> auxDict = new Dictionary<string, formulaColumns>(MyRibbon.myFormulasDict);
            foreach (var item in auxDict.Keys)
            {
                if (!myNewDict.ContainsKey(item))
                {
                    MyRibbon.myFormulasDict.Remove(item);
                }
            }
        }


        public static void setGlobalDict(string formulaCellAddress, formulaColumns frmlaColumnsPair)
        {          
            if (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString()))
            {
                if (MyRibbon.myFormulasDict.ContainsKey(formulaCellAddress))
                {
                    MyRibbon.myFormulasDict[formulaCellAddress] = frmlaColumnsPair;
                }
                else
                {
                    MyRibbon.myFormulasDict.Add(formulaCellAddress, frmlaColumnsPair);
                }
            }
            else
            {
                MyRibbon.myFormulasDict = new Dictionary<string, formulaColumns>();
                if (MyRibbon.myFormulasDict.ContainsKey(formulaCellAddress))
                {
                    MyRibbon.myFormulasDict[formulaCellAddress] = frmlaColumnsPair;
                }
                else
                {
                    MyRibbon.myFormulasDict.Add(formulaCellAddress, frmlaColumnsPair);
                }
            }
            
        }

        public static string getHistUrl(string cntry, string indctr, string startDate, string endDate,  string key)
        {
            if (startDate.Length != 0 & endDate.Length == 0)
            {
                url = host + "historical/country/" + cntry + "/indicator/" + indctr + "/" + startDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else if (startDate.Length != 0 & endDate.Length != 0)
            {
                url = host + "historical/country/" + cntry + "/indicator/" + indctr + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else
            {
                url = host + "historical/country/" + cntry + "/indicator/" + indctr + "/" + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            return url;
        }

        public static string getForcUrl(string cntry, string indctr, string key)
        {
            if (cntry.Length == 0)
            {
                url = host + "forecast/indicator/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else if (indctr.Length == 0)
            {
                url = host + "forecast/country/" + cntry + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else
            {
                url = host + "forecast/country/" + cntry + "/indicator/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            return url;
        }

        public static string getClndrUrl(string cntry, string indctr, string startDate, string endDate, string key)
        {
            if (cntry.Length == 0 & indctr.Length == 0)
            {
                url = host + "calendar/country/All/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else if (cntry.Length != 0 & indctr.Length == 0)
            {
                url = host + "calendar/country/" + cntry + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else if (cntry.Length == 0 & indctr.Length != 0)
            {
                url = host + "calendar/indicator/" + indctr + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else if (cntry.Length != 0 & indctr.Length != 0)
            {
                url = host + "calendar/country/" + cntry + "/indicator/" + indctr + "/" + startDate + "/" + endDate + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            return url;
        }

        public static string getIndctrUrl(string cntry, string indctr, string key)
        {
            if (cntry.Length == 0 & indctr.Length == 0)
            {
                url = host + "indicators?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else if (cntry.Length != 0 & indctr.Length == 0)
            {
                url = host + "country/" + cntry + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else
            {
                url = host + "country/" + cntry + "/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            return url;
        }

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

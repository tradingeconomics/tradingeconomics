using ExcelDna.Integration;
using Microsoft.Office.Interop.Excel;
using Microsoft.Win32;
using Newtonsoft.Json.Linq;
using NLog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Threading;
using System.Windows.Forms;
using static TE.udfClass;

namespace TE
{
    class helperClass
    {

        public static string host = "https://api.tradingeconomics.com/";

        public static Logger log = LogManager.GetCurrentClassLogger();

        public static Dictionary<string, string> myCountrysDict = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            {"Afghanistan" , "AFG"},
            {"Albania" , "ALB"},
            {"Algeria" , "DZA"},
            {"American Samoa" , "ASM"},
            {"Andorra" , "AND"},
            {"Angola" , "AGO"},
            {"Anguilla" , "AIA"},
            {"Antigua and Barbuda" , "ATG"},
            {"Argentina" , "ARG"},
            {"Armenia" , "ARM"},
            {"Aruba" , "ABW"},
            {"Australia" , "AUS"},
            {"Austria" , "AUT"},
            {"Azerbaijan" , "AZE"},
            {"Bahamas" , "BHS"},
            {"Bahrain" , "BHR"},
            {"Bangladesh" , "BGD"},
            {"Barbados" , "BRB"},
            {"Belarus" , "BLR"},
            {"Belgium" , "BEL"},
            {"Belize" , "BLZ"},
            {"Benin" , "BEN"},
            {"Bermuda" , "BMU"},
            {"Bhutan" , "BTN"},
            {"Bolivia" , "BOL"},
            {"Bosnia and Herzegovina" , "BIH"},
            {"Botswana" , "BWA"},
            {"Brazil" , "BRA"},
            {"Brunei" , "BRN"},
            {"Bulgaria" , "BGR"},
            {"Burkina Faso" , "BFA"},
            {"Burundi" , "BDI"},
            {"Cambodia" , "KHM"},
            {"Cameroon" , "CMR"},
            {"Canada" , "CAN"},
            {"Cape Verde" , "CPV"},
            {"Cayman Islands" , "CYM"},
            {"Central African Republic" , "CAF"},
            {"Chad" , "TCD"},
            {"Channel Islands" , "CHI"},
            {"Chile" , "CHL"},
            {"China" , "CHN"},
            {"Christmas Island" , "CXR"},
            {"Colombia" , "COL"},
            {"Commodity" , "CCC"},
            {"Comoros" , "COM"},
            {"Congo" , "COD"},
            {"Cook Islands" , "COK"},
            {"Costa Rica" , "CRI"},
            {"Croatia" , "HRV"},
            {"Cuba" , "CUB"},
            {"Cyprus" , "CYP"},
            {"Czech Republic" , "CZE"},
            {"Denmark" , "DNK"},
            {"Djibouti" , "DJI"},
            {"Dominica" , "DMA"},
            {"Dominican Republic" , "DOM"},
            {"East Asia and Pacific" , "EAP"},
            {"East Timor" , "TLS"},
            {"Ecuador" , "ECU"},
            {"Egypt" , "EGY"},
            {"El Salvador" , "SLV"},
            {"Equatorial Guinea" , "GNQ"},
            {"Eritrea" , "ERI"},
            {"Estonia" , "EST"},
            {"Ethiopia" , "ETH"},
            {"Euro area" , "EMU"},
            {"Europe and Central Asia" , "ECA"},
            {"European Union" , "EUN"},
            {"Falkland Islands" , "FLK"},
            {"Faroe Islands" , "FRO"},
            {"Fiji" , "FJI"},
            {"Finland" , "FIN"},
            {"France" , "FRA"},
            {"French Polynesia" , "PYF"},
            {"Gabon" , "GAB"},
            {"Gambia" , "GMB"},
            {"Georgia" , "GEO"},
            {"Germany" , "DEU"},
            {"Ghana" , "GHA"},
            {"Gibraltar" , "GIB"},
            {"Greece" , "GRC"},
            {"Greenland" , "GRL"},
            {"Grenada" , "GRD"},
            {"Guam" , "GUM"},
            {"Guatemala" , "GTM"},
            {"Guinea" , "GIN"},
            {"Guinea Bissau" , "GNB"},
            {"Guyana" , "GUY"},
            {"Haiti" , "HTI"},
            {"Heavily Indebted Poor Countries HIPC" , "HPC"},
            {"High income" , "HIC"},
            {"High income nonOECD" , "NOC"},
            {"High income OECD" , "OEC"},
            {"Honduras" , "HND"},
            {"Hong Kong" , "HKG"},
            {"Hungary" , "HUN"},
            {"Iceland" , "ISL"},
            {"India" , "IND"},
            {"Indonesia" , "IDN"},
            {"Iran" , "IRN"},
            {"Iraq" , "IRQ"},
            {"Ireland" , "IRL"},
            {"Isle of Man" , "IMY"},
            {"Israel" , "ISR"},
            {"Italy" , "ITA"},
            {"Ivory Coast" , "CIV"},
            {"Jamaica" , "JAM"},
            {"Japan" , "JPN"},
            {"Jordan" , "JOR"},
            {"Kazakhstan" , "KAZ"},
            {"Kenya" , "KEN"},
            {"Kiribati" , "KIR"},
            {"Kosovo" , "UNK"},
            {"Kuwait" , "KWT"},
            {"Kyrgyzstan" , "KGZ"},
            {"Laos" , "LAO"},
            {"Latin America and Caribbean" , "LAC"},
            {"Latvia" , "LVA"},
            {"Least developed Countries UN Classification" , "LDC"},
            {"Lebanon" , "LBN"},
            {"Lesotho" , "LSO"},
            {"Liberia" , "LBR"},
            {"Libya" , "LBY"},
            {"Liechtenstein" , "LIE"},
            {"Lithuania" , "LTU"},
            {"Low and Middle Income" , "LMY"},
            {"Low income" , "LIC"},
            {"Lower middle income" , "LMC"},
            {"Luxembourg" , "LUX"},
            {"Macau" , "MAC"},
            {"Macedonia" , "MKD"},
            {"Madagascar" , "MDG"},
            {"Malawi" , "MWI"},
            {"Malaysia" , "MYS"},
            {"Maldives" , "MDV"},
            {"Mali" , "MLI"},
            {"Malta" , "MLT"},
            {"Marshall Islands" , "MHL"},
            {"Mauritania" , "MRT"},
            {"Mauritius" , "MUS"},
            {"Mayotte" , "MYT"},
            {"Mexico" , "MEX"},
            {"Micronesia" , "FSM"},
            {"Middle East and North Africa" , "MNA"},
            {"Middle income" , "MIC"},
            {"Moldova" , "MDA"},
            {"Monaco" , "MCO"},
            {"Mongolia" , "MNG"},
            {"Montenegro" , "MNE"},
            {"Montserrat" , "MSR"},
            {"Morocco" , "MAR"},
            {"Mozambique" , "MOZ"},
            {"Myanmar" , "MMR"},
            {"Namibia" , "NAM"},
            {"Nepal" , "NPL"},
            {"Netherlands" , "NLD"},
            {"Netherlands Antilles" , "ANT"},
            {"New Caledonia" , "NCL"},
            {"New Zealand" , "NZL"},
            {"Nicaragua" , "NIC"},
            {"Niger" , "NER"},
            {"Nigeria" , "NGA"},
            {"Norfolk Island" , "NFK"},
            {"North Korea" , "PRK"},
            {"Northern Mariana Islands" , "MNP"},
            {"Norway" , "NOR"},
            {"Oman" , "OMN"},
            {"Other" , "OTH"},
            {"Pakistan" , "PAK"},
            {"Palau" , "PLW"},
            {"Palestine" , "PSE"},
            {"Panama" , "PAN"},
            {"Papua New Guinea" , "PNG"},
            {"Paraguay" , "PRY"},
            {"Peru" , "PER"},
            {"Philippines" , "PHL"},
            {"Pitcairn Islands" , "PCN"},
            {"Poland" , "POL"},
            {"Portugal" , "PRT"},
            {"Puerto Rico" , "PRI"},
            {"Qatar" , "QAT"},
            {"Republic of the Congo" , "COG"},
            {"Reunion" , "REU"},
            {"Romania" , "ROU"},
            {"Russia" , "RUS"},
            {"Rwanda" , "RWA"},
            {"Samoa" , "WSM"},
            {"San Marino" , "SMR"},
            {"Sao Tome and Principe" , "STP"},
            {"Saudi Arabia" , "SAU"},
            {"Senegal" , "SEN"},
            {"Serbia" , "SRB"},
            {"Seychelles" , "SYC"},
            {"Sierra Leone" , "SLE"},
            {"Singapore" , "SGP"},
            {"Slovakia" , "SVK"},
            {"Slovenia" , "SVN"},
            {"Solomon Islands" , "SLB"},
            {"Somalia" , "SOM"},
            {"South Africa" , "ZAF"},
            {"South Asia" , "SAS"},
            {"South Korea" , "KOR"},
            {"South Sudan" , "SSD"},
            {"Spain" , "ESP"},
            {"Sri Lanka" , "LKA"},
            {"St Helena" , "SHN"},
            {"St Kitts and Nevis" , "KNA"},
            {"St Lucia" , "LCA"},
            {"St Pierre and Miquelon" , "SPM"},
            {"St Vincent and the Grenadines" , "VCT"},
            {"Sub Saharan Africa" , "SSA"},
            {"Sudan" , "SDN"},
            {"Suriname" , "SUR"},
            {"Swaziland" , "SWZ"},
            {"Sweden" , "SWE"},
            {"Switzerland" , "CHE"},
            {"Syria" , "SYR"},
            {"Taiwan" , "TWN"},
            {"Tajikistan" , "TJK"},
            {"Tanzania" , "TZA"},
            {"Thailand" , "THA"},
            {"Togo" , "TGO"},
            {"Tokelau" , "TKL"},
            {"Tonga" , "TON"},
            {"Trinidad and Tobago" , "TTO"},
            {"Tunisia" , "TUN"},
            {"Turkey" , "TUR"},
            {"Turkmenistan" , "TKM"},
            {"Tuvalu" , "TUV"},
            {"Uganda" , "UGA"},
            {"Ukraine" , "UKR"},
            {"United Arab Emirates" , "ARE"},
            {"United Kingdom" , "GBR"},
            {"United States" , "USA"},
            {"Upper middle income" , "UMC"},
            {"Uruguay" , "URY"},
            {"Uzbekistan" , "UZB"},
            {"Vanuatu" , "VUT"},
            {"Venezuela" , "VEN"},
            {"Vietnam" , "VNM"},
            {"Virgin Islands" , "VIR"},
            {"Wallis and Futuna" , "WLF"},
            {"West Bank and Gaza" , "WBG"},
            {"World" , "WLD"},
            {"Yemen" , "YEM"},
            {"Zambia" , "ZMB"},
            {"Zimbabwe" , "ZWE"}
        };
        public static Dictionary<string, string> myLongCountrysDict = new Dictionary<string, string>
        {
            {"AFG","Afghanistan"},
            {"ALB","Albania"},
            {"DZA","Algeria"},
            {"ASM","American Samoa"},
            {"AND","Andorra"},
            {"AGO","Angola"},
            {"AIA","Anguilla"},
            {"ATG","Antigua and Barbuda"},
            {"ARG","Argentina"},
            {"ARM","Armenia"},
            {"ABW","Aruba"},
            {"AUS","Australia"},
            {"AUT","Austria"},
            {"AZE","Azerbaijan"},
            {"BHS","Bahamas"},
            {"BHR","Bahrain"},
            {"BGD","Bangladesh"},
            {"BRB","Barbados"},
            {"BLR","Belarus"},
            {"BEL","Belgium"},
            {"BLZ","Belize"},
            {"BEN","Benin"},
            {"BMU","Bermuda"},
            {"BTN","Bhutan"},
            {"BOL","Bolivia"},
            {"BIH","Bosnia and Herzegovina"},
            {"BWA","Botswana"},
            {"BRA","Brazil"},
            {"BRN","Brunei"},
            {"BGR","Bulgaria"},
            {"BFA","Burkina Faso"},
            {"BDI","Burundi"},
            {"KHM","Cambodia"},
            {"CMR","Cameroon"},
            {"CAN","Canada"},
            {"CPV","Cape Verde"},
            {"CYM","Cayman Islands"},
            {"CAF","Central African Republic"},
            {"TCD","Chad"},
            {"CHI","Channel Islands"},
            {"CHL","Chile"},
            {"CHN","China"},
            {"CXR","Christmas Island"},
            {"COL","Colombia"},
            {"CCC","Commodity"},
            {"COM","Comoros"},
            {"COD","Congo"},
            {"COK","Cook Islands"},
            {"CRI","Costa Rica"},
            {"HRV","Croatia"},
            {"CUB","Cuba"},
            {"CYP","Cyprus"},
            {"CZE","Czech Republic"},
            {"DNK","Denmark"},
            {"DJI","Djibouti"},
            {"DMA","Dominica"},
            {"DOM","Dominican Republic"},
            {"EAP","East Asia and Pacific"},
            {"TLS","East Timor"},
            {"ECU","Ecuador"},
            {"EGY","Egypt"},
            {"SLV","El Salvador"},
            {"GNQ","Equatorial Guinea"},
            {"ERI","Eritrea"},
            {"EST","Estonia"},
            {"ETH","Ethiopia"},
            {"EMU","Euro area"},
            {"ECA","Europe and Central Asia"},
            {"EUN","European Union"},
            {"FLK","Falkland Islands"},
            {"FRO","Faroe Islands"},
            {"FJI","Fiji"},
            {"FIN","Finland"},
            {"FRA","France"},
            {"PYF","French Polynesia"},
            {"GAB","Gabon"},
            {"GMB","Gambia"},
            {"GEO","Georgia"},
            {"DEU","Germany"},
            {"GHA","Ghana"},
            {"GIB","Gibraltar"},
            {"GRC","Greece"},
            {"GRL","Greenland"},
            {"GRD","Grenada"},
            {"GUM","Guam"},
            {"GTM","Guatemala"},
            {"GIN","Guinea"},
            {"GNB","Guinea Bissau"},
            {"GUY","Guyana"},
            {"HTI","Haiti"},
            {"HPC","Heavily Indebted Poor Countries HIPC"},
            {"HIC","High income"},
            {"NOC","High income nonOECD"},
            {"OEC","High income OECD"},
            {"HND","Honduras"},
            {"HKG","Hong Kong"},
            {"HUN","Hungary"},
            {"ISL","Iceland"},
            {"IND","India"},
            {"IDN","Indonesia"},
            {"IRN","Iran"},
            {"IRQ","Iraq"},
            {"IRL","Ireland"},
            {"IMY","Isle of Man"},
            {"ISR","Israel"},
            {"ITA","Italy"},
            {"CIV","Ivory Coast"},
            {"JAM","Jamaica"},
            {"JPN","Japan"},
            {"JOR","Jordan"},
            {"KAZ","Kazakhstan"},
            {"KEN","Kenya"},
            {"KIR","Kiribati"},
            {"UNK","Kosovo"},
            {"KWT","Kuwait"},
            {"KGZ","Kyrgyzstan"},
            {"LAO","Laos"},
            {"LAC","Latin America and Caribbean"},
            {"LVA","Latvia"},
            {"LDC","Least developed Countries UN Classification"},
            {"LBN","Lebanon"},
            {"LSO","Lesotho"},
            {"LBR","Liberia"},
            {"LBY","Libya"},
            {"LIE","Liechtenstein"},
            {"LTU","Lithuania"},
            {"LMY","Low and Middle Income"},
            {"LIC","Low income"},
            {"LMC","Lower middle income"},
            {"LUX","Luxembourg"},
            {"MAC","Macau"},
            {"MKD","Macedonia"},
            {"MDG","Madagascar"},
            {"MWI","Malawi"},
            {"MYS","Malaysia"},
            {"MDV","Maldives"},
            {"MLI","Mali"},
            {"MLT","Malta"},
            {"MHL","Marshall Islands"},
            {"MRT","Mauritania"},
            {"MUS","Mauritius"},
            {"MYT","Mayotte"},
            {"MEX","Mexico"},
            {"FSM","Micronesia"},
            {"MNA","Middle East and North Africa"},
            {"MIC","Middle income"},
            {"MDA","Moldova"},
            {"MCO","Monaco"},
            {"MNG","Mongolia"},
            {"MNE","Montenegro"},
            {"MSR","Montserrat"},
            {"MAR","Morocco"},
            {"MOZ","Mozambique"},
            {"MMR","Myanmar"},
            {"NAM","Namibia"},
            {"NPL","Nepal"},
            {"NLD","Netherlands"},
            {"ANT","Netherlands Antilles"},
            {"NCL","New Caledonia"},
            {"NZL","New Zealand"},
            {"NIC","Nicaragua"},
            {"NER","Niger"},
            {"NGA","Nigeria"},
            {"NFK","Norfolk Island"},
            {"PRK","North Korea"},
            {"MNP","Northern Mariana Islands"},
            {"NOR","Norway"},
            {"OMN","Oman"},
            {"OTH","Other"},
            {"PAK","Pakistan"},
            {"PLW","Palau"},
            {"PSE","Palestine"},
            {"PAN","Panama"},
            {"PNG","Papua New Guinea"},
            {"PRY","Paraguay"},
            {"PER","Peru"},
            {"PHL","Philippines"},
            {"PCN","Pitcairn Islands"},
            {"POL","Poland"},
            {"PRT","Portugal"},
            {"PRI","Puerto Rico"},
            {"QAT","Qatar"},
            {"COG","Republic of the Congo"},
            {"REU","Reunion"},
            {"ROU","Romania"},
            {"RUS","Russia"},
            {"RWA","Rwanda"},
            {"WSM","Samoa"},
            {"SMR","San Marino"},
            {"STP","Sao Tome and Principe"},
            {"SAU","Saudi Arabia"},
            {"SEN","Senegal"},
            {"SRB","Serbia"},
            {"SYC","Seychelles"},
            {"SLE","Sierra Leone"},
            {"SGP","Singapore"},
            {"SVK","Slovakia"},
            {"SVN","Slovenia"},
            {"SLB","Solomon Islands"},
            {"SOM","Somalia"},
            {"ZAF","South Africa"},
            {"SAS","South Asia"},
            {"KOR","South Korea"},
            {"SSD","South Sudan"},
            {"ESP","Spain"},
            {"LKA","Sri Lanka"},
            {"SHN","St Helena"},
            {"KNA","St Kitts and Nevis"},
            {"LCA","St Lucia"},
            {"SPM","St Pierre and Miquelon"},
            {"VCT","St Vincent and the Grenadines"},
            {"SSA","Sub Saharan Africa"},
            {"SDN","Sudan"},
            {"SUR","Suriname"},
            {"SWZ","Swaziland"},
            {"SWE","Sweden"},
            {"CHE","Switzerland"},
            {"SYR","Syria"},
            {"TWN","Taiwan"},
            {"TJK","Tajikistan"},
            {"TZA","Tanzania"},
            {"THA","Thailand"},
            {"TGO","Togo"},
            {"TKL","Tokelau"},
            {"TON","Tonga"},
            {"TTO","Trinidad and Tobago"},
            {"TUN","Tunisia"},
            {"TUR","Turkey"},
            {"TKM","Turkmenistan"},
            {"TUV","Tuvalu"},
            {"UGA","Uganda"},
            {"UKR","Ukraine"},
            {"ARE","United Arab Emirates"},
            {"GBR","United Kingdom"},
            {"USA","United States"},
            {"UMC","Upper middle income"},
            {"URY","Uruguay"},
            {"UZB","Uzbekistan"},
            {"VUT","Vanuatu"},
            {"VEN","Venezuela"},
            {"VNM","Vietnam"},
            {"VIR","Virgin Islands"},
            {"WLF","Wallis and Futuna"},
            {"WBG","West Bank and Gaza"},
            {"WLD","World"},
            {"YEM","Yemen"},
            {"ZMB","Zambia"},
            {"ZWE","Zimbabwe"}
        };

        public static string[] cntry = {"United States",
                            "Euro Area",
                            "Japan",
                            "United Kingdom",
                            "Germany",
                            "France",
                            "Australia",
                            "Canada",
                            "China",
                            "India",
                            "Brazil",
                            "Russia",
                            "Afghanistan",
                            "Albania",
                            "Algeria",
                            "Andorra",
                            "Angola",
                            "Antigua and Barbuda",
                            "Argentina",
                            "Armenia",
                            "Aruba",                            
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
                            "Brunei",
                            "Bulgaria",
                            "Burkina Faso",
                            "Burundi",
                            "Cabo Verde",
                            "Cambodia",
                            "Cameroon",                            
                            "Cape Verde",
                            "Cayman Islands",
                            "Central African Republic",
                            "Chad",
                            "Chile",                            
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
                            "European Union",
                            "Fiji",
                            "Finland",                            
                            "Gabon",
                            "Gambia",
                            "Georgia",                            
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
                            "Indonesia",
                            "Iran",
                            "Iraq",
                            "Ireland",
                            "Isle Of Man",
                            "Israel",
                            "Italy",
                            "Ivory Coast",
                            "Jamaica",                            
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
        public static bool fromCalendar = false;

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
            string position = MyRibbon.sheet.Name.ToString()  + "!" + cellPosition;
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
            helperClass.log.Info("Starting function elseFunction");
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

        public static string getHistUrl(string cntry, string indctr, string key, string startDate, string endDate)
        {
            List<string> fullCntryNm = new List<string>();
            string[] longCntryNames = cntry.Split(',');

            int i = 0;
            var query = from s in longCntryNames
                        let num = i++
                        group s by num / 3 into g
                        select g.ToArray();
            var results = query.ToArray();

            foreach (var item in longCntryNames)
            {
                if (myCountrysDict.ContainsValue(item))
                {
                    fullCntryNm.Add(myLongCountrysDict[item]);
                }
            }
            cntry = String.Join(",", fullCntryNm);

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
            List<string> fullCntryNm = new List<string>();
            string[] longCntryNames = cntry.Split(',');

            int i = 0;
            var query = from s in longCntryNames
                        let num = i++
                        group s by num / 3 into g
                        select g.ToArray();
            var results = query.ToArray();

            foreach (var item in longCntryNames)
            {
                if (myCountrysDict.ContainsValue(item))
                {
                    fullCntryNm.Add(myLongCountrysDict[item]);
                }
            }
            cntry = String.Join(",", fullCntryNm);

            if (cntry.Length == 0)
            {
                url = host + "forecast/indicator/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else if (indctr.Length == 0 || indctr == "All")
            {
                url = host + "forecast/country/" + cntry + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else
            {
                url = host + "forecast/country/" + cntry + "/indicator/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            return url;
        }

        public static string getClndrUrl(string cntry, string indctr, string key, string startDate, string endDate)
        {
            List<string> fullCntryNm = new List<string>();
            string[] longCntryNames = cntry.Split(',');

            int i = 0;
            var query = from s in longCntryNames
                        let num = i++
                        group s by num / 3 into g
                        select g.ToArray();
            var results = query.ToArray();

            foreach (var item in longCntryNames)
            {
                if (myCountrysDict.ContainsValue(item))
                {
                    fullCntryNm.Add(myLongCountrysDict[item]);
                }
            }
            cntry = String.Join(",", fullCntryNm);

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
            if (cntry != "All")
            {


                //Debug.WriteLine("Start ofgetIndctrUrl: " + cntry);
                List<string> fullCntryNm = new List<string>();
                string[] longCntryNames = cntry.Split(',');
                // This "query" slit string of countries in chunks
                int i = 0;
                var query = from s in longCntryNames
                            let num = i++
                            group s by num / 3 into g
                            select g.ToArray();
                var results = query.ToArray();

                //foreach (var item in results)
                //{
                //    Debug.WriteLine("---------------" );
                //    foreach (var item2 in item)
                //    {
                //        Debug.WriteLine("Chunks: " + item2);
                //    }
                //}

                foreach (var item in longCntryNames)
                {
                    if (myCountrysDict.ContainsValue(item))
                    {
                        //Debug.WriteLine("myLongCountrysDict[item]: " + myLongCountrysDict[item]);
                        fullCntryNm.Add(myLongCountrysDict[item]);
                    }
                }
                cntry = String.Join(",", fullCntryNm);
            }

            if (cntry.Length == 0 & indctr.Length == 0)
            {
                url = host + "indicators?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else if ((cntry.Length != 0 & indctr.Length == 0) || indctr == "All")
            {
                url = host + "country/" + cntry + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            else
            {
                url = host + "country/" + cntry + "/" + indctr + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
            }
            return url;
        }

        public static string getTsUrl(string cntry, string indctr, string key, string startDate, string endDate)
        {
            List<string> fullCntryNm = new List<string>();
            string[] longCntryNames = cntry.Split(',');

            int i = 0;
            var query = from s in longCntryNames
                        let num = i++
                        group s by num / 3 into g
                        select g.ToArray();
            var results = query.ToArray();

            foreach (var item in longCntryNames)
            {
                if (myCountrysDict.ContainsValue(item))
                {
                    fullCntryNm.Add(myLongCountrysDict[item]);
                }
            }
            cntry = String.Join(",", fullCntryNm);

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

        public static string[][] getStaff(string staffTocheck)
        {
            //*************************
            string[] KKK = staffTocheck.Split(',');
            // This "query" slit string of countries in chunks
            int i = 0;
            var query = from s in KKK
                        let num = i++
                        group s by num / 10 into g
                        select g.ToArray();
            var results = query.ToArray();

            //foreach (var item in results)
            //{
            //    Debug.WriteLine("---------------");
            //    foreach (var item2 in item)
            //    {
            //        Debug.WriteLine("Chunks: " + item2);
            //    }
            //}
            return results;
        }


        public static JArray SOmeName(string cntry, string indctr, string key, string caller, string iniDate = "", string clsDate = "")
        {
            JArray jsData = new JArray();
            string[][] cntrStaff = helperClass.getStaff(cntry);
            for (int j = 0; j < cntrStaff.Length; j++)
            {
                string chunk = "";
                for (int i = 0; i < cntrStaff[j].Length; i++)
                {
                    chunk += cntrStaff[j][i] + ",";
                }
                chunk = chunk.TrimEnd(',');
                //Debug.WriteLine("Cntry to URL: " + chunk);
                switch(caller)
                {
                    case "Ind":
                        url = helperClass.getIndctrUrl(chunk, indctr, key);
                        break;
                    case "Hist":
                        url = getHistUrl (chunk, indctr, key, iniDate, clsDate);
                        break;
                    case "Cal":
                        url = getClndrUrl(chunk, indctr, key, iniDate, clsDate);
                        break;
                    case "For":
                        url = getForcUrl(chunk, indctr, key);
                        break;
                }
                
                var jsnData = new requestData(url);
                foreach (var k in jsnData.getJSON())
                {
                    jsData.Add(k);
                }
            }
            return jsData;
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

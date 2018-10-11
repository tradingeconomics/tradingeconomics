using ExcelDna.Integration;
using Newtonsoft.Json.Linq;
using System;
using System.Windows.Forms;
using System.Threading;
using Microsoft.Office.Interop.Excel;
using System.Collections.Generic;
//using System.Diagnostics;

namespace TE
{
    public static class udfClass
    {
        public static Mutex DataWriteMutex = new Mutex();
        public static string url;
        public static string host = helperClass.host;
        private static Dictionary<string, string> fullNames;
        public static bool refError = false;
        private static string newFormula;
        private static Range dataStartCell;
        public static Range formulaCell;
        public static string answer;

        public static void udfClassHelper(string callCategory, string mrktCategory = "")
        {
            try
            {
                if (callCategory == "TEMarkets")
                {
                    fullNames = new Dictionary<string, string>();
                    if (mrktCategory == "bond")
                    {
                        for (int i = 0; i < helperClass.bondsNames.Length; i++)
                        {
                            fullNames.Add(helperClass.bondsNames[i], helperClass.bondsNamesFull[i]);
                        }
                    }
                    else
                    {
                        for (int i = 0; i < helperClass.marketsNames.Length; i++)
                        {
                            fullNames.Add(helperClass.marketsNames[i], helperClass.marketsNamesFull[i]);
                        }
                    }
                }
                else if (callCategory == "TEMrktsHist")
                {
                    fullNames = new Dictionary<string, string>();
                    for (int i = 0; i < helperClass.MarketPeersComponentsColumns.Length; i++)
                    {
                        fullNames.Add(helperClass.MarketPeersComponentsColumns[i], helperClass.MarketPeersComponentsFullColumns[i]);
                    }
                }
                /*
                if (PickTimeInterval.fromSearch)
                {
                    answer = PickTimeInterval.searchAnswer;
                    PickTimeInterval.fromSearch = false;
                }
                else
                {
                    answer = "Updated at " + DateTime.Now.TimeOfDay.ToString("hh\\:mm\\:ss");
                }*/

                try
                {
                    MyRibbon.sheet = MyRibbon.app.ActiveSheet;
                }
                catch (Exception)
                {
                    MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                    MyRibbon.sheet = MyRibbon.app.ActiveSheet;
                }

                ExcelReference caller = XlCall.Excel(XlCall.xlfCaller) as ExcelReference;
                formulaCell = helperClass.ReferenceToRange(caller); //Last cell used in userform
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        public static void customFunctionEnd(string processCategory)
        {
            helperClass.runFormula = "RunAutomatically = 0";
            helperClass.origin = true;
            //helperClass.log.Info("Printing current cell value and finishing " + processCategory +" process");
            //MyRibbon.refresh = false;
        }

        public static void customFunctionHelper(JArray jsData, string columnsToUse)
        {
            try
            {   
                Dictionary<string, formulaColumns> myNewDict = helperClass.getNewDict();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    try
                    {
                        helperClass.elseFunction(columnsToUse, jsData, dataStartCell, newFormula, formulaCell);
                    }
                    catch (Exception ex)
                    {
                        helperClass.log.Error(ex.Message);
                        helperClass.log.Trace(ex.StackTrace);
                       // throw;
                    }
                }
                helperClass.RemoveOldKey(myNewDict);
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        public static void customFunctionHelper_2(string columnsToUse)
        {
            try
            {
                MyRibbon.myNewDict = new Dictionary<string, formulaColumns>();

                try
                {
                    XlCall.Excel(XlCall.xlfVolatile, false);
                }
                catch (Exception e)
                {
                    helperClass.log.Error(e.Message);
                    helperClass.log.Trace(e.StackTrace);
                    throw;
                }
                //Attention!!! this part should be in sharedFunctions.getAnswer(indctr) ??????
                if (formulaCell.Address == dataStartCell.Address) answer = columnsToUse.Split(',')[0];
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }           
        }

        public static void customFunctionAutoRun(string cat, formulaColumns frmlaColumnsPair, JArray jsData, string columnsToUse)
        {
            try
            {
                if (MyRibbon.refresh != true)
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);

                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    try
                    {
                        helperClass.elseFunction(columnsToUse, jsData, dataStartCell, newFormula, formulaCell);
                    }
                    catch (Exception ex)
                    {
                        helperClass.log.Info(ex.Message);
                        helperClass.log.Trace(ex.StackTrace);
                        throw;
                    }
                }
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }             
        }

        public static void customFunctionNotAutoRun(string cat)
        {
            try
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;

                MyRibbon.myFormulasDict = (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString())) ?
                    MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()] : new Dictionary<string, formulaColumns>();
            }
            catch (Exception ex)
            {
                helperClass.log.Error(ex);
            }            
        }

        public static string columnNamesHack(string toHack)
        {
            List<string> columnsFull = new List<string>();
            foreach (var item in toHack.Split(','))
            {
                if (fullNames.ContainsKey(item)) columnsFull.Add(fullNames[item]);
            }
            return String.Join(",", columnsFull);
        }

        [ExcelFunction(Name = "TEMarkets", IsMacroType = true, IsThreadSafe = true)]
        public static string teGetMarkets(string mrkt, string columnsToUse, [ExcelArgument(AllowReference = true)] object firstCell)
        {
            helperClass.log.Info("Executing TEMarkets.");
            SearchEngine.fromSearch = false;
            udfClassHelper("TEMarkets", mrkt);

            if (firstCell is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TEMarkets( \"{mrkt}\", \"{columnsToUse}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)firstCell);
                    newFormula = string.Format($"=TEMarkets( \"{mrkt}\", \"{columnsToUse}\", {dataStartCell.Address[false, false]})");
                }
                catch (Exception)
                {
                    refError = true;
                    helperClass.getNewDict();
                    return "#REF!";
                    throw;
                }
            }
            Range pass = null;
            formulaColumns frmlaColumnsPair = new formulaColumns(newFormula, columnsToUse, pass, formulaCell);
            MyRibbon.myNewDict = new Dictionary<string, formulaColumns>();

            try
            {
                XlCall.Excel(XlCall.xlfVolatile, false);
            }
            catch (Exception e)
            {
                helperClass.log.Error(e.Message);
                helperClass.log.Trace(e.StackTrace);
                throw;
            }

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                if (MyRibbon.refresh != true)
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);

                url = host + "markets/" + mrkt + "?client=" + apiKeyFrm.apiKey + "&excel=" + apiKeyFrm.excelVersion;
                
                var jsData = new requestData(url).getJSON();
              
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    try
                    {
                        helperClass.elseFunction(columnNamesHack(columnsToUse), jsData, dataStartCell, newFormula, formulaCell);
                    }
                    catch (Exception ex)
                    {
                        helperClass.log.Info(ex.Message);
                        helperClass.log.Trace(ex.StackTrace);
                        throw;
                    }
                }
            }
            else
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
                MyRibbon.myFormulasDict = (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString())) ?
                    MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()] : new Dictionary<string, formulaColumns>();

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && item == MyRibbon.myFormulasDict[item]._caller.Address[false, false])
                    {
                        return formulaCell.Text;
                    }
                }
                Dictionary<string, formulaColumns> myNewDict = helperClass.getNewDict();

                url = host + "markets/" + mrkt + "?client=" + apiKeyFrm.apiKey + "&excel=" + apiKeyFrm.excelVersion;
                var jsData = new requestData(url).getJSON();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    try
                    {
                        helperClass.elseFunction(columnNamesHack(columnsToUse), jsData, dataStartCell, newFormula, formulaCell);
                    }
                    catch (Exception ex)
                    {
                        helperClass.log.Info(ex.Message);
                        helperClass.log.Trace(ex.StackTrace);
                        throw;
                    }
                }
                helperClass.RemoveOldKey(myNewDict);
            }
            customFunctionEnd("Markets");
            return (formulaCell.Address == dataStartCell.Address)? columnsToUse.Split(',')[0] : sharedFunctions.getAnswer(mrkt);
        }

        [ExcelFunction(Name = "TEIndicators", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetIndicators(string cntry, string indctr, string columnsToUse, [ExcelArgument(AllowReference = true)] object firstCell)
        {
            helperClass.log.Info("Executing TEIndicators.");
            SearchEngine.fromSearch = false;
            udfClassHelper("TEIndicators");

            if (firstCell is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TEIndicators( \"{cntry}\", \"{indctr}\", \"{columnsToUse}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)firstCell);
                    newFormula = string.Format($"=TEIndicators( \"{cntry}\", \"{indctr}\", \"{columnsToUse}\", {dataStartCell.Address[false, false]})");
                }
                catch (Exception)
                {
                    refError = true;
                    helperClass.getNewDict();
                    return "#REF!";
                    throw;
                }
            }

            customFunctionHelper_2(columnsToUse);

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                customFunctionAutoRun("TEIndicators",
                    new formulaColumns(newFormula, columnsToUse, null, formulaCell), 
                    helperClass.SOmeName(cntry, indctr, "Ind"), 
                    columnsToUse);
            }
            else
            {
                customFunctionNotAutoRun("TEIndicators");

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && MyRibbon.myFormulasDict[item]._caller.Address[false, false] == item)
                    {
                        return formulaCell.Text;
                    }
                }
                customFunctionHelper(helperClass.SOmeName(cntry, indctr, "Ind"), columnsToUse);
            }
            customFunctionEnd("Indicators");
            return (formulaCell.Address == dataStartCell.Address) ? columnsToUse.Split(',')[0] : sharedFunctions.getAnswer(indctr);
        }

        [ExcelFunction(Name = "TECalendar", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetCalendar(string cntry, string indctr, string startDate, string endDate, string columnsToUse, 
            [ExcelArgument(AllowReference = true)] object firstCell)
        {
            helperClass.log.Info("Executing TECalendar.");
            SearchEngine.fromSearch = false;
            udfClassHelper("TECalendar");

            if (firstCell is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TECalendar( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", \"{columnsToUse}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)firstCell);
                    newFormula = string.Format(
                        $"=TECalendar( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", \"{columnsToUse}\", {dataStartCell.Address[false, false]})");
                }
                catch (Exception)
                {
                    refError = true;
                    helperClass.getNewDict();
                    return "#REF!";
                    throw;
                }
            }
            customFunctionHelper_2(columnsToUse);

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                customFunctionAutoRun("TECalendar",
                    new formulaColumns(newFormula, columnsToUse, null, formulaCell),
                    helperClass.SOmeName(cntry, indctr, "Cal", startDate, endDate),
                    columnsToUse);
            }
            else
            {
                customFunctionNotAutoRun("TECalendar");

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula &&  MyRibbon.myFormulasDict[item]._caller.Address[false, false] == item)
                    {
                        return formulaCell.Text;
                    }
                }
                customFunctionHelper(helperClass.SOmeName(cntry, indctr, "Cal", startDate, endDate), columnsToUse);
            }
            customFunctionEnd("Calendar");
            return (formulaCell.Address == dataStartCell.Address) ? columnsToUse.Split(',')[0] : sharedFunctions.getAnswer(indctr);
        }

        [ExcelFunction(Name = "TEForecasts", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetForecasts(string cntry, string indctr, string columnsToUse, [ExcelArgument(AllowReference = true)] object firstCell)
        {
            helperClass.log.Info("Executing TEForecasts.");
            SearchEngine.fromSearch = false;
            udfClassHelper("TEForecasts");

            if (firstCell is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TEForecasts( \"{cntry}\", \"{indctr}\", \"{columnsToUse}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)firstCell);
                    newFormula = string.Format($"=TEForecasts( \"{cntry}\", \"{indctr}\", \"{columnsToUse}\", {dataStartCell.Address[false, false]})");
                }
                catch (Exception)
                {
                    refError = true;
                    helperClass.getNewDict();
                    return "#REF!";
                    throw;
                }
            }
            customFunctionHelper_2(columnsToUse);

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                customFunctionAutoRun("TEForecasts",
                    new formulaColumns(newFormula, columnsToUse, null, formulaCell),
                    helperClass.SOmeName(cntry, indctr, "For"),
                    columnsToUse);
            }
            else
            {
                customFunctionNotAutoRun("TEForecasts");

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && item == MyRibbon.myFormulasDict[item]._caller.Address[false, false])
                    {
                        return formulaCell.Text;
                    }
                }
                customFunctionHelper(helperClass.SOmeName(cntry, indctr, "For"), columnsToUse);
            }
            customFunctionEnd("Forecasting");
            return (formulaCell.Address == dataStartCell.Address) ? columnsToUse.Split(',')[0] : sharedFunctions.getAnswer(indctr);
        }

        [ExcelFunction(Name = "TEHistorical", IsMacroType = true)]
        public static string teGetHistorical(string cntry, string indctr, string startDate, string endDate, string columnsToUse, 
            [ExcelArgument(AllowReference = true)] object myArgument)
        {

            helperClass.log.Info("Executing TEHistorical.");
            try
            { 

                SearchEngine.fromSearch = false;
                udfClassHelper("TEHistorical");

                if (myArgument is ExcelMissing)
                {
                    dataStartCell = formulaCell;
                    newFormula = string.Format($"=TEHistorical( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", \"{columnsToUse}\")");
                }
                else
                {
                    try
                    {
                        dataStartCell = helperClass.ReferenceToRange((ExcelReference)myArgument);
                        newFormula = string.Format(
                            $"=TEHistorical( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", \"{columnsToUse}\", {dataStartCell.Address[false, false]})");
                    }
                    catch (Exception e)
                    {
                        helperClass.log.Error(e);
                        refError = true;
                        helperClass.getNewDict();
                        return "#REF!";
                        throw;
                    }
                }

                customFunctionHelper_2(columnsToUse);

                if (helperClass.runFormula == "RunAutomatically = 1")
                {
                    customFunctionAutoRun("TEHistorical",
                        new formulaColumns(newFormula, columnsToUse, null, formulaCell),
                        helperClass.SOmeName(cntry, indctr, "Hist", startDate, endDate),
                        columnsToUse);
                }
                else
                {
                    customFunctionNotAutoRun("TEHistorical");

                    foreach (var item in MyRibbon.myFormulasDict.Keys)
                    {
                        if (MyRibbon.myFormulasDict[item]._formula == newFormula && formulaCell.Address[false, false] == item)
                        {
                            return formulaCell.Text;
                        }
                    }
                    customFunctionHelper(helperClass.SOmeName(cntry, indctr, "Hist", startDate, endDate), columnsToUse);
                }
                customFunctionEnd("Historical");

            }
            catch (Exception e)
            {
                helperClass.log.Error(e);
            }

            return (formulaCell.Address == dataStartCell.Address) ? columnsToUse.Split(',')[0] : sharedFunctions.getAnswer(indctr);
        }


        [ExcelFunction(Name = "TESeries", IsMacroType = true)]
        public static string teGetTS(string cntry, string indctr, string startDate, string endDate, [ExcelArgument(AllowReference = true)] object myArgument)
        {
            helperClass.log.Info("Executing TESeries.");
            SearchEngine.fromSearch = false;
            bool fromTS = true;
            udfClassHelper("TESeries");

            if (myArgument is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TESeries( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\")");
                //Debug.WriteLine(newFormula);
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)myArgument);
                    newFormula = string.Format(
                        $"=TESeries( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", {dataStartCell.Address[false, false]})");
                    //Debug.WriteLine(newFormula);
                }
                catch (Exception)
                {
                    refError = true;
                    helperClass.getNewDict(fromTS);
                    return "#REF!";
                    throw;
                }
            }
            formulaColumns frmlaColumnsPair = new formulaColumns(newFormula, cntry, null, formulaCell);
            MyRibbon.myNewDict = new Dictionary<string, formulaColumns>();

            try
            {
                XlCall.Excel(XlCall.xlfVolatile, false);
            }
            catch (Exception e)
            {
                helperClass.log.Error(e.Message);
                helperClass.log.Trace(e.StackTrace);
                throw;
            }

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                if (MyRibbon.refresh != true)
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);

                try
                {
                    var dict = new getDictionary(cntry, indctr, startDate, endDate);
                    Dictionary<DateTime, Dictionary<string, string>> dicts = dict.getDic();
                    //helperClass.log.Info("Starting function data_to_excel");

                    var retriever = new RetrieveAndWriteTSData(dict.getColumns().ToArray(), dicts, dataStartCell, newFormula, formulaCell);                    
                    var thready = new Thread(retriever.fetchData);
                    thready.Priority = ThreadPriority.Normal;
                    thready.IsBackground = true;
                    thready.Start();
                }
                catch (Exception ex)
                {
                    helperClass.log.Info(ex.Message);
                    helperClass.log.Trace(ex.StackTrace);
                    throw;
                }
            }
            else
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;

                MyRibbon.myFormulasDict = (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString())) ?
                    MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()] : new Dictionary<string, formulaColumns>();

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && item == MyRibbon.myFormulasDict[item]._caller.Address[false, false])
                    {
                        return formulaCell.Text;
                    }
                }

                Dictionary<string, formulaColumns> myNewDict = helperClass.getNewDict(fromTS);

                try
                {
                    var dict = new getDictionary(cntry, indctr, startDate, endDate);
                    Dictionary<DateTime, Dictionary<string, string>> dicts = dict.getDic();
                    var columns = dict.getColumns();
                    string[] clms = columns.ToArray();
                    //helperClass.log.Info("Starting function data_to_excel");                    
                    var retriever = new RetrieveAndWriteTSData(clms, dicts, dataStartCell, newFormula, formulaCell);
                    var thready = new Thread(retriever.fetchData);
                    thready.Priority = ThreadPriority.Normal;
                    thready.IsBackground = true;
                    thready.Start();
                    helperClass.RemoveOldKey(myNewDict);
                }
                catch (Exception ex)
                {
                    helperClass.log.Info(ex.Message);
                    helperClass.log.Trace(ex.StackTrace);
                    throw;
                }
            }
            customFunctionEnd("TS");
            return (formulaCell.Address == dataStartCell.Address) ? "DateTime" : sharedFunctions.getAnswer(indctr);
        }

        [ExcelFunction(Name = "TEMrktsHist", IsMacroType = true)]
        public static string teGetMktsHist(string mktType, string indctr, string columnsToUse, string iniDate, string clsDate, [ExcelArgument(AllowReference = true)] object myArgument)
        {
            helperClass.log.Info("Executing TEMrkstsHist with parameters: " + mktType + " " + indctr + " " + columnsToUse + " " + iniDate + " " + clsDate);
            SearchEngine.fromSearch = true;
            udfClassHelper("TEMrktsHist");

            if (myArgument is ExcelMissing)
            {
                newFormula = string.Format($"=TEMrktsHist(\"{mktType}\", \"{indctr}\", \"{columnsToUse}\")");
            }
            else
            {
                try
                {
                   // dataStartCell = helperClass.ReferenceToRange((ExcelReference)myArgument);
					dataStartCell = formulaCell;
					newFormula = string.Format(
                        $"=TEMrktsHist(\"{mktType}\", \"{indctr}\", \"{columnsToUse}\",  \"{iniDate}\", \"{clsDate}\",{dataStartCell.Address[false, false]})");
                }
                catch (Exception)
                {
                    refError = true;
                    helperClass.getNewDict();
                    return "#REF!";
                    throw;
                }
            }

            customFunctionHelper_2(columnsToUse);

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                customFunctionAutoRun("TEMrktsHist",
                    new formulaColumns(newFormula, columnsToUse, null, formulaCell),
                    helperClass.SOmeName("", indctr, "MrktHist", iniDate, clsDate, mktType),
                    columnsToUse);
            }
            else
            {
                //helperClass.log.Info("RunAutomatically != 1");
                customFunctionNotAutoRun("TEMrktsHist");

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && formulaCell.Address[false, false] == item)
                    {                                                
                        return formulaCell.Text;
                    }
                }
                customFunctionHelper(helperClass.SOmeName("", indctr, "MrktHist", iniDate, clsDate, mktType), columnsToUse);                
            }
            customFunctionEnd("TEMrktsHist");
            return (formulaCell.Address == dataStartCell.Address) ? columnsToUse.Split(',')[0] : sharedFunctions.getAnswer(indctr);
        }

        [ExcelFunction(Name = "SearchEconomy", IsMacroType = true)]
        public static string teSearchEconomy(string cntry, string indctr, string columnsToUse, [ExcelArgument(AllowReference = true)] object myArgument)
        {
            helperClass.log.Info("Executing Search Economy.");
            SearchEngine.fromSearch = true;
            udfClassHelper("SearchEconomy");

            if (myArgument is ExcelMissing)
            {
                newFormula = string.Format($"=SearchEconomy(\"{cntry}\", \"{indctr}\", \"{columnsToUse}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)myArgument);
                    newFormula = string.Format(
                        $"=SearchEconomy(\"{cntry}\", \"{indctr}\", \"{columnsToUse}\", {dataStartCell.Address[false, false]})");
                }
                catch (Exception)
                {
                    refError = true;
                    helperClass.getNewDict();
                    return "#REF!";
                    throw;
                }
            }

            customFunctionHelper_2(columnsToUse);

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                customFunctionAutoRun("SearchEconomy",
                    new formulaColumns(newFormula, columnsToUse, null, formulaCell),
                    helperClass.SOmeName(cntry, indctr, "SearchEconomy"),
                    columnsToUse);
            }
            else
            {
                customFunctionNotAutoRun("SearchEconomy");

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && formulaCell.Address[false, false] == item)
                    {
                        //helperClass.log.Info("This Answer");
                        return formulaCell.Text;
                    }
                }
                customFunctionHelper(helperClass.SOmeName(cntry, indctr, "SearchEconomy"), columnsToUse);
            }
            customFunctionEnd("SearchEconomy");
            return (formulaCell.Address == dataStartCell.Address) ? columnsToUse.Split(',')[0] : sharedFunctions.getAnswer(indctr);
        }


        internal class RetrieveAndWriteData
        {
            private string names;
            private Range dataStartCell;
            private Range formulaCell;
            private JArray data;
            private string newFormula;
            public RetrieveAndWriteData(string names, JArray data, Range dataStartCell, string nFrmla, Range formulaCell)
            {
                this.names = names;
                this.data = data;
                this.dataStartCell = dataStartCell;
                this.newFormula = nFrmla;
                this.formulaCell = formulaCell;
            }

            public void fetchData()
            {
                helperClass.log.Info("running fetchData() from  RetrieveAndWriteData");
                string nextCursorId = null;

                try
                {
                    do
                    {
						//Update class variables
                        newPrintData testprint = new newPrintData(names, data, dataStartCell, newFormula, formulaCell);
						//Populate cells with data
                        testprint.PopulateData();
                    } while (!string.IsNullOrWhiteSpace(nextCursorId));
                }
                catch (ThreadAbortException)
                {
                    return; // Safe to ignore aborting threads. Assume user forcibly stopped the UDF.
                }
            }

            private bool WorksheetStillExists()
            {
                return !(dataStartCell == null || dataStartCell.Worksheet == null);
            }
        }

        internal class RetrieveAndWriteTSData
        {
            private string[] names;
            private Range dataStartCell;
            private Dictionary<DateTime, Dictionary<string, string>> dict;
            private string newFormula;
            private Range formulaCell;

            public RetrieveAndWriteTSData(string[] names, Dictionary<DateTime, Dictionary<string, string>> dict, 
                Range dataStartCell, string nFrmla, Range formulaCell)
            {
                this.names = names;
                this.dict = dict;
                this.dataStartCell = dataStartCell;
                this.newFormula = nFrmla;
                this.formulaCell = formulaCell;
            }

            public void fetchData()
            {
                //helperClass.log.Info("running fetchData() from RetrieveAndWriteTSData");
                string nextCursorId = null;

                try
                {
                    do
                    {
                        printTSData testprint = new printTSData(names, dict, dataStartCell, newFormula, formulaCell);                           
                        testprint.PopulateData();
                    } while (!string.IsNullOrWhiteSpace(nextCursorId));
                }
                catch (ThreadAbortException)
                {
                    return; // Safe to ignore aborting threads. Assume user forcibly stopped the UDF.
                }
            }

            private bool WorksheetStillExists()
            {
                return !(dataStartCell == null || dataStartCell.Worksheet == null);
            }
        }
    }
}

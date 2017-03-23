using ExcelDna.Integration;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Windows.Forms;
using System.Threading;
using static System.Math;
using static ExcelDna.Integration.XlCall;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Excel;
using System.Collections.Generic;
using System.Collections;
using System.Diagnostics;
using System.Globalization;
using System.Text.RegularExpressions;

namespace testClassLib
{

    public static class udfClass
    {
        public static Mutex DataWriteMutex = new Mutex();

        public static string url;
        public static string host = helperClass.host;
        private static Dictionary<string, string> fullNames;

        [ExcelFunction(Name = "TEMarkets", IsMacroType = true, IsThreadSafe = true)]
        public static string teGetMarkets(string mrkt, string columnsToUse, [ExcelArgument(AllowReference = true)] object firstCell)
        {
            // Convert column names to JArray names
            fullNames = new Dictionary<string, string>();
            if (mrkt == "bonds")
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

            string answer = "Updated at " + DateTime.Now.TimeOfDay.ToString("hh\\:mm\\:ss");
            string columns = columnsToUse;
            try
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            catch (Exception)
            {
                MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            //Worksheet sheet = app.ActiveSheet;
            ExcelReference caller = XlCall.Excel(XlCall.xlfCaller) as ExcelReference;
            Range caller_range = helperClass.ReferenceToRange(caller);
            Range formulaCell = caller_range; //Last cell used in userform
            Range dataStartCell;

            string newFormula;
            if (firstCell is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TEMarkets( \"{mrkt}\", \"{columns}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)firstCell);
                    newFormula = string.Format($"=TEMarkets( \"{mrkt}\", \"{columns}\", {dataStartCell.Address[false, false]})");
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

            formulaColumns frmlaColumnsPair = new formulaColumns(newFormula, columns, pass, formulaCell);
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

            if (formulaCell.Address == dataStartCell.Address)
            {
                answer = columns.Split(',')[0];
            }

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                helperClass.log.Info("udfClass_Markets code is starting");

                if (MyRibbon.refresh != true)
                {
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);
                }
                string key = Properties.Settings.Default["userApiKey"].ToString();
                url = host + "markets/" + mrkt + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();

                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    List<string> columnsFull = new List<string>();

                    foreach (var item in columns.Split(','))
                    {                    
                        if (fullNames.ContainsKey(item))
                        {
                            columnsFull.Add(fullNames[item]);
                        }
                    }
                    columns = String.Join(",", columnsFull);     
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }

                try
                {
                    helperClass.log.Info("Markets finish");
                    helperClass.runFormula = "RunAutomatically = 0";
                    helperClass.origin = true;
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
                if (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString()))
                {
                    MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                }
                else
                {
                    MyRibbon.myFormulasDict = new Dictionary<string, formulaColumns>();                    
                }
                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && item == MyRibbon.myFormulasDict[item]._caller.Address[false, false])
                    {                        
                        return answer;
                    }
                }
                Dictionary<string, formulaColumns> myNewDict = helperClass.getNewDict();
                string key = Properties.Settings.Default["userApiKey"].ToString();
                url = host + "markets/" + mrkt + "?client=" + key + "&excel=" + helperClass.Determine_OfficeVersion();

                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    List<string> columnsFull = new List<string>();

                    foreach (var item in columns.Split(','))
                    {
                        if (fullNames.ContainsKey(item))
                        {
                            columnsFull.Add(fullNames[item]);
                        }
                    }
                    columns = String.Join(",", columnsFull);
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }
                try
                {
                    helperClass.log.Info("Markets finish");
                    helperClass.runFormula = "RunAutomatically = 0";
                    helperClass.origin = true;
                }
                catch (Exception ex)
                {
                    helperClass.log.Info(ex.Message);
                    helperClass.log.Trace(ex.StackTrace);
                    throw;
                }
                helperClass.RemoveOldKey(myNewDict);
            }

            helperClass.log.Info("Printing current cell value and finishing process");
            MyRibbon.refresh = false;
            return answer;
        }




        [ExcelFunction(Name = "TEIndicators", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetIndicators(string cntry, string indctr, string columnsToUse, [ExcelArgument(AllowReference = true)] object firstCell)
        {
            string answer = "Updated at " + DateTime.Now.TimeOfDay.ToString("hh\\:mm\\:ss");
            string columns = columnsToUse;
            try
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            catch (Exception)
            {
                MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            //Worksheet sheet = app.ActiveSheet;
            ExcelReference caller = XlCall.Excel(XlCall.xlfCaller) as ExcelReference;
            Range caller_range = helperClass.ReferenceToRange(caller);
            Range formulaCell = caller_range; //Last cell used in userform
            Range dataStartCell;

            string newFormula;
            if (firstCell is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TEIndicators( \"{cntry}\", \"{indctr}\", \"{columns}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)firstCell);
                    newFormula = string.Format($"=TEIndicators( \"{cntry}\", \"{indctr}\", \"{columns}\", {dataStartCell.Address[false, false]})");
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
            formulaColumns frmlaColumnsPair = new formulaColumns(newFormula, columns, pass, formulaCell);
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

            if (formulaCell.Address == dataStartCell.Address)
            {
                answer = columns.Split(',')[0];
            }

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                helperClass.log.Info("udfClass_Indicators code is starting");

                if (MyRibbon.refresh != true)
                {
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);
                }
                string key = Properties.Settings.Default["userApiKey"].ToString();

                url = helperClass.getIndctrUrl(cntry, indctr, key);
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();

                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }
                try
                {
                    helperClass.log.Info("Indicators finish");
                    helperClass.runFormula = "RunAutomatically = 0";
                    helperClass.origin = true;
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
                //MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                if (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString()))
                {
                    MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                }
                else
                {
                    MyRibbon.myFormulasDict = new Dictionary<string, formulaColumns>();
                }

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && item == MyRibbon.myFormulasDict[item]._caller.Address[false, false])
                    {
                        return answer;
                    }
                }

                Dictionary<string, formulaColumns> myNewDict = helperClass.getNewDict();

                string key = Properties.Settings.Default["userApiKey"].ToString();
                url = helperClass.getIndctrUrl(cntry, indctr, key);
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }

                try
                {
                    helperClass.log.Info("Indicators finish");
                    helperClass.origin = true;
                }
                catch (Exception ex)
                {
                    helperClass.log.Info(ex.Message);
                    helperClass.log.Trace(ex.StackTrace);
                    throw;
                }

                helperClass.RemoveOldKey(myNewDict);
            }

            helperClass.log.Info("Printing current cell value and finishing process");
            return answer;
        }


        [ExcelFunction(Name = "TECalendar", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetCalendar(string cntry, string indctr, string startDate, string endDate, string columnsToUse, [ExcelArgument(AllowReference = true)] object firstCell)
        {
            string answer = "Updated at " + DateTime.Now.TimeOfDay.ToString("hh\\:mm\\:ss");
            string columns = columnsToUse;
            try
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            catch (Exception)
            {
                MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            //Worksheet sheet = helperClass.app.ActiveSheet;
            ExcelReference caller = XlCall.Excel(XlCall.xlfCaller) as ExcelReference;
            Range caller_range = helperClass.ReferenceToRange(caller);
            Range formulaCell = caller_range; //Last cell used in userform
            Range dataStartCell;

            string newFormula;
            if (firstCell is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TECalendar( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", \"{columns}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)firstCell);
                    newFormula = string.Format($"=TECalendar( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", \"{columns}\", {dataStartCell.Address[false, false]})");
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
            formulaColumns frmlaColumnsPair = new formulaColumns(newFormula, columns, pass, formulaCell);
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

            if (formulaCell.Address == dataStartCell.Address)
            {
                answer = columns.Split(',')[0];
            }

            if (helperClass.runFormula == "RunAutomatically = 1" )
            {
                helperClass.log.Info("udfClass_Calendar code is starting");

                if (MyRibbon.refresh != true)
                {
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);
                }
                string key = Properties.Settings.Default["userApiKey"].ToString();

                url = helperClass.getClndrUrl(cntry, indctr, startDate, endDate, key);
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }
                helperClass.runFormula = "RunAutomatically = 0";
                helperClass.origin = true;
            }
            else
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
                //MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                if (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString()))
                {
                    MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                }
                else
                {
                    MyRibbon.myFormulasDict = new Dictionary<string, formulaColumns>();
                }

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && item == MyRibbon.myFormulasDict[item]._caller.Address[false, false])
                    {
                        return answer;
                    }
                }

                Dictionary<string, formulaColumns> myNewDict = helperClass.getNewDict();

                string key = Properties.Settings.Default["userApiKey"].ToString();
                url = helperClass.getClndrUrl(cntry, indctr, startDate, endDate, key);
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }

                try
                {
                    helperClass.log.Info("Calendar finish");
                    helperClass.origin = true;
                }
                catch (Exception ex)
                {
                    helperClass.log.Info(ex.Message);
                    helperClass.log.Trace(ex.StackTrace);
                    throw;
                }

                helperClass.RemoveOldKey(myNewDict);
            }
            helperClass.log.Info("Printing current cell value and finishing process");           
            return answer;
        }

        [ExcelFunction(Name = "TEForecasts", IsMacroType = true, IsThreadSafe = false)]
        public static string teGetForecasts(string cntry , string indctr , string columnsToUse, [ExcelArgument(AllowReference = true)] object firstCell )
        {

            string answer = "Updated at " + DateTime.Now.TimeOfDay.ToString("hh\\:mm\\:ss");
            string columns = columnsToUse;
            try
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            catch (Exception)
            {
                MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            //Worksheet sheet = app.ActiveSheet;
            ExcelReference caller = XlCall.Excel(XlCall.xlfCaller) as ExcelReference;
            Range caller_range = helperClass.ReferenceToRange(caller);
            Range formulaCell = caller_range; 
            Range dataStartCell;

            string newFormula;
            if (firstCell is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TEForecasts( \"{cntry}\", \"{indctr}\", \"{columns}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)firstCell);
                    newFormula = string.Format($"=TEForecasts( \"{cntry}\", \"{indctr}\", \"{columns}\", {dataStartCell.Address[false, false]})");
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
            formulaColumns frmlaColumnsPair = new formulaColumns(newFormula, columns, pass, formulaCell);
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

            if (formulaCell.Address == dataStartCell.Address)
            {
                answer = columns.Split(',')[0];
            }

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                helperClass.log.Info("udfClass_Forecasts code is starting");

                if (MyRibbon.refresh != true)
                {
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);
                }

                string key = Properties.Settings.Default["userApiKey"].ToString();

                url = helperClass.getForcUrl(cntry, indctr, key);
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }
            
            helperClass.log.Info("Printing current cell value and finishing process");
            helperClass.runFormula = "RunAutomatically = 0";
            helperClass.origin = true;

            }
            else
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
                //MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                if (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString()))
                {
                    MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                }
                else
                {
                    MyRibbon.myFormulasDict = new Dictionary<string, formulaColumns>();
                }

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && item == MyRibbon.myFormulasDict[item]._caller.Address[false, false])
                    {
                        return answer;
                    }
                }

                Dictionary<string, formulaColumns> myNewDict = helperClass.getNewDict();
                helperClass.log.Info("udfClass_Forecasts code is starting");

                string key = Properties.Settings.Default["userApiKey"].ToString();
                url = helperClass.getForcUrl(cntry, indctr, key);
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {                   
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }

                helperClass.log.Info("Printing current cell value and finishing process");
                helperClass.runFormula = "RunAutomatically = 0";
                helperClass.origin = true;
                helperClass.RemoveOldKey(myNewDict);
            }
            helperClass.log.Info("Printing current cell value and finishing process");
            return answer;
        }

        [ExcelFunction(Name = "TEHistorical", IsMacroType = true)]
        public static string teGetHistorical(string cntry, string indctr, string startDate, string endDate, string columnsToUse, [ExcelArgument(AllowReference = true)] object myArgument )
        {
            string answer = "Updated at " + DateTime.Now.TimeOfDay.ToString("hh\\:mm\\:ss");
            string columns = columnsToUse;
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
            Range caller_range = helperClass.ReferenceToRange(caller);
            Range formulaCell = caller_range;
            
            Range dataStartCell;
            helperClass.fromHistorical = true;

            string newFormula;
            if (myArgument is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TEHistorical( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", \"{columns}\")");
            }
            else
            {
                try
                {
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)myArgument);
                    newFormula = string.Format($"=TEHistorical( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", \"{columns}\", {dataStartCell.Address[false, false]})");
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
            formulaColumns frmlaColumnsPair = new formulaColumns(newFormula, columns, pass, formulaCell);
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

            if (formulaCell.Address == dataStartCell.Address)
            {
                answer = columns.Split(',')[0];
            }

            if (helperClass.runFormula == "RunAutomatically = 1")
            {
                helperClass.log.Info("udfClass_Historical code is starting");

                if (MyRibbon.refresh != true)
                {                    
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);
                }

                string key = Properties.Settings.Default["userApiKey"].ToString();
                url = helperClass.getHistUrl(cntry, indctr, startDate, endDate, key);
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();

                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }

                try
                {
                    helperClass.log.Info("historical finish");
                    helperClass.runFormula = "RunAutomatically = 0";
                    helperClass.origin = true;
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
                //MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                if (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString()))
                {
                    MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                }
                else
                {
                    MyRibbon.myFormulasDict = new Dictionary<string, formulaColumns>();
                }

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && caller_range.Address[false, false] == item)
                    {
                        return answer;
                    }
                }
                Dictionary<string, formulaColumns>  myNewDict = helperClass.getNewDict();

                string key = Properties.Settings.Default["userApiKey"].ToString();
                url = helperClass.getHistUrl(cntry, indctr, startDate, endDate, key);
                var jsnData = new requestData(url);
                var jsData = jsnData.getJSON();
                if (jsData.Count == 0)
                {
                    MessageBox.Show("No data provided for selected parameters");
                }
                else
                {
                    helperClass.elseFunction(columns, jsData, key, dataStartCell, newFormula, formulaCell);
                }

                try
                {
                    helperClass.log.Info("historical finish");
                    helperClass.origin = true;
                }
                catch (Exception ex)
                {
                    helperClass.log.Info(ex.Message);
                    helperClass.log.Trace(ex.StackTrace);
                    throw;
                }
                helperClass.RemoveOldKey(myNewDict);
            }                               
            
            helperClass.log.Info("Printing current cell value and finishing process");
            return answer;
        }

        public static bool refError = false;

        [ExcelFunction(Name = "TESeries", IsMacroType = true)]
        public static string teGetTS(string cntry, string indctr, string startDate, string endDate, [ExcelArgument(AllowReference = true)] object myArgument)
        {
            string answer = "Updated at " + DateTime.Now.TimeOfDay.ToString("hh\\:mm\\:ss");
            bool fromTS = true;
            try
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            catch (Exception)
            {
                MyRibbon.app = (Microsoft.Office.Interop.Excel.Application)ExcelDnaUtil.Application;
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
            }
            //Worksheet sheet = app.ActiveSheet;
            ExcelReference caller = XlCall.Excel(XlCall.xlfCaller) as ExcelReference;
            Range caller_range = helperClass.ReferenceToRange(caller);
            Range formulaCell = caller_range; //Last cell used in userform
            Range dataStartCell;

            string newFormula;
            if (myArgument is ExcelMissing)
            {
                dataStartCell = formulaCell;
                newFormula = string.Format($"=TESeries( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\")");
            }
            else
            {
                try
                {                    
                    dataStartCell = helperClass.ReferenceToRange((ExcelReference)myArgument);
                    newFormula = string.Format($"=TESeries( \"{cntry}\", \"{indctr}\", \"{startDate}\", \"{endDate}\", {dataStartCell.Address[false, false]})");
                }
                catch (Exception)
                {                   
                    refError = true;
                    helperClass.getNewDict(fromTS);
                    return "#REF!";
                    throw;
                }
                
            }
            Range pass = null;
            string columns2 = "";
            formulaColumns frmlaColumnsPair = new formulaColumns(newFormula, columns2, pass, formulaCell);
            MyRibbon.myNewDict = new Dictionary<string, formulaColumns>();
            
            if (formulaCell.Address == dataStartCell.Address)
            {
                answer = "DateTime";
            }

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

            if (helperClass.runFormula == "RunAutomatically = 1" )
            {
                helperClass.log.Info("udfClass_TS code is starting");

                if (MyRibbon.refresh != true)
                {
                    helperClass.setGlobalDict(formulaCell.Address[false, false], frmlaColumnsPair);
                }
                string key = Properties.Settings.Default["userApiKey"].ToString();

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

                var dict = new getDictionary(url);
                Dictionary<string, Dictionary<string, string>> dicts = dict.getDic();
                var columns = dict.getColumns();
                string[] clms = columns.ToArray();

                helperClass.log.Info("Starting function data_to_excel");
                var retriever = new RetrieveAndWriteTSData(clms, dicts, key, dataStartCell, newFormula, formulaCell);
                var thready = new Thread(retriever.fetchData);
                thready.Priority = ThreadPriority.Normal;
                thready.IsBackground = true;
                thready.Start();
            }
            else
            {
                MyRibbon.sheet = MyRibbon.app.ActiveSheet;
                //MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                if (MyRibbon.myMainDict.ContainsKey(MyRibbon.sheet.Index.ToString()))
                {
                    MyRibbon.myFormulasDict = MyRibbon.myMainDict[MyRibbon.sheet.Index.ToString()];
                }
                else
                {
                    MyRibbon.myFormulasDict = new Dictionary<string, formulaColumns>();
                }

                foreach (var item in MyRibbon.myFormulasDict.Keys)
                {
                    if (MyRibbon.myFormulasDict[item]._formula == newFormula && item == MyRibbon.myFormulasDict[item]._caller.Address[false, false])
                    {
                        return answer;
                    }
                }
                
                Dictionary<string, formulaColumns> myNewDict = helperClass.getNewDict(fromTS);

                string key = Properties.Settings.Default["userApiKey"].ToString();

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

                var dict = new getDictionary(url);
                Dictionary<string, Dictionary<string, string>> dicts = dict.getDic();
                var columns = dict.getColumns();
                string[] clms = columns.ToArray();
                helperClass.log.Info("Starting function data_to_excel");
                var retriever = new RetrieveAndWriteTSData(clms, dicts, key, dataStartCell, newFormula, formulaCell);
                var thready = new Thread(retriever.fetchData);
                thready.Priority = ThreadPriority.Normal;
                thready.IsBackground = true;
                thready.Start();

                helperClass.RemoveOldKey(myNewDict);
            }
            helperClass.log.Info("Printing current cell value and finishing process");

            try
            {
                helperClass.log.Info("TS finish");
                helperClass.runFormula = "RunAutomatically = 0";
                helperClass.origin = true;
            }
            catch (Exception ex)
            {
                helperClass.log.Info(ex.Message);
                helperClass.log.Trace(ex.StackTrace);
                throw;
            }           
            return answer;
        }


        internal class RetrieveAndWriteData
        {
            private string names;
            private string key;
            private Range dataStartCell;
            private Range formulaCell;
            private JArray data;
            private string newFormula;
            public RetrieveAndWriteData(string names, JArray data, string key, Range dataStartCell, string nFrmla, Range formulaCell)
            {
                this.names = names;
                this.data = data;
                this.key = key;
                this.dataStartCell = dataStartCell;
                this.newFormula = nFrmla;
                this.formulaCell = formulaCell;
            }

            public void fetchData()
            {
                string nextCursorId = null;

                try
                {
                    do
                    {
                        newPrintData testprint = new newPrintData(names, data, key, dataStartCell, newFormula, formulaCell);
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
                private string key;
                private Range dataStartCell;
            private Dictionary<string, Dictionary<string, string>> dict;
            private string newFormula;
            private Range formulaCell;

            public RetrieveAndWriteTSData(string[] names, Dictionary<string, Dictionary<string, string>> dict, string key, Range dataStartCell, string nFrmla, Range formulaCell)
            {
                this.names = names;
                this.dict = dict;
                this.key = key;
                this.dataStartCell = dataStartCell;
                this.newFormula = nFrmla;
                this.formulaCell = formulaCell;
            }

            public void fetchData()
            {
                string nextCursorId = null;

                try
                {
                    do
                    {
                        printTSData testprint = new printTSData(names, dict, key, dataStartCell, newFormula, formulaCell);
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

using Microsoft.Deployment.WindowsInstaller;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Globalization;

namespace InstallerCA
{
    public class CustomActions
    {
        #region Methods

        #region CaRegisterAddIn
        [CustomAction]
        public static ActionResult CaRegisterAddIn(Session session)
        {
            string szOfficeRegKeyVersions = string.Empty;
            string szBaseAddInKey = @"Software\Microsoft\Office\";
            string szXll32Bit = string.Empty;
            string szXll64Bit = string.Empty;
            string szXllToRegister = string.Empty;
            string szFolder = string.Empty;
            int nOpenVersion;
            double nVersion;
            bool bFoundOffice = false;
            List<string> lstVersions;

            try
            {
                session.Log("Enter try block of CaRegisterAddIn");

                szOfficeRegKeyVersions = session["OFFICEREGKEYS"];
                szXll32Bit = session["XLL32"];
                szXll64Bit = session["XLL64"];
                szFolder = session["AddinFolder"];

                szXll32Bit = szFolder.ToString() + szXll32Bit.ToString();
                szXll64Bit = szFolder.ToString() + szXll64Bit.ToString();

                if (szOfficeRegKeyVersions.Length > 0)
                {
                    lstVersions = szOfficeRegKeyVersions.Split(',').ToList();

                    foreach (string szOfficeVersionKey in lstVersions)
                    {
                        nVersion = double.Parse(szOfficeVersionKey, NumberStyles.Any, CultureInfo.InvariantCulture);

                        session.Log("Retrieving Registry Information for : " + szBaseAddInKey + szOfficeVersionKey);

                        // get the OPEN keys from the Software\Microsoft\Office\[Version]\Excel\Options key, skip if office version not found.
                        if (Registry.CurrentUser.OpenSubKey(szBaseAddInKey + szOfficeVersionKey, false) != null)
                        {
                            string szKeyName = szBaseAddInKey + szOfficeVersionKey + @"\Excel\Options";

                            szXllToRegister = GetAddInName(szXll32Bit, szXll64Bit, szOfficeVersionKey, nVersion);

                            RegistryKey rkExcelXll = Registry.CurrentUser.OpenSubKey(szKeyName, true);

                            if (szXllToRegister != string.Empty && rkExcelXll != null)
                            {
                                string[] szValueNames = rkExcelXll.GetValueNames();
                                bool bIsOpen = false;
                                int nMaxOpen = -1;

                                // check every value for OPEN keys
                                foreach (string szValueName in szValueNames)
                                {
                                    // if there are already OPEN keys, determine if our key is installed
                                    if (szValueName.StartsWith("OPEN"))
                                    {
                                        nOpenVersion = int.TryParse(szValueName.Substring(4), NumberStyles.Any, CultureInfo.InvariantCulture, out nOpenVersion) ? nOpenVersion : 0;
                                        int nNewOpen = szValueName == "OPEN" ? 0 : nOpenVersion;
                                        if (nNewOpen > nMaxOpen)
                                        {
                                            nMaxOpen = nNewOpen;
                                        }

                                        // if the key is our key, set the open flag
                                        //NOTE: this line means if the user has changed its office from 32 to 64 (or conversly) without removing the addin then we will not update the key properly
                                        //The user will have to uninstall addin before installing it again
                                        if (rkExcelXll.GetValue(szValueName).ToString().Contains(szXllToRegister))
                                        {
                                            bIsOpen = true;
                                        }
                                    }
                                }

                                // if adding a new key
                                if (!bIsOpen)
                                {
                                    if (nMaxOpen == -1)
                                    {
                                        rkExcelXll.SetValue("OPEN", "/R \"" + szXllToRegister + "\"");
                                    }
                                    else
                                    {
                                        rkExcelXll.SetValue("OPEN" + (nMaxOpen + 1).ToString(), "/R \"" + szXllToRegister + "\"");
                                    }
                                    rkExcelXll.Close();
                                }
                                bFoundOffice = true;
                            }
                            else
                            {
                                session.Log("Unable to retrieve key for : " + szKeyName);
                            }
                        }
                        else
                        {
                            session.Log("Unable to retrieve registry Information for : " + szBaseAddInKey + szOfficeVersionKey);
                        }
                    }
                }

                session.Log("End CaRegisterAddIn");
            }
            catch (System.Security.SecurityException ex)
            {
                session.Log("CaRegisterAddIn SecurityException" + ex.Message);
                bFoundOffice = false;
            }
            catch (System.UnauthorizedAccessException ex)
            {
                session.Log("CaRegisterAddIn UnauthorizedAccessException" + ex.Message);
                bFoundOffice = false;
            }
            catch (Exception ex)
            {
                session.Log("CaRegisterAddIn Exception" + ex.Message);
                bFoundOffice = false;
            }

            return bFoundOffice ? ActionResult.Success : ActionResult.Failure;
        }
        #endregion

        #region CaUnRegisterAddIn
        [CustomAction]
        public static ActionResult CaUnRegisterAddIn(Session session)
        {
            string szOfficeRegKeyVersions = string.Empty;
            string szBaseAddInKey = @"Software\Microsoft\Office\";
            string szXll32Bit = string.Empty;
            string szXll64Bit = string.Empty;
            string szFolder = string.Empty;
            bool bFoundOffice = false;
            List<string> lstVersions;

            try
            {
                session.Log("Begin CaUnRegisterAddIn");

                szOfficeRegKeyVersions = session["OFFICEREGKEYS"];
                szXll32Bit = session["XLL32"];
                szXll64Bit = session["XLL64"];
                szFolder = session["AddinFolder"];

                szXll32Bit = szFolder.ToString() + szXll32Bit.ToString();
                szXll64Bit = szFolder.ToString() + szXll64Bit.ToString();


                if (szOfficeRegKeyVersions.Length > 0)
                {
                    lstVersions = szOfficeRegKeyVersions.Split(',').ToList();

                    foreach (string szOfficeVersionKey in lstVersions)
                    {
                        // only remove keys where office version is found
                        if (Registry.CurrentUser.OpenSubKey(szBaseAddInKey + szOfficeVersionKey, false) != null)
                        {
                            bFoundOffice = true;

                            string szKeyName = szBaseAddInKey + szOfficeVersionKey + @"\Excel\Options";

                            RegistryKey rkAddInKey = Registry.CurrentUser.OpenSubKey(szKeyName, true);
                            if (rkAddInKey != null)
                            {
                                string[] szValueNames = rkAddInKey.GetValueNames();

                                foreach (string szValueName in szValueNames)
                                {
                                    //unregister both 32 and 64 xll
                                    if (szValueName.StartsWith("OPEN") && (rkAddInKey.GetValue(szValueName).ToString().Contains(szXll32Bit) || rkAddInKey.GetValue(szValueName).ToString().Contains(szXll64Bit)))
                                    {
                                        rkAddInKey.DeleteValue(szValueName);
                                    }
                                }
                            }
                        }
                    }
                }

                session.Log("End CaUnRegisterAddIn");
            }
            catch (Exception ex)
            {
                session.Log(ex.Message);
            }

            return bFoundOffice ? ActionResult.Success : ActionResult.Failure;
        }
        #endregion

        #region ClosePrompt
        [CustomAction]
        public static ActionResult ClosePrompt(Session session)
        {
            session.Log("Begin PromptToCloseApplications");
            try
            {
                var productName = session["ProductName"];
                var processes = session["PromptToCloseProcesses"].Split(',');
                var displayNames = session["PromptToCloseDisplayNames"].Split(',');

                if (processes.Length != displayNames.Length)
                {
                    session.Log(@"Please check that 'PromptToCloseProcesses' and 'PromptToCloseDisplayNames' exist and have same number of items.");
                    return ActionResult.Failure;
                }

                for (var i = 0; i < processes.Length; i++)
                {
                    session.Log("Prompting process {0} with name {1} to close.", processes[i], displayNames[i]);
                    using (var prompt = new PromptCloseApplication(productName, processes[i], displayNames[i]))
                    {
                        if (!prompt.Prompt())
                        {
                            return ActionResult.Failure;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                session.Log("Missing properties or wrong values. Please check that 'PromptToCloseProcesses' and 'PromptToCloseDisplayNames' exist and have same number of items. \nException:" + ex.Message);
                return ActionResult.Failure;
            }

            session.Log("End PromptToCloseApplications");
            return ActionResult.Success;
        }
        #endregion

        #region GetAddInName
        public static string GetAddInName(string szXll32Name, string szXll64Name, string szOfficeVersionKey, double nVersion)
        {
            string szXllToRegister = string.Empty;

            if (nVersion >= 14)
            {
                // determine if office is 32-bit or 64-bit
                RegistryKey localMachineRegistry = // 64bit machines need to determine correct hive.
                    RegistryKey.OpenBaseKey(RegistryHive.LocalMachine,
                        Environment.Is64BitOperatingSystem ? RegistryView.Registry64 : RegistryView.Registry32);
                RegistryKey rkBitness = localMachineRegistry.OpenSubKey(@"Software\Microsoft\Office\" + szOfficeVersionKey + @"\Outlook", false);
                if (rkBitness != null)
                {
                    object oBitValue = rkBitness.GetValue("Bitness");
                    if (oBitValue != null)
                    {
                        if (oBitValue.ToString() == "x64")
                        {
                            szXllToRegister = szXll64Name;
                        }
                        else
                        {
                            szXllToRegister = szXll32Name;
                        }
                    }
                    else
                    {
                        szXllToRegister = szXll32Name;
                    }
                }
                else
                {
                    if (Environment.Is64BitOperatingSystem)
                    {
                        localMachineRegistry = //64bit machines need to check 32bit registry too!
                            RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry32);
                        rkBitness =
                            localMachineRegistry.OpenSubKey(
                                @"Software\Microsoft\Office\" + szOfficeVersionKey + @"\Outlook", false);
                        if (rkBitness != null)
                        {
                            var oBitValue = rkBitness.GetValue("Bitness");
                            if (oBitValue != null)
                            {
                                if (oBitValue.ToString() == "x64")
                                {
                                    szXllToRegister = szXll64Name;
                                }
                                else
                                {
                                    szXllToRegister = szXll32Name;
                                }
                            }
                            else
                            {
                                szXllToRegister = szXll32Name;
                            }
                        }
                        else
                        {
                            szXllToRegister = szXll32Name;
                        }
                    }
                    else
                        szXllToRegister = szXll32Name;
                }
            }
            else
            {
                szXllToRegister = szXll32Name;
            }

            return szXllToRegister;
        }
        #endregion

        #endregion
    }
}

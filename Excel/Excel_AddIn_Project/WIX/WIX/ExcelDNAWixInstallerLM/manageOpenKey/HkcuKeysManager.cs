using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.Win32;

namespace manageOpenKey
{
    class HkcuKeysManager
    {
        private const string SzBaseAddInKey = @"Software\Microsoft\Office\";
        private const string ExcelApplicationName = "excel.exe";

        public void CreateOpenHkcuKey(Parameters parameters)
        {
            if (parameters.SupportedOfficeVersion.Count == 0)
            {
                throw new ApplicationException("There should be at least one office version supported");
            }

            var registryAdapator = new RegistryAbstractor();
            bool foundOffice = false;
            foreach (string szOfficeVersionKey in parameters.SupportedOfficeVersion)
            {
                double nVersion = double.Parse(szOfficeVersionKey, NumberStyles.Any, CultureInfo.InvariantCulture);

                Console.WriteLine("Retrieving Registry Information for : " + SzBaseAddInKey + szOfficeVersionKey);

                // get the OPEN keys from the Software\Microsoft\Office\[Version]\Excel\Options key, skip if office version not found.
                string excelBaseKey = SzBaseAddInKey + szOfficeVersionKey + @"\Excel";
                // Software\Microsoft\Office\[Version]\Excel
                if (IsOfficeExcelInstalled(excelBaseKey)) // this version is install on the Machine, so we have to consider it for the HKCU
                {
                    if (!foundOffice) foundOffice = true;

                    string excelOptionKey = excelBaseKey +  @"\Options";

                    // It is very important to Open or Create see https://github.com/bpatra/ExcelDNAWixInstallerLM/issues/9
                    using (RegistryKey rkExcelXll = registryAdapator.OpenOrCreateHkcuKey(excelOptionKey))
                    {
                        string szXllToRegister = GetAddInName(parameters.XllName, parameters.Xll64Name, szOfficeVersionKey, nVersion);
                        // for a localmachine install the xll's should be in the installFolder
                        string fullPathToXll = Path.Combine(parameters.InstallDirectory, szXllToRegister);

                        Console.WriteLine("Success finding HKCU key for : " + excelOptionKey);
                        string[] szValueNames = rkExcelXll.GetValueNames();
                        bool bIsOpen = false;
                        int nMaxOpen = -1;

                        // check every value for OPEN keys
                        foreach (string szValueName in szValueNames)
                        {
                            Console.WriteLine(string.Format("Examining value {0}", szValueName));
                            // if there are already OPEN keys, determine if our key is installed
                            if (szValueName.StartsWith("OPEN"))
                            {
                                int nOpenVersion = int.TryParse(szValueName.Substring(4), out nOpenVersion) ? nOpenVersion : 0;
                                int nNewOpen = szValueName == "OPEN" ? 0 : nOpenVersion;
                                if (nNewOpen > nMaxOpen)
                                {
                                    nMaxOpen = nNewOpen;
                                }

                                // if the key is our key, set the open flag
                                // NOTE: this line means if the user has changed its office from 32 to 64 (or conversly) without removing the addin then we will not update the key properly
                                // The user will have to uninstall addin before installing it again
                                if (rkExcelXll.GetValue(szValueName).ToString().Contains(szXllToRegister))
                                {
                                    bIsOpen = true;
                                    Console.WriteLine("Already found the OPEN key " + excelOptionKey);
                                }
                            }
                        }


                        // if adding a new key
                        if (!bIsOpen)
                        {
                            string value = "/R \"" + fullPathToXll + "\"";
                            string keyToUse;
                            if (nMaxOpen == -1)
                            {
                                keyToUse = "OPEN";
                            }
                            else
                            {
                                keyToUse = "OPEN" + (nMaxOpen + 1).ToString(CultureInfo.InvariantCulture);

                            }
                            rkExcelXll.SetValue(keyToUse, value);
                            Console.WriteLine("Set {0} key with {1} value", keyToUse, value);
                        }
                    }
                }
                else
                {
                    Console.WriteLine(
                        "Unable to retrieve Office information in HKLM key: {0}. This version of Office might not be installed.",
                        excelBaseKey);
                }
            }

            if (!foundOffice) throw new ApplicationException("No Excel found in HKLM.");

            Console.WriteLine("End CreateOpenHKCUKey");
        }

        public void RemoveHkcuOpenKey(Parameters parameters)
        {
            Console.WriteLine("Begin RemoveHKCUOpenKey");

            if (parameters.SupportedOfficeVersion.Count == 0)
            {
                throw new ApplicationException("There should be at least one office version supported");
            }
                
            foreach (string szOfficeVersionKey in parameters.SupportedOfficeVersion)
            {
                // only remove keys where office version is found
                string officeKey = SzBaseAddInKey + szOfficeVersionKey;
                Console.WriteLine("Try opening {0} HKCU key", officeKey);
                if (Registry.CurrentUser.OpenSubKey(officeKey, false) != null)
                {

                    string szKeyName = SzBaseAddInKey + szOfficeVersionKey + @"\Excel\Options";
                    Console.WriteLine("Try opening {0} HKCU key", szKeyName);
                    using (RegistryKey rkAddInKey = Registry.CurrentUser.OpenSubKey(szKeyName, true))
                    {
                        if (rkAddInKey != null)
                        {
                            Console.WriteLine("... key found!");
                            string[] szValueNames = rkAddInKey.GetValueNames();

                            foreach (string szValueName in szValueNames)
                            {
                                //unregister both 32 and 64 xll
                                if (szValueName.StartsWith("OPEN") && (rkAddInKey.GetValue(szValueName).ToString().Contains(parameters.Xll64Name) || rkAddInKey.GetValue(szValueName).ToString().Contains(parameters.XllName)))
                                {
                                    Console.WriteLine("Deletes the value {0}", szValueName);
                                    rkAddInKey.DeleteValue(szValueName);
                                }
                            }
                        }
                        else
                        {
                            Console.WriteLine("... key not found.");
                        }
                    }
                }
                else
                {
                    Console.WriteLine("... key does not exists.");
                }
            }

            Console.WriteLine("End RemoveHKCUOpenKey");
        }

        private static string GetAddInName(string szXll32Name, string szXll64Name, string szOfficeVersionKey, double nVersion)
        {
            Console.WriteLine("Detect office bitness using office version {0}...", nVersion);
            var officeBitness = GetOfficeBitness(szOfficeVersionKey, nVersion);
            switch (officeBitness)
            {
                case OfficeBitness.X86:
                    Console.WriteLine("... 32 bits.");
                    return szXll32Name;

                case OfficeBitness.X64:
                    Console.WriteLine("... 64 bits.");
                    return szXll64Name;

                default:
                    throw new InvalidOperationException("Cannot detect office bitness for version " + nVersion);
            }
        }


        private enum OfficeBitness
        {
            Unknown,
            X86,
            X64
        }

        private static OfficeBitness GetOfficeBitness(string szOfficeVersionKey, double nVersion)
        {
            // before office 2010, no 64 bits version of office exists. also only 32 bits can be installed on 32 bits systems.
            if (nVersion < 14 || !Environment.Is64BitOperatingSystem)
            {
                return OfficeBitness.X86;
            }

            // Check the ClickToRun registry (x86+x64). Both must be checked.
            // http://msdn.microsoft.com/en-us/library/office/ff864733(v=office.15).aspx
            RegistryKey clickToRunRegKey86 = RegistryKey
                .OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry32)
                .OpenSubKey(@"Software\Microsoft\Office\" + szOfficeVersionKey + @"\ClickToRun\Configuration", false);
            Console.WriteLine("Office bitness using clicktorun x86 office installation: {0}present", clickToRunRegKey86 == null ? "not " : "");
            RegistryKey clickToRunRegKey64 = RegistryKey
                .OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64)
                .OpenSubKey(@"Software\Microsoft\Office\" + szOfficeVersionKey + @"\ClickToRun\Configuration", false);
            Console.WriteLine("Office bitness using clicktorun x64 office installation: {0}present", clickToRunRegKey64 == null ? "not " : "");


            // Check the Outlook\Bitness registry key
            // Using a registry key of outlook to determine the bitness of office may look like weird but that's the reality.
            // http://stackoverflow.com/questions/2203980/detect-whether-office-2010-is-32bit-or-64bit-via-the-registry

            // Note about upgrading office with "keep previous version" option:
            // Only one version of Outlook can be installed at a time. However, we can have several excel, word, etc versions at the same time.
            // One of the Outlook registry key is removed when upgrading Office. Thus the bitness is not found, resulting in the setup to fail.
            // Checking both x86/64 keys for office bitness seems to do the job.

            // Another alternative might be to check the bitness of any version of Office. It seems that you can't install 32bits and 64bits version
            // of office side-by-side (https://msdn.microsoft.com/en-us/library/ee691831.aspx#Anchor_6, https://technet.microsoft.com/en-us/library/ee681792.aspx)

            RegistryKey outlookRegKey86 =
                RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry32)
                    .OpenSubKey(@"Software\Microsoft\Office\" + szOfficeVersionKey + @"\Outlook", false);
            Console.WriteLine("Office bitness using std x86 office installation: {0}present", outlookRegKey86 == null ? "not " : "");
            RegistryKey outlookRegKey64 =
                RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64)
                    .OpenSubKey(@"Software\Microsoft\Office\" + szOfficeVersionKey + @"\Outlook", false);
            Console.WriteLine("Office bitness using std x64 office installation: {0}present", outlookRegKey64 == null ? "not " : "");


            // First check clicktorun (skip if not defined), new deployment tool from microsoft
            var bitnessRegKey = clickToRunRegKey86 ?? clickToRunRegKey64;
            if (bitnessRegKey != null)
            {
                switch ((bitnessRegKey.GetValue("Platform") ?? "").ToString())
                {
                    case "x64":
                        return OfficeBitness.X64;
                    case "x86":
                        return OfficeBitness.X86;
                }
            }
            
            // Then check outlook bitness registry key
            var outlookRegKeys = new List<RegistryKey> { outlookRegKey86, outlookRegKey64 };
            foreach (var outlookRegKey in outlookRegKeys.Where(x => x != null))
            {
                object oBitValue = outlookRegKey.GetValue("Bitness");
                if (oBitValue != null)
                {
                    switch (oBitValue.ToString())
                    {
                        case "x64":
                            return OfficeBitness.X64;
                        case "": // Empty key means x86 for older install of office.
                        case "x86":
                            return OfficeBitness.X86;
                    }
                }
            }

            // If not found, then unknown
            return OfficeBitness.Unknown;
        }

        private static bool IsOfficeExcelInstalled(string excelBaseKey)
        {
            // Check both x86 and x64 registry
            var hklmRoot = new List<RegistryKey>
            {
                RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64),
                RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry32)
            };

            /*
             * Here, we check if excel is trully installed on the system by checking Office installation root + application name.
             * HKLM\Software\Microsoft\Office\x.x\Excel\InstallRoot | Path
             */

            var excelInstallRootKey = excelBaseKey + @"\InstallRoot";
            foreach (var root in hklmRoot)
            {
                var installRootKey = root.OpenSubKey(excelInstallRootKey, false);
                if (installRootKey == null)
                {
                    continue;
                }

                var pathKey = installRootKey.GetValue("Path") as string;
                if (string.IsNullOrEmpty(pathKey))
                {
                    continue;
                }

                try
                {
                    var excelApplicationPath = Path.Combine(pathKey, ExcelApplicationName);
                    if (File.Exists(excelApplicationPath))
                    {
                        return true;
                    }
                }
                catch (ArgumentException ex)
                {
                    // if the registry key is corrupted (Path.Combine call), we don't want to throw. but log it just in case.
                    Console.WriteLine("IsOfficeExcelInstalled failed due to invalid value in registry key {0}. Consider Microsoft Office Excel not installed for this version. Exception: {1}", excelInstallRootKey, ex);
                }
            }

            return false;
        }
    }
}

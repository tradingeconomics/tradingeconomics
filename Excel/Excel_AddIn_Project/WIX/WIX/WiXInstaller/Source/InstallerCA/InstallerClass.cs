using Microsoft.Win32;

using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration.Install;
using System.IO;
using System.Linq;
using System.Reflection;

namespace ExcelXLL
{
    [RunInstaller(true)]
    public partial class InstallerClass : System.Configuration.Install.Installer
    {
        #region Constants
        private const string m_szRegistryValue = "/R " + "\"ExcelXLL-packed.xll\"";
        private const string m_szKeyRoot = "OPEN";
        #endregion

        public InstallerClass()
        {
            // Attach the 'Committed' event.
            this.Committed += new InstallEventHandler(MyInstaller_Committed);
            // Attach the 'Committing' event.
            //this.Committing += new InstallEventHandler(MyInstaller_Committing);

            InitializeComponent();
        }

        // Event handler for 'Committing' event.
        private void MyInstaller_Committing(object sender, InstallEventArgs e)
        {
            //Console.WriteLine("");
            //Console.WriteLine("Committing Event occurred.");
            //Console.WriteLine("");
        }

        // Event handler for 'Committed' event.
        private void MyInstaller_Committed(object sender, InstallEventArgs e)
        {
            try
            {
                MaintainRegistryKey(true);
            }
            catch
            {
                // Do nothing... 
            }
        }

                /// <summary>
        /// Creates a registry string or deletes one in the context of registering an Excel Automation Addin written in C#
        /// </summary>
        /// <param name="szExcelVersion">Number of Excel Version, e.g. 14.0 if Excel 2010</param>
        /// <param name="bInstallTheAddin">true stands for installing, false stands for deinstalling</param>
        public void UpdateRegistry(string szExcelVersion, bool bInstallTheAddin)
        {
            string szKeyName = string.Empty;
            string szKeyValue = string.Empty;
            bool bKeyExists = false;
            string szRegKeyOptions = string.Empty;

            try
            {
                szRegKeyOptions = "Software\\Microsoft\\Office\\" + szExcelVersion + "\\Excel\\Options";

                RegistryKey regKeyOptions = Registry.CurrentUser.OpenSubKey(szRegKeyOptions, true);
                string[] szValueOpenNames = regKeyOptions.GetValueNames().Where(item => item.ToUpper().Contains(m_szKeyRoot)).ToArray();
                szKeyName = GetKeyName(regKeyOptions, szValueOpenNames, ref bKeyExists);

                if (bInstallTheAddin)
                {
                    if (!bKeyExists)
                    {
                        regKeyOptions.SetValue(szKeyName, m_szRegistryValue, RegistryValueKind.String);
                    }
                }
                else
                {
                    if (bKeyExists)
                    {
                        regKeyOptions.DeleteValue(szKeyName, false);
                    }
                }
            }
            catch
            {                
            }
        }

        /// <summary>
        /// Retrieves an OPEN key from the list of Option keys.  If no key exists, then the key will be OPEN.
        /// </summary>
        /// <param name="regKeyOptions">Registry keys found under HKEY_CURRENT_USER\Software\Microsoft\Office\[Version]\Excel\Options</param>
        /// <param name="szKeyNames">All keys that begin with OPEN</param>
        /// <param name="bKeyExists">Indicator passed by ref of whether the key has been found. This indicator will be set within this method.</param>
        /// <returns>The registry key name to be created or deleted.</returns>
        private string GetKeyName(RegistryKey regKeyOptions, string[] szKeyNames, ref bool bKeyExists)
        {
            string szKeyName = string.Empty;
            string szKeyValue = string.Empty;
            int nOpenVersion = 0;

            for (int i = 0; i < szKeyNames.Length; i++)
            {
                szKeyValue = (string)regKeyOptions.GetValue(szKeyNames[i], m_szRegistryValue);

                if (string.Compare(szKeyValue, m_szRegistryValue) == 0)
                {
                    szKeyName = szKeyNames[i];
                    bKeyExists = true;
                }
                else
                {
                    nOpenVersion = i + 1;
                }
            }

            if (szKeyNames.Length > 0 && !bKeyExists)
            {
                szKeyName = m_szKeyRoot + nOpenVersion.ToString();
            }
            else if (szKeyNames.Length == 0)
            {
                szKeyName = m_szKeyRoot;
            }

            return szKeyName;
        }

        private void MaintainRegistryKey(bool bInsertKey)
        {
            UpdateRegistry("11.0", bInsertKey); // Excel 2003 32-bit
            UpdateRegistry("12.0", bInsertKey); // Excel 2007 32-bit
            UpdateRegistry("14.0", bInsertKey); // Excel 2010 32-bit
            UpdateRegistry("15.0", bInsertKey); // Excel 2013 32-bit
        }

        // Override the 'Install' method.
        public override void Install(IDictionary savedState)
        {
            base.Install(savedState);
        }

        // Override the 'Commit' method.
        public override void Commit(IDictionary savedState)
        {
            base.Commit(savedState);
        }

        // Override the 'Rollback' method.
        public override void Rollback(IDictionary savedState)
        {
            base.Rollback(savedState);
        }

        public override void Uninstall(IDictionary savedState)
        {
            MaintainRegistryKey(false);

            base.Uninstall(savedState);
        }
    }
}

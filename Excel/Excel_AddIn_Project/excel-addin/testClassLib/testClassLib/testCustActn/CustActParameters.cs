using System;
using Microsoft.Deployment.WindowsInstaller;
using Microsoft.Win32;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testCustActn
{
    /// <summary>
    /// Main parameters that are extracted for <see cref="Session"/> input parameter of the CustomActions
    /// </summary>
    /// <remarks>
    /// Not all parameters are required for both custom actions, however for the sake of simplicity
    /// we pass the same args for <see cref="CustomActions.CaActiveSetup_RemoveOpenHKCU"/> and <see cref="CustomActions.CaActiveSetup_SetOpenHKCU"/>
    /// </remarks>
    /// 
    public class CustActParameters
    {
        const string BasePathActiveSetup = @"SOFTWARE\Microsoft\Active Setup\Installed Components\";

        public string ProductName { get; private set; }

        public string CompanyName { get; private set; }

        public string Version { get; private set; }

        /// <summary>
        /// Command that will be set in the StubPath on install or update or repair
        /// </summary>
        public string CreateCommand { get; private set; }

        /// <summary>
        /// Command that will be set in the StubPath on removal
        /// </summary>
        public string RemoveCommand { get; private set; }

        private string ActiveSetupGuid { get; set; }

        public String RegistrySubKey
        {
            get { return BasePathActiveSetup + ActiveSetupGuid; }
        }

        /// <summary>
        /// This is what is written in the Default key (will be prompt to end user on install!)
        /// </summary>
        public string Default
        {
            get { return string.Format("{0} by {1}", ProductName, CompanyName); }
        }

        public string CreateComponentId
        {
            get { return string.Format("ActiveSetup for managing the HKCU OpenKey of {0} by {1}", ProductName, CompanyName); }
        }

        public static CustActParameters ExtractFromSession(Session session)
        {
            const string createHkcuCommandKey = "CREATE_HKCU_OPEN_FULL";
            const string createGuidKey = "ACTIVESETUP_GUID";
            const string productNameKey = "PRODUCTNAME";
            const string companyNameKey = "COMPANYNAME";
            const string versionKey = "VERSION";
            const string removeHkcuCommand = "REMOVE_HKCU_OPEN_FULL";

            string productName = ExtractAndCheck(session, productNameKey);
            string version = ExtractAndCheck(session, versionKey);

            string createCommand = ExtractAndCheck(session, createHkcuCommandKey);
            string createActiveSetupGuid = ExtractAndCheck(session, createGuidKey);

            string removeCommand = ExtractAndCheck(session, removeHkcuCommand);
            string companyName = ExtractAndCheck(session, companyNameKey);

            var caParams = new CustActParameters()
            {
                ActiveSetupGuid = createActiveSetupGuid,
                CreateCommand = createCommand,
                ProductName = productName,
                Version = version,
                RemoveCommand = removeCommand,
                CompanyName = companyName
            };

            return caParams;
        }

        private static string ExtractAndCheck(Session session, string key)
        {
            string value = session.CustomActionData[key];
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException(key + "is not found");
            }
            return value;
        }
    }
}

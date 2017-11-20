using System.Security;
using Microsoft.Deployment.WindowsInstaller;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace mySampleWiXSetupCA
{
    public class CustomActions
    {
        /// <summary>
        /// Change the HKLM active setup responsible for invoking the .exe to put IsInstalled to false and pass the command for removing in the StubPath.
        /// </summary>
        /// <param name="session"><seealso cref="CaParameters"/></param>
        /// <returns>success status</returns>
        [CustomAction]
        public static ActionResult CaActiveSetup_RemoveHKLM(Session session)
        {
            Action action = () =>
                {
                    var registryAbstractor = new RegistryAbstractor(session);

                    //Set the Active Setup ot IsInstalled = 0 and change the StubPath
                    var caParams = CaParameters.ExtractFromSession(session);
                    using (RegistryKey createHklmKey = registryAbstractor.OpenOrCreateHklmKey(caParams.RegistrySubKey))
                    {
                        UpdateActiveSetupHklmKey(createHklmKey, caParams.Default, caParams.CreateComponentId,
                                                 caParams.CreateCommand, caParams.RemoveCommand, caParams.Version, false);
                    }
                };

            var runner = new CaRunner(session);
            return runner.RunAction(action, "CaActiveSetup_RemoveHKLM");
        }

        /// <summary>
        /// This trick is used to remove the ActiveSetup as an installed component without needing a reloging.
        /// see issue #8
        /// </summary>
        /// <param name="session"></param>
        /// <returns></returns>
        [CustomAction]
        public static ActionResult CaActiveSetup_RemoveHKCU(Session session)
        {
            Action action = () =>
            {
                var registryAbstractor = new RegistryAbstractor(session);

                //Set the Active Setup ot IsInstalled = 0 and change the StubPath
                var caParams = CaParameters.ExtractFromSession(session);
                registryAbstractor.DeleteHkcuKey(caParams.RegistrySubKey);
            };

            var runner = new CaRunner(session);
            return runner.RunAction(action, "CaActiveSetup_RemoveHKCU");
        }



        /// <summary>
        /// This trick is used to register the ActiveSetup as an installed component without needing a reloging, this is mandatory since we do not want to force reboot.
        /// see issue #8
        /// </summary>
        /// <param name="session"></param>
        /// <returns></returns>
        [CustomAction]
        public static ActionResult CaActiveSetup_SetHKCU(Session session)
        {
            Action action = () =>
            {
                var registryAbstractor = new RegistryAbstractor(session);

                //Set the Active Setup ot IsInstalled = 0 and change the StubPath
                var caParams = CaParameters.ExtractFromSession(session);
                using (RegistryKey hkcuKey = registryAbstractor.OpenOrCreateHkcuKey(caParams.RegistrySubKey))
                {
                    UpdateHkcuActiveSetupKey(hkcuKey, caParams.Version);
                }
            };

            var runner = new CaRunner(session);
            return runner.RunAction(action, "CaActiveSetup_SetHKCU");
        }


        /// <summary>
        /// Update/create the HKLM active setup responsible for invoking the .exe to put IsInstalled to true and pass the command for installing in the StubPath.
        /// </summary>
        /// <param name="session"><seealso cref="CaParameters"/></param>
        /// <returns>success status</returns>
        [CustomAction]
        public static ActionResult CaActiveSetup_SetHKLM(Session session)
        {
            Action action = () =>
            {
                var registryAbstractor = new RegistryAbstractor(session);
                var caParams = CaParameters.ExtractFromSession(session);

                //install the active setup that will set the OPEN key.
                using (RegistryKey hklmKey = registryAbstractor.OpenOrCreateHklmKey(caParams.RegistrySubKey))
                {
                    UpdateActiveSetupHklmKey(hklmKey, caParams.Default, caParams.CreateComponentId, caParams.CreateCommand, caParams.RemoveCommand, caParams.Version, true);
                }
            };

            var runner = new CaRunner(session);
            return runner.RunAction(action, "CaActiveSetup_SetHKLM");
        }

        private static void UpdateActiveSetupHklmKey(RegistryKey hklmKey, string defaultForKey, string componentId, string commandInstall, string commandUninstall, string version, bool isInstalled)
        {
            if (hklmKey == null)
            {
                throw new ArgumentNullException("hklmKey");
            }

            hklmKey.SetValue("",defaultForKey);
            hklmKey.SetValue("ComponentID", componentId, RegistryValueKind.String);
            hklmKey.SetValue("StubPath",isInstalled ? commandInstall : commandUninstall, RegistryValueKind.String);

            //Found that . cannot be used for version
            //http://www.sepago.de/e/helge/2010/04/22/active-setup-explained
            hklmKey.SetValue("Version",version.Replace('.',','),RegistryValueKind.String); 
            hklmKey.SetValue("IsInstalled", isInstalled ? 1 : 0 ,RegistryValueKind.DWord);
            hklmKey.SetValue("Dontask",2);
        }

        //Only the version is required... for hkcu installed component of active setup
        private static void UpdateHkcuActiveSetupKey(RegistryKey activeSetupKey, string version)
        {
            if (activeSetupKey == null)
            {
                throw new ArgumentNullException("activeSetupKey");
            }
            activeSetupKey.SetValue("Version", version.Replace('.', ','), RegistryValueKind.String); 
        }
    }
}

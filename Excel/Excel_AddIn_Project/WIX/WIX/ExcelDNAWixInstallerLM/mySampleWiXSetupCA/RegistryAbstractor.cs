using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Deployment.WindowsInstaller;
using Microsoft.Win32;

namespace mySampleWiXSetupCA
{
    /// <summary>
    /// Wraps registry action for logging.
    /// </summary>
    /// <remarks>
    /// For the sake of simplicity use only the 32 ActiveSetup registry...
    /// </remarks>
    class RegistryAbstractor
    {
        private readonly Session _session;
        private readonly RegistryKey _baseRegistryHklm;
        private readonly RegistryKey _baseRegistryHkcu;
        public RegistryAbstractor(Session session)
        {
            _session = session;
            if (Environment.Is64BitOperatingSystem) //Use OS not process...
            {
                _baseRegistryHklm = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64);
                _baseRegistryHkcu = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, RegistryView.Registry64);
            }
            else
            {
                _baseRegistryHklm = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry32);
                _baseRegistryHkcu = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, RegistryView.Registry32);
            }
        }

        private RegistryKey Open(string subkey, bool isHklm, Func<string,RegistryKey> providerOpen, Func<string,RegistryKey> providerCreate)
        {
            _session.Log(string.Format("Opening {0} Key {1}...", isHklm ? "HKLM " : "HKCU", subkey));
            RegistryKey registryKey = providerOpen(subkey);

            if (registryKey == null)
            {
                _session.Log("... key not existing, create it.");
                registryKey = providerCreate(subkey);
            }
            else
            {
                _session.Log("... existing key successfully retrieved.");
            }

            return registryKey;
        }

        public RegistryKey OpenOrCreateHklmKey(string subKey)
        {
            return Open(subKey, true, str => _baseRegistryHklm.OpenSubKey(str, true), str => _baseRegistryHklm.CreateSubKey(str));
        }

        public RegistryKey OpenOrCreateHkcuKey(string subKey)
        {
            return Open(subKey, false, str => _baseRegistryHkcu.OpenSubKey(str, true), str => _baseRegistryHkcu.CreateSubKey(str));
        }

        public void DeleteHkcuKey(string subKey)
        {
            _session.Log("Start the deletion of HKCU sub key " + subKey);
            _baseRegistryHkcu.DeleteSubKey(subKey, false);
        }
    }
}

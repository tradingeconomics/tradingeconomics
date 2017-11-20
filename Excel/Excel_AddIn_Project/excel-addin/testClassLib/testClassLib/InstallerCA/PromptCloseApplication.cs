using Microsoft.Deployment.WindowsInstaller;
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace InstallerCA
{
    public class PromptCloseApplication : IDisposable
    {
        #region Instance Variables
        private readonly string m_szProductName;
        private readonly string m_szProcessName;
        private readonly string m_szDisplayName;
        private System.Threading.Timer m_timer;
        private Form m_form;
        private IntPtr m_mainWindowHanle;

        [DllImport("user32.dll", SetLastError = true)]
        public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
        #endregion

        #region Constructor
        public PromptCloseApplication(string productName, string processName, string displayName)
        {
            m_szProductName = productName;
            m_szProcessName = processName;
            m_szDisplayName = displayName;
        }
        #endregion

        #region Prompt
        public bool Prompt()
        {
            bool bReturn = false;
            bool bRunning = IsRunning(m_szProcessName);

            if (IsRunning(m_szProcessName))
            {
                m_form = new ClosePromptForm(String.Format("Please close running instances of {0} before running {1} setup.", m_szDisplayName, m_szProductName));
                m_mainWindowHanle = FindWindow(null, m_szProductName + " Setup");
                if (m_mainWindowHanle == IntPtr.Zero)
                {
                    m_mainWindowHanle = FindWindow("#32770", m_szProductName);
                }

                m_timer = new System.Threading.Timer(TimerElapsed, m_form, 200, 200);

                bReturn = ShowDialog();
            }
            else
            {
                bReturn = true;
            }
            return bReturn;
        }
        #endregion

        #region ShowDialog
        bool ShowDialog()
        {
            bool bReturn = false;

            if (m_form.ShowDialog(new WindowWrapper(m_mainWindowHanle)) == DialogResult.OK)
            {
                bReturn = !IsRunning(m_szProcessName) || ShowDialog();
            }
            return bReturn;
        }
        #endregion

        #region TimerElapsed
        private void TimerElapsed(object sender)
        {
            if (m_form == null || IsRunning(m_szProcessName) || !m_form.Visible)
            {
                return;
            }
            m_form.DialogResult = DialogResult.OK;
            m_form.Close();
        }
        #endregion

        #region IsRunning
        private bool IsRunning(string processName)
        {
            bool bReturn = false;
            Process[] procList = Process.GetProcesses();
            foreach (Process p in procList)
            {
                if (p.ProcessName.ToUpper() == processName.ToUpper())
                {
                    return true;
                }
            }
            return bReturn;
        }
        #endregion

        #region Destructor
        public void Dispose()
        {
            if (m_timer != null)
            {
                m_timer.Dispose();
            }
            if (m_form != null && m_form.Visible)
            {
                m_form.Close();
            }
        }
        #endregion
    }

}

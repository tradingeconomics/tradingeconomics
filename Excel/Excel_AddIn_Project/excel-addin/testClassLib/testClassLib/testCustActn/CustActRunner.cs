using System;
using System.Security;
using Microsoft.Deployment.WindowsInstaller;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace testCustActn
{
    internal class CustActRunner
    {
        private readonly Session _session;

        public CustActRunner(Session session)
        {
            _session = session;
        }

        public ActionResult RunAction(Action action, string methodName)
        {
            try
            {
                _session.Log(string.Format("Start {0} ...", methodName));

                action();

            }
            catch (SecurityException ex)
            {
                _session.Log(string.Format("{0} SecurityException" + ex.Message, methodName));
                return ActionResult.Failure;
            }
            catch (UnauthorizedAccessException ex)
            {
                _session.Log(string.Format("{0} UnauthorizedAccessException" + ex.Message, methodName));
                return ActionResult.Failure;
            }
            catch (Exception ex)
            {
                _session.Log(string.Format("{0} Exception" + ex.Message, methodName));
                return ActionResult.Failure;
            }
            _session.Log(string.Format("... end {0}, successful!", methodName));
            return ActionResult.Success;
        }
    }
}

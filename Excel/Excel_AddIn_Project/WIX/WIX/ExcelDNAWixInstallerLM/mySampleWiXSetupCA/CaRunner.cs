using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using Microsoft.Deployment.WindowsInstaller;

namespace mySampleWiXSetupCA
{
    internal class CaRunner
    {
        private readonly Session _session;

        public CaRunner(Session session)
        {
            _session = session;
        }

        public ActionResult RunAction(Action action, string methodName)
        {
            try
            {
                _session.Log(string.Format("Start {0} ...",methodName));

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

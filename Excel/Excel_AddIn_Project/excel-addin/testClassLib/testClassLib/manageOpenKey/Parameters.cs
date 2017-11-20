using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace manageOpenKey
{
    class Parameters
    {
        public Command Command { get; set; }
        public string XllName { get; set; }
        public string Xll64Name { get; set; }
        public string InstallDirectory { get; set; }
        public List<string> SupportedOfficeVersion { get; set; }

        // expected syntax should be
        // pathToExe.exe /install mysample-AddIn-packed.xll mysample-AddIn64-packed.xll '12.0,14.0,15.0'
        // pathToExe.exe /uninstall mysample-AddIn-packed.xll mysample-AddIn64-packed.xll '12.0,14.0,15.0'
        public static Parameters ExtractFromArgs(string[] args)
        {
            if (args.Length != 4)
            {
                throw new ArgumentException("Wrong number of arguments, should be 4 we found: " + args.Length);
            }
            var parameters = new Parameters();
            if (args[0] == "/install")
            {
                parameters.Command = Command.Install;
            }
            else if (args[0] == "/uninstall")
            {
                parameters.Command = Command.Uninstall;
            }
            else
            {
                throw new ArgumentException(@"There are two arguments possible: /install or /uninstall).");
            }

            parameters.XllName = args[1];
            parameters.Xll64Name = args[2];


            //The install directory of the xll is supposed to be the same as the .exe one.
            string directory = Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location);
            parameters.InstallDirectory = directory;

            parameters.SupportedOfficeVersion = args[3].Split(',').ToList();

            return parameters;
        }
    }

    enum Command
    {
        Install, Uninstall
    }
}

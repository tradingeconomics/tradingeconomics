ExcelDNAWixInstallerLM
======================

## A sample Wix installer "per machine" for [Excel-DNA][homepageDNA] addins.

The [Excel-DNA Wix installer][wixinstallerurl] sample found is per User which makes it not suitable for install at "company level". Then we have to perform a per Machine install. This cannot be done directly with HKLM because the OPEN key for .xll can be only in the HKCU hive. Therefore this install uses the ActiveSetup feature of Windows that propagates some install for all users of a given machine. The user who wants technical details can check [my blogpost on the subject][blogpost]. You may also be interested in [HKCU OPEN discussion][hkcustack] and [InstallMachine][permachineinstall] one.

This project may also be interesting for people looking for a Wix installer that uses the ActiveSetup feature (there are some traps ahead...).

## What you should know before reusing this sample for your own project

###Configuration
+ Then only configuration that you are supposed to do is on the *.wxi* file under the */mySampleWiXSetup* directory. Check the instruction [there][wxilink].

+ You MUST change the GUIDs there and replace by yours. To generate a GUID you may type [System.Guid]::NewGuid() in a Powershell Console.

###Requirements for this sample
+ In this sample we have set only the list of supported Office version to 12.0,14.0,15.0,16.0 (Office 2007, 2010 and 2013, 2016). But there should not be a big deal to support 2003 as well even we have tried. Office 365 is also supported.

+ In this install the Full .Net Framework 4.0 is required. However we believe that you can require .NET 4.0 Client Profile because many elements of the Microsoft.Win32 namespace used in this sample are present in .NET40 Client Profile. Support for .NET 3.5 will require to rewrite a good proportion of the .NET Registry APIs.
 
###A summary of the solution involved there.
+ The Wix installer has only Install, Repair, Uninstall (no Modify). It modifies the HKLM subkeys then it requires elevated (Administrator) privileges.

+ While installing and repairing, the msi installs the two Excel-DNA packed xlls (one for Office32 and one for Office64) in the x86 ProgramFiles directory. Then, for the current user, it invokes an executable (called *manageOpenKey.exe*) that will set the proper *HKCU OPEN key* for this current user. **Therefore, there is no need for the current user to reboot for using the addin**. The setup for the other user is handled using the ActiveSetup windows feature. Shortly, this is an HKLM subkey that is "mirorred" in the HKCUs. If not present in the HKCU, which will happen when a user logs in for the first time, then a script of your choice can be executed. Here we invoke the same *manageOpenKey.exe* mentioned before to setup the *HKCU OPEN key*. Note also that the upgrading (versioning) and uninstall is also handled for more information [see here][blogpost]

###Limitations
+ There is only one limitation known for now and its in the uninstall. The uninstall does not wipe completly the *[INSTALLFOLDER] typically (%SystemDrive%/Program Files(x86)/YourCompany/YourProduct)*. Indeed, we have to leave the *manageOpenKey.exe* which is also responsible for cleaning the environmment for *all* users. We have added a README.txt in the *[INSTALLFOLDER]* that informs user that the directory can be cleaned only if all users have logged at least one after uninstall.

###Others
One fact that may surprise: if a non admin tries to uninstall, then the OS will ask to execute throught administrator privileges (then another user). If he does so then, the addin will not be properly uninstalled for the non admin user. He will have to relog so that the uninstall process per user triggered by ActiveSetup is executed (and the OPEN key will be removed).

###Citrix support
Create a new logon script that triggers the ActiveSetup with this command
%SystemRoot%\system32\runonce.exe /AlternateShellStartup

[wixinstallerurl]: https://github.com/Excel-DNA/WiXInstaller "ExcelDNA Wix installer"
[blogpost]: http://benoitpatra.com/2014/07/26/a-sample-wix-installer-using-the-activesetup-feature/ "Active Setup blog post"
[wxilink]: https://github.com/bpatra/ExcelDNAWixInstallerLM/blob/master/mySampleWiXSetup/mySampleVersionInfo.wxi "The Wxi file you should imperatively modify"
[hkcustack]: http://stackoverflow.com/questions/18602560/how-to-deploy-an-excel-xll-add-in-and-automatically-register-the-add-in-in-excel "A discussion on HKCU OPEN keys"
[permachineinstall]: https://exceldna.codeplex.com/discussions/550941 "Discussion on per machine install"
[homepageDNA]: http://exceldna.codeplex.com/ "The Excel-DNA homepage"
[activesetupexplained]: http://helgeklein.com/blog/2010/04/active-setup-explained/ "ActiveSetup explained"

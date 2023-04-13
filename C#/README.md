# Trading Economics - C# examples

Use this project as a reference how integrate your .NET application with Trading Economics data. The project provides general examples of how one can access the Trading Economics API using the programming language C#. The .cs files are divided by area of interest into the API.

#

## Getting Started

* We recommend to get the Visual Studio IDE
* https://visualstudio.microsoft.com/vs/

#

## Usage

Since there are .cs files for each area within the same solution, to run the desired file on startup, the project configuration file (.csproj) must be tweaked. There are two simple ways to do this configuration change.

1. Visual Studio IDE
* Right click on the _CSharpExamples_ project and click the last option (Properties). 
* Under the Application section, choose the Startup object that you like, meaning, the file that you would like to execute on startup.

2. Text Editor
* Open the file _CSharpExamples.csproj_
* Find the tag &lt;StartupObject&gt; 
* Change the inner object with the namespace and name of the file you want to execute.

```
<PropertyGroup>
    <StartupObject>CSharpExamples.Streamer</StartupObject>
</PropertyGroup>
```
#

## API Key

To access the information, a common test key **guest:guest** has been applied. To use your own key, you must type it when asked in the begining of the program execution.

You still can just press ENTER, without providing a API KEY. In this case, the aplication will make use of the default API Key **guest:guest** that is used as an example key. Keep in mind that the example API Key is limited to enable the user to have a taste on how the Trading Economics API works; therefore, this key comes with limitations and should not be used in a production environment.
# C# examples

Use this project as a reference how integrate your .NET application with Trading Economics data. The project provides general examples of how one can access the Trading Economics API using the programming language C#. The .cs files are divided by area of interest into the API.

## Running the desired example

Since there are .cs files for each area within the same solution, to run the desired file on startup, the project configuration file (.csproj) must be tweaked. There are two simple ways to do this configuration change.

Using Visual Studio IDE, right click on the _CSharpExamples_ project and click the last option (Properties). Under the Application section, choose the Startup object that you like, meaning, the file that you would like to execute on startup.

Using a text file editor, open the file _CSharpExamples.csproj_, find the tag &lt;StartupObject&gt; and change the inner object with the namespace and name of the file you want to execute.

```
<PropertyGroup>
    <StartupObject>CSharpExamples.Streamer</StartupObject>
</PropertyGroup>
```

## API Key

To access the information, a common test key **guest:guest** has been applied. To use your own key, you must go to the _App.config_ file and look for the appSettings value for the key _clientkey_

Search for: `<add key="clientkey" value="guest:guest"/>`

Changing the value **guest:guest** with your current API Key will make every example run under your subscription key.
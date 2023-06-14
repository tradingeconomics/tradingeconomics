To use TE Sheets Add-On:
- Create a new Google Spreadsheet, rename it to TradingEconomics.
- On the menu bar, select “Extensions” and click on the “Apps Script” item on the dropdown menu listed (the flow is Extensions → Apps Script).
- A new tab is opened with a script editor, rename your project from “Untitled project” to “Trading Economics”. You can do so by clicking on “Untitled project” on the menu bar and a dialog box will appear where you will  input the new name. Then you click on “Rename”.
- Copy code.gs  from the Git repository and paste it to the new code.gs  file.  Save the file (you can do so by using Ctrl + S).
- Click on the “+” icon next to Files, select HTML file and name it index.html. Copy index.html from the Git repository and paste it to the new index.html file (Files → HTML → index.html). Save the file.
- Close the Apps Script tab and refresh your spreadsheet. You will see a new menu after "Help", called "TE". Click TE → Get Data to start using the Add-On.

Important: 
- Before the first use of the Add-On, it will give you an warning saying "This app isn't verified". Here you should click on "Advanced" and then click on "Go to ... (unsafe)" to continue to using our Add-On.
- Our add-on requests can be up to 10 000 rows long. Make sure you have enough rows on you SpreadSheet before making a request. Otherwise it will take several minutes instead of just a few seconds. To add more rows scroll to the bottom of the SpreadSheet and click on "Add" (you should have 10 000+ rows available in total).

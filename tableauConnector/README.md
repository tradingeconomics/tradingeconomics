Git clone in the directory where you want to download Tableau WDC:
git clone https://github.com/tableau/webdataconnector.git

Then git clone the TE API Connector:
git clone https://github.com/ieconomics/open-api.git
The folder "tableauConnector" should be copy/moved to directory "webdataconnector" (from the first clone), example: C:\git\webdataconnector

Change to the directory where you downloaded the repository (from this last clone), example: C:\git\webdataconnector
cd webdataconnector

Install dependencies with npm:
npm install --production
Note: You must run the command with administrator or sudo privileges.

Start the test web server:
npm start

Open a browser and navigate to the following URL:
http://localhost:8888/Simulator/index.html

Input in the Connector URL field the directory of "tradingeconomicsWDC.html" relative to the "Simulator" folder, example:
../tableauConnector/tradingeconomicsWDC.html

Press "Start Interactive Phase" button.
A Window pops up and the API Connector is ready to be used.

Official Tableau WDC docs: http://tableau.github.io/webdataconnector/docs/
Docs to use this with Tableau desktop application: http://tableau.github.io/webdataconnector/docs/wdc_use_in_tableau
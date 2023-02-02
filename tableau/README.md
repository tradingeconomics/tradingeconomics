Download Tableau desktop application: https://www.tableau.com/products/desktop/download

Open Command Prompt

    Git clone in the directory where you want to download Tableau Web Data Connector:
    > git clone https://github.com/tableau/webdataconnector.git

    Then git clone the TE API Connector:
    > git clone https://github.com/tradingeconomics/tradingeconomics.git

(Outside Command Prompt)
The folder "tableauConnector" should be copied to directory "webdataconnector" (from the first git clone), example: C:\git\webdataconnector

(Again in Command Prompt)

    Change to the directory where you downloaded the repository (from this last clone), example: C:\git\webdataconnector
    > cd webdataconnector

    Install dependencies with npm:
    > npm install --production
    Note: You must run the command with administrator or sudo privileges.

    Start the test web server:
    > npm start

Open Tableau desktop application. 
In "To a Server", click "More..." -> "Web data Connector". 
Then write in the adress bar: http://localhost:8888/tableauConnector/tradingeconomicsWDC.html
The API Connector is ready to be used.

Official Tableau Docs:
http://tableau.github.io/webdataconnector/docs/
http://tableau.github.io/webdataconnector/docs/wdc_use_in_tableau
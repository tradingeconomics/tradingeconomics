const te = require('tradingeconomics');
const http = require('http');
require('dotenv').config();
const apiKey = process.env.API_KEY;
te.login(apiKey);
data = te.getIndicatorData(country = 'mexico').then(function (data) {

  const port = 3000; // Port number to listen on

  const server = http.createServer((req, res) => {

    // Set the HTTP response header to indicate that we're sending HTML content
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Create an HTML string using template literals
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <title>TradingEconomics Interview Excercise</title>
        </head>
    <body>
        <h1 class="text-center text-danger">Display the countries data in table </h1>
        <table id="myHeading" class="container table table-striped table-bordered border-primary mt-2 text-center">
        <tr id="table-header">
          <th>Country</th>
          <th>Category</th>
          <th>Title</th>
          <th>LatestValueDate</th>
          <th>LatestValue</th>
          <th>Source</th>
          <th>SourceURL</th>
          <th>Unit</th>
          <th>URL</th>
          <th>CategoryGroup</th>
          <th>Adjustment</th>
          <th>Frequency</th>
          <th>HistoricalDataSymbol</th>
          <th>CreateDate</th>
          <th>FirstValueDate</th>
          <th>PreviousValue</th>
          <th>PreviousValueDate</th>
        </tr>
        <tbody id="table_data"></tbody>
        </table>
        <!-- Embed JavaScript within a <script> element -->
        <script>
        
            let dataArray=${JSON.stringify(data)};
           let tableData="";

            for (let i = 0; i < dataArray.length; i++) {
              const row = dataArray[i];
              tableData += \`
                <tr>
                  <td>\${row.Country?row.Country:"No data"}</td>
                  <td>\${row.Category?row.Category:"No data"}</td>
                  <td>\${row.Title?row.Title:"No data"}</td>
                  <td>\${row.LatestValueDate?row.LatestValueDate:"No data"}</td>
                  <td>\${row.LatestValue?row.LatestValue:"No data"}</td>
                  <td>\${row.Source?row.Source:"No data"}</td>
                  <td>\${row.SourceURL?row.SourceURL:"No data"}</td>
                  <td>\${row.Unit?row.Unit:"No data"}</td>
                  <td>\${row.URL?row.URL:"No data"}</td>
                  <td>\${row.CategoryGroup?row.CategoryGroup:"No data"}</td>
                  <td>\${row.Adjustment?row.Adjustment:"No data"}</td>
                  <td>\${row.Frequency?row.Frequency:"No data"}</td>
                  <td>\${row.HistoricalDataSymbol?row.HistoricalDataSymbol:"No data"}</td>
                  <td>\${row.CreateDate?row.CreateDate:"No data"}</td>
                  <td>\${row.FirstValueDate?row.FirstValueDate:"No data"}</td>
                  <td>\${row.PreviousValue?row.PreviousValue:"No data"}</td>
                  <td>\${row.PreviousValueDate?row.PreviousValueDate:"No data"}</td>
                </tr>\`;
            }
          
            document.getElementById("table_data").innerHTML=tableData;
     
    </script>
    </body>
    </html>
  `;

    // Send the HTML content as the response
    res.end(htmlContent);
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
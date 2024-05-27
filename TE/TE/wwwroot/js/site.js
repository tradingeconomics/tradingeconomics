// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var xmlhttp = new XMLHttpRequest();
var url = "https://api.tradingeconomics.com/historical/country/mexico/indicator/gdp?c=guest:guest&f=json";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
       // console.log(data)
        DateTime = data.map(function (elem) {
            var dateTimeString = elem.DateTime;
            var date = new Date(dateTimeString);
            var options = { year: 'numeric', month: 'short', day: 'numeric' };
            var formattedDate = date.toLocaleDateString(undefined, options);
            return formattedDate;

           // return elem.DateTime;
        })
       
        GDP = data.map(function (elem) {
            return elem.Value;
        })

       
       // console.log(GDP)
        const ctx = document.getElementById('canvas');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: DateTime,
                datasets: [{
                    label: 'GDP Trend',
                    data: GDP_1,
                    backgroundcolor: "#ff335e",
                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    x: {
                        
                    },
                    y: {
                        beginAtZero: true
                        s
                    }
                }
            }
        });


    }
       
}
   



 

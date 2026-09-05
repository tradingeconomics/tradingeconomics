

const loader = (val) => {
    let loaderDiv = $('.loader')
    if (val) {
        loaderDiv.show()

    } else {
        loaderDiv.hide()
    }
}

const getStockMarketData = async () => {
    const headerList = ['Symbol', 'Name', 'Country', 'day_low', 'day_high', 'CloseDate', 'Close']
    try {
        const res = await fetch('/api/seriesCode')
        const data = await res.json()
        const stockMarket = data.stockMarket
        const stockTableBody = document.getElementById('stockTableBody')

        stockMarket.forEach(stock => {
            const stockTableRow = document.createElement('tr')
            headerList.forEach((list) => {

                const stockTableData = document.createElement('td');
                if (list === "CloseDate") {
                    stockTableData.innerText = new Date(stock[list]).toLocaleDateString()
                } else {

                    stockTableData.innerText = stock[list]
                }
                stockTableData.classList.add('px-4', 'py-2', 'text-left', 'border-b')
                stockTableRow.appendChild(stockTableData);
            })
            stockTableBody.appendChild(stockTableRow);

        });


    } catch (error) {
        console.log(error)
    }
}



const fetchData = async (countries, dates) => {

    try {
        loader(true)
        const res = await fetch(`/api/indicator?country=${countries}&start_date=${dates ? dates[0] : ''}&end_date=${dates ? dates[1] : ''}`);

        const data = await res.json()
        loader(false)

        // Extract country names as labels
        const labels = Object.keys(data.fulldata);

        //add labels
        chart.data.labels = data.fulldata[labels[0]].map(item => (new Date(item.DateTime).getFullYear()))

        // Create datasets
        chart.data.datasets = labels.map((country, index) => ({
            label: `${country} GDP`, // Dataset label
            data: data.fulldata[country].map(entry => entry.Value),
            borderColor: `hsl(${index * 60}, 70%, 50%)`, // Generate unique colors
            fill: false,
            borderWidth: 2
        }));

        chart.update();

    } catch (error) {
        console.log("show error", error);

    }
}


$('.country').on('change', function () {
    const years = $('.years').val()
    const val = $(this).val()

    if (val.length <= 0) {
        return
    }
    if (years && years !== "all") {
        return fetchData(val, years.split(" "))
    }
    fetchData(val)

});

$('.years').on('change', function () {

    const val = $(this).val()
    const country = $('.country').val()

    if (val === "all") {
        return fetchData(country,)
    }
    fetchData(country, val.split(" "))


})

$(document).ready(function () {
    const country = $('.country').val()
    const years = $('.years').val()

    fetchData(country, years.split(" ")).then(() => {
        setTimeout(() => {
            getStockMarketData()
        }, 300)
    })

});




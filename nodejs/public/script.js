const selectFirstCountry = document.getElementById("fist-country")
const selectSecondCountry = document.getElementById("second-country")
const form = document.querySelector("form")
const firstCountry = document.querySelector("#fist-country")
const secondCountry = document.querySelector("#second-country")
const allCanvas = document.querySelectorAll("canvas")
const errorDisplayer = document.querySelector(".error-displayer")
const loading = document.querySelector(".loading")


const displayErrorMessage = (message) =>{
  errorDisplayer.textContent = message
  setTimeout(() =>{
    errorDisplayer.textContent = ""
  }, [3000])
}

const countryOption = async (containerSelection) =>{
    try {
        const response = await  fetch("/api/v1/allcontries")
        const data = await response.json();
        data.forEach(element => {
            const country = element.Country
            
            // Create a new option element
            const newOption = document.createElement('option');
            newOption.value = country.toLowerCase()
            newOption.text = country
            
            // Append the option to the select
            containerSelection.appendChild(newOption);
        })
    } catch (error) {
        // Display an error message
        displayErrorMessage("Something went wrong when trying to load the country. Try again later.")
    }
    
   
}
countryOption(selectFirstCountry)
countryOption(selectSecondCountry)

const buildChartBar = (chartContainer, labels, data,title) =>{
  new Chart(chartContainer, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

const compare = async() =>{
    axios.get('/api/v1/compare', { 
        params: { firstCountry: firstCountry.value, secondCountry: secondCountry.value } 
    })
    .then(response => {
        const data = response.data        
        const firstCountryData = data.firstCountryCategories
        const secondCountryData = data.secondCountryCategories        

        for(let i=0; i<4; i++){
            const firtContent = firstCountryData[i]
            const secondContent = secondCountryData[i]
            const labels = [firtContent["Country"], secondContent["Country"]]
            const dataToDisplay = [firtContent["LatestValue"], secondContent["LatestValue"]]
            buildChartBar(allCanvas[i], labels, dataToDisplay, firtContent["Category"])
        } 
        loading.style.display = "none" 
    })
    .catch(error => {
      loading.style.display = "none" 
      displayErrorMessage("Something has gone wrong. Check that your subscription package includes the selected countries.")
    });
    
}
const resetCanvas = () =>{
    errorDisplayer.textContent = ""
    allCanvas.forEach(element => {
        const existingChart = Chart.getChart(element.id);
        if (existingChart) {
            existingChart.destroy();
        }
    })   
}

form.addEventListener("submit", (e)=> {
    e.preventDefault()
    resetCanvas()
    loading.style.display = "block"
    compare() 
})
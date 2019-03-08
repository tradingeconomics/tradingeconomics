let introductionLi = document.getElementById('introductionLi');
let logginLi = document.getElementById('logginLi');
let methodsLi = document.getElementById('methodsLi');
let indicatorsLi = document.getElementById('indicatorsLi');
let historicalLi = document.getElementById('historicalLi');
let calendarLi = document.getElementById('calendarLi');
let marketsLi = document.getElementById('marketsLi');
let forecastsLi = document.getElementById('forecastsLi');
let refreshLi = document.getElementById('refreshLi');
let searchLi = document.getElementById('searchLi');

introductionLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#introduction'; }
logginLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#loggin'; }
methodsLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#methods'; }
indicatorsLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#indicators'; }
historicalLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#historical'; }
calendarLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#calendar'; }
marketsLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#markets'; }
forecastsLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#forecasts'; }
refreshLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#refresh'; }
searchLi.onclick = () => { window.location = 'excelTeAddInWebDocs.html#search'; }

let colorBlue = '#428bca';
    
function clearAllLiColors() {
    introductionLi.style.backgroundColor = 'transparent';
    logginLi.style.backgroundColor = 'transparent';
    methodsLi.style.backgroundColor = 'transparent';
    indicatorsLi.style.backgroundColor = 'transparent';
    historicalLi.style.backgroundColor = 'transparent';
    calendarLi.style.backgroundColor = 'transparent';
    marketsLi.style.backgroundColor = 'transparent';
    forecastsLi.style.backgroundColor = 'transparent';
    refreshLi.style.backgroundColor = 'transparent';
    searchLi.style.backgroundColor = 'transparent';
}

$('#contentContainer').scroll(() => { 
    clearAllLiColors()
    if($('#introduction').position().top <= 0) {
        clearAllLiColors()
        introductionLi.style.backgroundColor = colorBlue;
    }
    if($('#loggin').position().top <= 0) {
        clearAllLiColors()
        logginLi.style.backgroundColor = colorBlue;
    }
    if($('#methods').position().top <= 0) {
        clearAllLiColors()
        methodsLi.style.backgroundColor = colorBlue;
    }
    if($('#indicators').position().top <= 0) {
        clearAllLiColors()
        indicatorsLi.style.backgroundColor = colorBlue;
    }
    if($('#historical').position().top <= 0) {
        clearAllLiColors()
        historicalLi.style.backgroundColor = colorBlue;
    }
    if($('#calendar').position().top <= 0) {
        clearAllLiColors()
        calendarLi.style.backgroundColor = colorBlue;
    }
    if($('#markets').position().top <= 0) {
        clearAllLiColors()
        marketsLi.style.backgroundColor = colorBlue;
    }
    if($('#forecasts').position().top <= 0) {
        clearAllLiColors()
        forecastsLi.style.backgroundColor = colorBlue;
    }
    if($('#refresh').position().top <= 0) {
        clearAllLiColors()
        refreshLi.style.backgroundColor = colorBlue;
    }
    if($('#search').position().top <= 0) {
        clearAllLiColors()
        searchLi.style.backgroundColor = colorBlue;
    }
})

introductionLi.onmouseover = () => { introductionLi.style.backgroundColor = '#666'; }
introductionLi.onmouseleave  = () => { 
    introductionLi.style.backgroundColor = 'transparent'; 
    if($('#introduction').position().top <= 0 && $('#loggin').position().top >= 0) {
        clearAllLiColors()
        introductionLi.style.backgroundColor = colorBlue;
    }
}
logginLi.onmouseover = () => { logginLi.style.backgroundColor = '#666'; }
logginLi.onmouseleave  = () => { 
    logginLi.style.backgroundColor = 'transparent'; 
    if($('#loggin').position().top <= 0 && $('#methods').position().top >= 0) {
        clearAllLiColors()
        logginLi.style.backgroundColor = colorBlue;
    }
}
methodsLi.onmouseover = () => { methodsLi.style.backgroundColor = '#666'; }
methodsLi.onmouseleave  = () => { 
    methodsLi.style.backgroundColor = 'transparent'; 
    if($('#methods').position().top <= 0 && $('#indicators').position().top >= 0) {
        clearAllLiColors()
        methodsLi.style.backgroundColor = colorBlue;
    }
}
indicatorsLi.onmouseover = () => { indicatorsLi.style.backgroundColor = '#666'; }
indicatorsLi.onmouseleave  = () => { 
    indicatorsLi.style.backgroundColor = 'transparent'; 
    if($('#indicators').position().top <= 0 && $('#historical').position().top >= 0) {
        clearAllLiColors()
        indicatorsLi.style.backgroundColor = colorBlue;
    }
}
historicalLi.onmouseover = () => { historicalLi.style.backgroundColor = '#666'; }
historicalLi.onmouseleave  = () => { 
    historicalLi.style.backgroundColor = 'transparent'; 
    if($('#historical').position().top <= 0 && $('#calendar').position().top >= 0) {
        clearAllLiColors()
        historicalLi.style.backgroundColor = colorBlue;
    }
}
calendarLi.onmouseover = () => { calendarLi.style.backgroundColor = '#666'; }
calendarLi.onmouseleave  = () => { 
    calendarLi.style.backgroundColor = 'transparent'; 
    if($('#calendar').position().top <= 0 && $('#markets').position().top >= 0) {
        clearAllLiColors()
        calendarLi.style.backgroundColor = colorBlue;
    }
}
calendarLi.onmouseover = () => { calendarLi.style.backgroundColor = '#666'; }
calendarLi.onmouseleave  = () => { 
    calendarLi.style.backgroundColor = 'transparent'; 
    if($('#calendar').position().top <= 0 && $('#markets').position().top >= 0) {
        clearAllLiColors()
        calendarLi.style.backgroundColor = colorBlue;
    }
}
marketsLi.onmouseover = () => { marketsLi.style.backgroundColor = '#666'; }
marketsLi.onmouseleave  = () => { 
    marketsLi.style.backgroundColor = 'transparent'; 
    if($('#markets').position().top <= 0 && $('#forecasts').position().top >= 0) {
        clearAllLiColors()
        marketsLi.style.backgroundColor = colorBlue;
    }
}
forecastsLi.onmouseover = () => { forecastsLi.style.backgroundColor = '#666'; }
forecastsLi.onmouseleave  = () => { 
    forecastsLi.style.backgroundColor = 'transparent'; 
    if($('#forecasts').position().top <= 0 && $('#refresh').position().top >= 0) {
        clearAllLiColors()
        forecastsLi.style.backgroundColor = colorBlue;
    }
}
refreshLi.onmouseover = () => { refreshLi.style.backgroundColor = '#666'; }
refreshLi.onmouseleave  = () => { 
    refreshLi.style.backgroundColor = 'transparent'; 
    if($('#refresh').position().top <= 0 && $('#search').position().top >= 0) {
        clearAllLiColors()
        refreshLi.style.backgroundColor = colorBlue;
    }
}
searchLi.onmouseover = () => { searchLi.style.backgroundColor = '#666'; }
searchLi.onmouseleave  = () => { 
    searchLi.style.backgroundColor = 'transparent'; 
    if($('#search').position().top <= 0) {
        clearAllLiColors()
        searchLi.style.backgroundColor = colorBlue;
    }
}
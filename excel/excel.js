let installationLi = document.getElementById('installationLi');
let loginLi = document.getElementById('loginLi');
let methodsLi = document.getElementById('methodsLi');
let indicatorsLi = document.getElementById('indicatorsLi');
let historicalLi = document.getElementById('historicalLi');
let calendarLi = document.getElementById('calendarLi');
let marketsLi = document.getElementById('marketsLi');
let forecastsLi = document.getElementById('forecastsLi');
let refreshLi = document.getElementById('refreshLi');
let searchLi = document.getElementById('searchLi');

installationLi.onclick = () => { window.location = 'index.html#installation'; }
loginLi.onclick = () => { window.location = 'index.html#login'; }
methodsLi.onclick = () => { window.location = 'index.html#methods'; }
indicatorsLi.onclick = () => { window.location = 'index.html#indicators'; }
historicalLi.onclick = () => { window.location = 'index.html#historical'; }
calendarLi.onclick = () => { window.location = 'index.html#calendar'; }
marketsLi.onclick = () => { window.location = 'index.html#markets'; }
forecastsLi.onclick = () => { window.location = 'index.html#forecasts'; }
refreshLi.onclick = () => { window.location = 'index.html#refresh'; }
searchLi.onclick = () => { window.location = 'index.html#search'; }

let colorBlue = '#428bca';
    
function clearAllLiColors() {
    installationLi.style.backgroundColor = 'transparent';
    loginLi.style.backgroundColor = 'transparent';
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
    if($('#installation').position().top <= 0) {
        clearAllLiColors()
        installationLi.style.backgroundColor = colorBlue;
    }
    if($('#login').position().top <= 0) {
        clearAllLiColors()
        loginLi.style.backgroundColor = colorBlue;
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

installationLi.onmouseover = () => { installationLi.style.backgroundColor = '#666'; }
installationLi.onmouseleave  = () => { 
    installationLi.style.backgroundColor = 'transparent'; 
    if($('#installation').position().top <= 0 && $('#login').position().top >= 0) {
        clearAllLiColors()
        installationLi.style.backgroundColor = colorBlue;
    }
}
loginLi.onmouseover = () => { loginLi.style.backgroundColor = '#666'; }
loginLi.onmouseleave  = () => { 
    loginLi.style.backgroundColor = 'transparent'; 
    if($('#login').position().top <= 0 && $('#methods').position().top >= 0) {
        clearAllLiColors()
        loginLi.style.backgroundColor = colorBlue;
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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

$('downloadLink').click(() => {
    ga('send', 'event', 'Data Request', 'Excel-Download');
    window.location = 'https://github.com/ieconomics/open-api/raw/master/Excel/All_Releases/ExcelAddInDeploy_latest.msi';
    return;
});
let installationLi = document.getElementById('installationLi');
let connectionLi = document.getElementById('connectionLi');
let methodsLi = document.getElementById('methodsLi');
let indicatorsLi = document.getElementById('indicatorsLi');
let calendarLi = document.getElementById('calendarLi');
let forecastLi = document.getElementById('forecastLi');
let marketsLi = document.getElementById('marketsLi');
let earningsLi = document.getElementById('earningsLi');
let infoInputsLi = document.getElementById('infoInputsLi');
let apiKeyLi = document.getElementById('apiKeyLi');

//Go to the Categorie Selected in Web Page
installationLi.onclick = () => { window.location = 'index.html#installation'; }
connectionLi.onclick = () => { window.location = 'index.html#connection'; }
methodsLi.onclick = () => { window.location = 'index.html#methods'; }
indicatorsLi.onclick = () => { window.location = 'index.html#indicators'; }
calendarLi.onclick = () => { window.location = 'index.html#calendar'; }
forecastLi.onclick = () => { window.location = 'index.html#forecast'; }
marketsLi.onclick = () => { window.location = 'index.html#markets'; }
earningsLi.onclick = () => { window.location = 'index.html#earnings'; }
infoInputsLi.onclick = () => { window.location = 'index.html#infoInputs'; }
apiKeyLi.onclick = () => { window.location = 'index.html#apiKey'; }

let colorBlue = '#428bca';
    
function clearAllLiColors() {
    installationLi.style.backgroundColor = 'transparent';
    connectionLi.style.backgroundColor = 'transparent';
    methodsLi.style.backgroundColor = 'transparent';
    indicatorsLi.style.backgroundColor = 'transparent';
    calendarLi.style.backgroundColor = 'transparent';
    forecastLi.style.backgroundColor = 'transparent';
    marketsLi.style.backgroundColor = 'transparent';
    earningsLi.style.backgroundColor = 'transparent';
    infoInputsLi.style.backgroundColor = 'transparent';
    apiKeyLi.style.backgroundColor = 'transparent';
}

//On scroll checks which categorie should be highlighted in the #mainMenu
$('#contentContainer').scroll(() => { 
    clearAllLiColors()
    if($('#installation').position().top <= 0) {
        clearAllLiColors()
        installationLi.style.backgroundColor = colorBlue;
    }
    if($('#connection').position().top <= 0) {
        clearAllLiColors()
        connectionLi.style.backgroundColor = colorBlue;
    }
    if($('#methods').position().top <= 0) {
        clearAllLiColors()
        methodsLi.style.backgroundColor = colorBlue;
    }
    if($('#indicators').position().top <= 0) {
        clearAllLiColors()
        indicatorsLi.style.backgroundColor = colorBlue;
    }
    if($('#calendar').position().top <= 0) {
        clearAllLiColors()
        calendarLi.style.backgroundColor = colorBlue;
    }
    if($('#forecast').position().top <= 0) {
        clearAllLiColors()
        forecastLi.style.backgroundColor = colorBlue;
    }
    if($('#markets').position().top <= 0) {
        clearAllLiColors()
        marketsLi.style.backgroundColor = colorBlue;
    }
    if($('#earnings').position().top <= 0) {
        clearAllLiColors()
        earningsLi.style.backgroundColor = colorBlue;
    }
    if($('#infoInputs').position().top <= 0) {
        clearAllLiColors()
        infoInputsLi.style.backgroundColor = colorBlue;
    }
    if($('#apiKey').position().top <= 0) {
        clearAllLiColors()
        apiKeyLi.style.backgroundColor = colorBlue;
    }
})

//On mouse leave highlights the categorie back to colorBlue (otherwise would lose it's hightlight)
installationLi.onmouseover = () => { installationLi.style.backgroundColor = '#666'; }
installationLi.onmouseleave  = () => { 
    installationLi.style.backgroundColor = 'transparent'; 
    if($('#installation').position().top <= 0 && $('#connection').position().top >= 0) {
        clearAllLiColors()
        installationLi.style.backgroundColor = colorBlue;
    }
}
connectionLi.onmouseover = () => { connectionLi.style.backgroundColor = '#666'; }
connectionLi.onmouseleave  = () => { 
    connectionLi.style.backgroundColor = 'transparent'; 
    if($('#connection').position().top <= 0 && $('#methods').position().top >= 0) {
        clearAllLiColors()
        connectionLi.style.backgroundColor = colorBlue;
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
    if($('#indicators').position().top <= 0 && $('#calendar').position().top >= 0) {
        clearAllLiColors()
        indicatorsLi.style.backgroundColor = colorBlue;
    }
}
calendarLi.onmouseover = () => { calendarLi.style.backgroundColor = '#666'; }
calendarLi.onmouseleave  = () => { 
    calendarLi.style.backgroundColor = 'transparent'; 
    if($('#calendar').position().top <= 0 && $('#forecast').position().top >= 0) {
        clearAllLiColors()
        calendarLi.style.backgroundColor = colorBlue;
    }
}
forecastLi.onmouseover = () => { forecastLi.style.backgroundColor = '#666'; }
forecastLi.onmouseleave  = () => { 
    forecastLi.style.backgroundColor = 'transparent'; 
    if($('#forecast').position().top <= 0 && $('#markets').position().top >= 0) {
        clearAllLiColors()
        forecastLi.style.backgroundColor = colorBlue;
    }
}
marketsLi.onmouseover = () => { marketsLi.style.backgroundColor = '#666'; }
marketsLi.onmouseleave  = () => { 
    marketsLi.style.backgroundColor = 'transparent'; 
    if($('#markets').position().top <= 0 && $('#earnings').position().top >= 0) {
        clearAllLiColors()
        marketsLi.style.backgroundColor = colorBlue;
    }
}
earningsLi.onmouseover = () => { earningsLi.style.backgroundColor = '#666'; }
earningsLi.onmouseleave  = () => { 
    earningsLi.style.backgroundColor = 'transparent'; 
    if($('#earnings').position().top <= 0 && $('#infoInputs').position().top >= 0) {
        clearAllLiColors()
        earningsLi.style.backgroundColor = colorBlue;
    }
}
infoInputsLi.onmouseover = () => { infoInputsLi.style.backgroundColor = '#666'; }
infoInputsLi.onmouseleave  = () => { 
    infoInputsLi.style.backgroundColor = 'transparent'; 
    if($('#infoInputs').position().top <= 0 && $('#apiKey').position().top >= 0) {
        clearAllLiColors()
        infoInputsLi.style.backgroundColor = colorBlue;
    }
}
apiKeyLi.onmouseover = () => { apiKeyLi.style.backgroundColor = '#666'; }
apiKeyLi.onmouseleave  = () => { 
    apiKeyLi.style.backgroundColor = 'transparent'; 
    if($('#apiKey').position().top <= 0) {
        clearAllLiColors()
        apiKeyLi.style.backgroundColor = colorBlue;
    }
}

//Setting #mainMenu visibility for mobile devices; Click the burger to show the menu, click back to hide
$('#burger').click(() => {
    if ($('#mainMenu').css('visibility') == 'hidden' ) { 
        $('#mainMenu').css('visibility','visible');
    }
    else {
        $('#mainMenu').css('visibility','hidden');
    }
})

//Hide #mainMenu on click on outside de #mainMenu area (only on "mobile")
$('#contentContainer').click(() => {
    if(window.innerWidth < 790) {
        $('#mainMenu').css('visibility','hidden');
    }
})

//When user arrives on the web page if he is on a small screen hide #mainMenu
if(window.innerWidth < 790) { $('#mainMenu').css('visibility','hidden'); }

//On resize to "mobile" hide #mainMenu; On resize to "desktop" show #mainMenu
window.onresize = () => {
    if(window.innerWidth > 790) {
        $('#mainMenu').css('visibility','visible');
    }
    if(window.innerWidth <= 790) {
        $('#mainMenu').css('visibility','hidden');
    }
}
let installationLi = document.getElementById('installationLi');
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
methodsLi.onclick = () => { window.location = 'index.html#methods'; }
indicatorsLi.onclick = () => { window.location = 'index.html#indicators'; }
calendarLi.onclick = () => { window.location = 'index.html#calendar'; }
forecastLi.onclick = () => { window.location = 'index.html#forecast'; }
marketsLi.onclick = () => { window.location = 'index.html#markets'; }
earningsLi.onclick = () => { window.location = 'index.html#earnings'; }
infoInputsLi.onclick = () => { window.location = 'index.html#infoInputs'; }
apiKeyLi.onclick = () => { window.location = 'index.html#apiKey'; }

let colorBlue = '#185aa9';
    
function clearAllLiColors() {
    installationLi.style.backgroundColor = 'transparent';
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
    //Setting sub categories of #methods visibility
    if($('#methods').position().top <= 0 && $('#infoInputs').position().top >= 0) {
        insideMethods = true;
        $('#mainMenu ul ul').css('height','142px');
    }
    else {
        $('#mainMenu ul ul').css('height','0px');
        insideMethods = false;
    }
})

//Sub categories of #methods are hidden by default
$('#mainMenu ul ul').css('height','0px');

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
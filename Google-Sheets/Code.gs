function urlToJson(url) {

    Logger.log('Getting Json')
    Logger.log('Url: ' + url)
    
    try {
        var _url = UrlFetchApp.fetch(url)
        var json = JSON.parse(_url)
    }
    catch(e) {
        Logger.log(e)
    }
    
    printData(json)
    
    return 'hidden'
}

function printData(json) {

    Logger.log('Printing Data')

    //Getting GSheets Context
    var app = SpreadsheetApp
    var ss = app.getActiveSpreadsheet()
    var activeSs = ss.getActiveSheet()


    //Arrays Used to Separate Cell's Letters From Numbers
    var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    var checkIfIsNumber = [0,1,2,3,4,5,6,7,8,9]
    
    
    //Getting Current Selected Cell
    var selectedCell = activeSs.getSelection().getCurrentCell().getA1Notation()
    var selectedCellString = String(selectedCell)
    
    
    //Getting Each Character of the Selected Cell String
    i = 0
    var characters = []
    var runWhile = true
    while(runWhile) {
        if (selectedCellString.charAt(i)) {
            characters[i] = selectedCellString.charAt(i)
            Logger.log('Characters: ' + characters[i])
            i++
        }
        else {
            runWhile = false
        }
    }
    
    
    //Storing Value of Selected Cell, Splitting the Aphabetical Part From the Numeric Part
    var charToNumber = ''
    var numToNum = []
    for(var i in characters) {
        
        for(var j in alphabet) {
            
            if(alphabet[j] == characters[i]) {
                Logger.log('Same Character: ' + alphabet[j])
                charToNumber += alphabet[j]
            } 
            else if (checkIfIsNumber[j] == characters[i]) {
                Logger.log('Same Number: ' + checkIfIsNumber[j])
                numToNum[i] = checkIfIsNumber[j]
            }
        }
    }
    
    
    //Storing Letters of the Selected Cell
    function letterToColumn(letter)
    {
        var column = 0, length = letter.length
        for (var i = 0; i < length; i++)
        {
          column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1)
        }
        return column
    }
    
    var i1 = letterToColumn(charToNumber)
    Logger.log('i1: ' + i1)
    
    for(var i in json) {
    
        //Storing Numeric Part of the Selected Cell
        var i2 = ''
        for(var num in numToNum) {
            i2 += numToNum[num]
        }
        Logger.log('i2: ' + i2)
        
        //Printing Headers
        for(var header in json[0]) {
            
            activeSs.getRange(i2, i1).setValue(header)
            i1++
        }
        
        //Printing Data
        for(var i in json)
        {
            var _i1 = letterToColumn(charToNumber)
            i2++
            for(var j in json[i]) {
                
                activeSs.getRange(i2, _i1).setValue(json[i][j])
                _i1++
            }
        }
        return
    }
}

function openHtml() {
    Logger.log('Opening HTML')

    var html = HtmlService.createHtmlOutputFromFile('forms.html').setTitle('Trading Economics')
    SpreadsheetApp.getUi().showSidebar(html)
}

function onOpen(e) {
    var ui = SpreadsheetApp.getUi()
    ui.createMenu('TE')
      .addItem('Show Sidebar', 'openHtml')
    .addToUi()
}

function onInstall(e) {
    onOpen(e)
}
function urlToJson(url) {
  Logger.log('Getting Json')
  
  try {
    Logger.log('Url: ' + url)

    if (typeof url !== 'string' || !url.startsWith('https://api.tradingeconomics.com')) {
      Logger.log('Invalid URL rejected: ' + url)
      SpreadsheetApp.getUi().alert('An error occurred. Invalid request URL.')
      return 'hidden'
    }
    
    try {
      var _url = UrlFetchApp.fetch(url)
      var json = JSON.parse(_url)
      }
    catch(e) {
      Logger.log(e)
      SpreadsheetApp.getUi().alert('An error occurred. Your API key could be wrong or you might not have permissions to do this request. \n If you do not have an API key yet, you can get one here: https://developer.tradingeconomics.com')
      return 'hidden'
    }
    
    printData(json)
    
    return 'hidden'
  }
  catch(e) {
    Logger.log(e)
    SpreadsheetApp.getUi().alert('An error occurred. Please try again.')
    return 'hidden'
  }
}

function printData(json) {
  Logger.log('Printing Data')
  
  try {
 
    if(json == null || json == undefined || json == "" || json == "[]" || json == "{}") {
      SpreadsheetApp.getUi().alert('An error occurred. We have no data for that request.')
      return
    }
    
    //Getting GSheets Context
    var app = SpreadsheetApp
    var ss = app.getActiveSpreadsheet()
    var activeSs = ss.getActiveSheet()

    //Getting Current Selected Cell
    var currentCell = activeSs.getSelection().getCurrentCell()
    var startRow = currentCell.getRow()
    var startCol = currentCell.getColumn()
    Logger.log('Start row: ' + startRow + ', Start col: ' + startCol)

    //Building headers and data rows
    var headers = Object.keys(json[0])
    var data = json.map(function(row) {
      return headers.map(function(h) { return row[h] !== undefined ? row[h] : '' })
    })

    //Writing headers + data in a single batch call
    var output = [headers].concat(data)
    activeSs.getRange(startRow, startCol, output.length, headers.length).setValues(output)
    Logger.log('Data written: ' + output.length + ' rows x ' + headers.length + ' columns')
  }
  catch(e) {
    Logger.log(e)
    SpreadsheetApp.getUi().alert('An error occurred. Please try again.')
    return
  }
}

function openHtml() {
  Logger.log('Opening HTML')
  
  try {
    var html = HtmlService.createHtmlOutputFromFile('index.html').setTitle('Trading Economics')
    SpreadsheetApp.getUi().showSidebar(html)
  }
  catch(e) {
    Logger.log(e)
  }
}

function openSearch(){
  try {
    let html = HtmlService.createHtmlOutputFromFile('search.html')
    html.setWidth(600)
    html.setHeight(400)
    SpreadsheetApp.getUi().showModalDialog(html, 'Search')
  }
  catch(e) {
    Logger.log(e)
  }
}

function onOpen(e) {
  try {
    Logger.log('JS testing')
    var ui = SpreadsheetApp.getUi()
    ui.createMenu('TE')
    .addItem('Get Data', 'openHtml')
    .addToUi()
  }
  catch(e) {
    Logger.log(e)
  }
}

function onInstall(e) {
  onOpen(e)
}

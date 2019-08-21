const auth = require('./auth.js');
const news = require('./news.js');
const wb = require('./worldBank.js');
const rating = require('./ratings.js');
const hist = require('./historical.js');
const indic = require('./indicators.js');
const article = require('./articles.js');
const calendar = require('./calendar.js');
const comtrade = require('./comtrade.js');
const earnings = require('./earnings.js');
const forecast = require('./forecasts.js');
const fred = require('./federalReserve.js');
const wb_hist = require('./wbHistorical.js');
const update = require('./latestUpdates.js');
const market_snap = require('./marketSnap.js');
const market_intra = require('./marketIntraday.js');
const market_hist = require('./marketHistorical.js');


exports.auth = function() {

   return auth;
}
exports.ratings = function() {

    return rating;
}

exports.articles = function() {

    return article;
}
exports.calendar = function() {

    return calendar;
}
exports.comtrade = function() {

    return comtrade;
}
exports.earnings = function() {

    return earnings;
}
exports.indicators = function() {

    return indic;
}
exports.federalReserve = function() {

    return fred;
}
exports.forecasts = function() {

    return forecast;
}
exports.historical = function() {

    return hist;
}
exports.LatestUpdates = function() {

    return update;
}
exports.HistoricalMarkert = function() {

    return market_hist;
}
exports.IntradayMarkert = function() {

    return market_intra;
}
exports.MarkertSnap = function() {

    return market_snap;
}
exports.news = function() {

    return news;
}
exports.HistoricalWB = function() {

    return wb_hist;
}
exports.worldBank = function() {

    return wb;
}
    
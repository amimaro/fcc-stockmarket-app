const Controller = require('../../lib/controller');
const stock = require('./facade');
var rp = require('request-promise');

const stockApi = 'https://www.alphavantage.co/query?';
const timeframe = {
  m1: 'function=TIME_SERIES_INTRADAY&interval=1min&apikey=' + process.env.STOCK_KEY + '&symbol=',
  m5: 'function=TIME_SERIES_INTRADAY&interval=5min&apikey=' + process.env.STOCK_KEY + '&symbol=',
  m15: 'function=TIME_SERIES_INTRADAY&interval=15min&apikey=' + process.env.STOCK_KEY + '&symbol=',
  m30: 'function=TIME_SERIES_INTRADAY&interval=30min&apikey=' + process.env.STOCK_KEY + '&symbol=',
  h1: 'function=TIME_SERIES_INTRADAY&interval=60min&apikey=' + process.env.STOCK_KEY + '&symbol=',
  d1: 'function=TIME_SERIES_DAILY&apikey=' + process.env.STOCK_KEY + '&symbol=',
  w1: 'function=TIME_SERIES_WEEKLY&apikey=' + process.env.STOCK_KEY + '&symbol=',
  mn: 'function=TIME_SERIES_MONTHLY&apikey=' + process.env.STOCK_KEY + '&symbol='
};

class Stock extends Controller {

  stockTimeSeries(req, res, next) {
    let url = stockApi + timeframe[req.params.interval] + req.params.symbol;
    console.log(url);
    rp(url)
    .then(function (data) {
        console.log(data);
        res.status(200).json(JSON.parse(data));
    })
    .catch(function (err) {
        console.error(err);
        res.sendStatus(404);
    });
  }

}

module.exports = new Stock(stock);

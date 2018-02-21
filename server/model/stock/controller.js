const Controller = require('../../lib/controller');
const stock = require('./facade');

class Stock extends Controller {}

module.exports = new Stock(stock);

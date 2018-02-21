const Facade = require('../../lib/facade');
const stock = require('./schema');

class Stock extends Facade {}

module.exports = new Stock(stock);

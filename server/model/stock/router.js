const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/:interval/:symbol')
  .get((...args) => controller.stockTimeSeries(...args));

module.exports = router;

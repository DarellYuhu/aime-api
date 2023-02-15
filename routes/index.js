var express = require('express');
var router = express.Router();
const firebase = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(firebase);
});

module.exports = router;

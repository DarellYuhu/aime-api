var express = require('express');
var router = express.Router();
var newsController = require('../controllers/news.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: 'Welcome to the Aime API' });
});

router.get('/press-release', newsController.getPressRelease);
router.get('/news', newsController.getNews);

module.exports = router;

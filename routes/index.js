var express = require('express');
var router = express.Router();
var newsController = require('../controllers/news.controller');
var destinationController = require('../controllers/destination.controller');
var userController = require('../controllers/user.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: 'Welcome to the Aime API' });
});

router.get('/press-release', newsController.getPressRelease);
router.get('/news', newsController.getNews);
router.get('/destination', destinationController.get);
router.post('/destination/check', destinationController.check);
router.get('/destination/history/:uuid', destinationController.history);
router.post('/user', userController.create);
router.get('/user/:uuid', userController.get);
router.get('/user', userController.getAll);

module.exports = router;

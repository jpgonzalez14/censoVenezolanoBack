var express = require('express');
var PersonController = require('../controllers/person');
var router = express.Router();

var auth = require('../middlewares/authenticated');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;

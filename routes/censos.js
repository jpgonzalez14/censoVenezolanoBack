var express = require('express');
var CensoController = require('../controllers/censo');
var router = express.Router();

var auth = require('../middlewares/authenticated');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;

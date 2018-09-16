var express = require('express');
var CensoController = require('../controllers/censo');
var router = express.Router();




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/censo', CensoController.saveCenso);
router.get('/listcensos', CensoController.getCensos)


module.exports = router;

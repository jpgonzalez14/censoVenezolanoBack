var express = require('express');
var UserController = require('../controllers/user');
var router = express.Router();

router.get('/controlador', UserController.prueba);
router.post('/register', UserController.saveUser);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/prueba', function(req, res, next) {
  res.status(200).send({
    message: 'probando hfkjhdfksjhkjshfshfhksjhfjkshfwhfdbvhiubkjhfreh'
  });
});

module.exports = router;

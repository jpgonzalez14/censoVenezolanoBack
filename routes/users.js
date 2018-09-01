var express = require('express');
var UserController = require('../controllers/user');
var router = express.Router();

router.get('/controlador', UserController.prueba);
router.post('/register', UserController.saveUser);
router.post('/login', UserController.login);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;

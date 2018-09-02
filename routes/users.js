var express = require('express');
var UserController = require('../controllers/user');
var router = express.Router();

var auth = require('../middlewares/authenticated');

router.get('/controlador', auth.ensureAuth, UserController.prueba);
router.get('/getUsers', UserController.getUsers);
router.put('/update/:id', auth.ensureAuth, UserController.updateUser);
router.post('/register', UserController.saveUser);
router.post('/login', UserController.login);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;

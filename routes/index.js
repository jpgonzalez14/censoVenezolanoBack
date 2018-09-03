'use strict'
var express = require('express');
var mongoose = require('mongoose');
//var app = require('../app');
var router = express.Router();

//var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://jpgonzalez14:juAnpAblog1234@ds237922.mlab.com:37922/heroku_4zkldxjp', {useNewUrlParser: true}).then(()=>{

  console.log('La conexion a la base de datos se realizo correctamente');
  // CREAR EL SERVIDOR WEB CON NODEJS
  //app.listen(port, () => {
  //    console.log("servidor corriendo en http://localhost:3800");
  //});

}).catch(err=>console.log(err));

//middleweare for ajax
 router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  res.header('Allow', 'GET, POST, OPTIONS, DELETE, PUT');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

module.exports = router;

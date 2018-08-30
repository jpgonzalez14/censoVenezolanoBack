'use strict'
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://jpgonzalez14:juAnpAblog1234@ds237922.mlab.com:37922/heroku_4zkldxjp', {useNewUrlParser: true}).then(()=>{

  console.log('La conexion a la base de datos se realizo correctamente');

}).catch(err=>console.log(err));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

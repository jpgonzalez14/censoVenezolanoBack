'use strict'
var express = require('express');
var express = require('mongoose');
var router = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/censo', {useMongoClient: true}).then(()=>{

  console.log('La conexion a la base de datos se realizo correctamente');

}).catch(err=>console.log(err));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

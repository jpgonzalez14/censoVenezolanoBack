'use strict'

//models
var Censo = require('../models/censo');
var Person = require('../models/person');


function saveCenso(req, res) {
  //create object censo
  var censo = new Censo();
  //user params
  var params = req.body;


  Person.findOne({id: params.person}, (err,isPerson)=>{
    if (err) {
      res.status(500).send({
        message: 'error al comprobar el usuario'
      });
    } else {
      if (isPerson) {

        if (params.edad && params.queHace && params.untimoNivelDeEstudio && params.profesion && params.enfermedadesCronicas && params.ingresos && params.fechaIngreso) {
          //asign params to censo object
          censo.edad = params.edad;
          censo.queHace = params.queHace;
          censo.untimoNivelDeEstudio = params.untimoNivelDeEstudio;
          censo.profesion = params.profesion;
          censo.enfermedadesCronicas = params.enfermedadesCronicas;
          censo.ingresos = params.ingresos;
          censo.fechaIngreso = params.fechaIngreso;
          censo.person = isPerson._id;


          //save censo in database
          censo.save((err, censoStored) => {
            if (err) {
              res.status(500).send({
                message: 'error al guardar el censo'
              });
            } else {
              if (!censoStored) {
                res.status(404).send({
                  message: 'no se ha registrado la persona'
                });
              } else {
                res.status(200).send({
                  censo: censoStored
                });
              }
            }
          });

        } else {
          res.status(200).send({
            message: 'No ingreso todos los datos'
          });
        }

      } else {
        res.status(500).send({
          message: 'no existe esa persona'
        });
      }
    }
  });


};





  //export objects
  module.exports = {
    saveCenso
  };

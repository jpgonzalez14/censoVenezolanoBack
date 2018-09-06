'use strict'

//models
var Censo = require('../models/censo');


function saveCenso(req, res) {
  //create object censo
  var censo = new Censo();
  //user params
  var params = req.body;

  if (params.edad && params.queHace && params.untimoNivelDeEstudio && params.profesion && params.enfermedadesCronicas && params.ingresos && params.fechaIngreso) {
    //asign params to censo object
    censo.edad = params.edad;
    censo.queHace = params.queHace;
    censo.untimoNivelDeEstudio = params.untimoNivelDeEstudio;
    censo.profesion = params.profesion;
    censo.enfermedadesCronicas = params.enfermedadesCronicas;
    censo.ingresos = params.ingresos;
    censo.fechaIngreso = params.fechaIngreso;
    censo.person = params.edad;
    censo.edad = req.user.sub;


    //save Person in database
    censo.save((err, censoStored) => {
      if (err) {
        res.status(500).send({
          message: 'error al guardar la persona'
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
};





  //export objects
  module.exports = {
    saveCenso
  };

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

        if (params.edad && params.queHace && params.educacion && params.profesion && params.enfermedades && params.ingresos && params.fechaIngreso && params.ciudad && params.pais) {
          //asign params to censo object
          censo.edad = params.edad;
          censo.queHace = params.queHace;
          censo.educacion = params.educacion;
          censo.profesion = params.profesion;
          censo.enfermedades = params.enfermedades;
          censo.ingresos = params.ingresos;
          censo.fechaIngreso = params.fechaIngreso;
          censo.pais = params.pais;
          censo.ciudad = params.ciudad;
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

function getCensos(req, res){
  Censo.find({}).exec((err, censos)=>{
    if (err) {
      res.status(500).send({message: 'error al pedir lista de censos'});
    } else {
      if (!censos) {
        res.status(404).send({message: 'no hay censos'});

      } else {
        res.status(200).send({censos});
      }
    }
  });
}





  //export objects
  module.exports = {
    saveCenso,
    getCensos
  };

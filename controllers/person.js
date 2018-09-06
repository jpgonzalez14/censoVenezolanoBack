'use strict'

//models
var Person = require('../models/person');

//jwt service
var jwt = require('../services/jwt');


function savePerson(req, res) {
  //create object person
  var person = new Person();
  //user params
  var params = req.body;

  if (params.name && params.id) {
    //asign params to user object
    person.name = params.name;
    person.id = params.id;
    person.email = params.email;
    person.phone = params.phone;

    Person.findOne({id: person.id}, (err,isPerson)=>{
      if (err) {
        res.status(500).send({
          message: 'error al comprobar el usuario'
        });
      } else {
        if (!isPerson) {
            //save Person in database
            person.save((err, personStored) => {
              if (err) {
                res.status(500).send({
                  message: 'error al guardar la persona'
                });
              } else {
                if (!personStored) {
                  res.status(404).send({
                    message: 'no se ha registrado la persona'
                  });
                } else {
                  res.status(200).send({
                    person: personStored
                  });
                }
              }
            });
        } else {
          res.status(200).send({
            message: 'ya existe una persona con ese id'
          });
        }
      }
    });
  } else {
    res.status(200).send({
      message: 'verifique que envio todos los datos correctamente'
    });
  }
}


function getPersons(req, res){
  console.log('prueba');
  Person.find({}).exec((err, persons)=>{
    if (err) {
      res.status(500).send({message: 'error al pedir lista de usuarios'});
    } else {
      if (!persons) {
        res.status(404).send({message: 'no hay usuario registrados'});

      } else {
        res.status(200).send({persons});
      }
    }
  });
}

//export objects
module.exports = {
  savePerson,
  getPersons
};

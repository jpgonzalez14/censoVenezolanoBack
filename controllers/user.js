'use strict'
//modules
var bcrypt = require('bcrypt-nodejs');

//models
var User = require('../models/user');


//actions
function prueba(req, res) {
  res.status(200).send({
    message: 'probando controlador usuarios y accion prueba'
  });
}

function saveUser(req, res) {
  //create object user
  var user = new User();
  //user params
  var params = req.body;

  if (params.password && params.name && params.org && params.country && params.city && params.email) {
    //asign params to user object
    user.name = params.name;
    user.org = params.org;
    user.country = params.country;
    user.city = params.city;
    user.email = params.email.toLowerCase();
    user.role = 'ROLE_USER';

    User.findOne({email: user.email.toLowerCase()}, (err,isUser)=>{
      if (err) {
        res.status(500).send({
          message: 'error al comprobar el usuario'
        });
      } else {
        if (!isUser) {
          //encrypt password
          bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            //save user in database
            user.save((err, userStored) => {
              if (err) {
                res.status(500).send({
                  message: 'error al guardar el usuario'
                });
              } else {
                if (!userStored) {
                  res.status(404).send({
                    message: 'no se ha registrado el usuario'
                  });
                } else {
                  res.status(200).send({
                    user: userStored
                  });
                }
              }
            });
          });
        } else {
          res.status(200).send({
            message: 'el usuario ya existe'
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


function login(req, res) {

  //user params
  var params = req.body;

  if (params.email) {

    var email = params.email;

    User.findOne({email: email.toLowerCase()}, (err,user)=>{
      if (err) {
        res.status(500).send({
          message: 'error al comprobar el usuario'
        });
      } else {
        if (user) {
          res.status(200).send({user});
        } else {
          res.status(404).send({
            message: 'el usuario no existe'
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

//export objects
module.exports = {
  prueba,
  saveUser,
  login
};

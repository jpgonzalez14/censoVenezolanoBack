'use strict'
//modules
var bcrypt = require('bcrypt-nodejs');

//models
var User = require('../models/user');

//jwt service
var jwt = require('../services/jwt');

//actions
function prueba(req, res) {
  res.status(200).send({user: req.user});
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

  if (params.email && params.password) {

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err,user)=>{
      if (err) {
        res.status(500).send({
          message: 'error al comprobar el usuario'
        });
      } else {
        if (user) {
          bcrypt.compare(password, user.password, (err, check)=>{
            if (err) {
              res.status(500).send({
                message: 'error al hacer login'
              });
            } else {
              if (check) {

                if (params.gettoken) {
                  res.status(200).send({token: jwt.createToken(user)});
                } else {
                  res.status(200).send({user});
                }
              } else {
                res.status(404).send({
                  message: 'el usuario no existe o no ha podido iniciar'
                });
              }
            }
          });
        } else {
          res.status(404).send({
            message: 'el usuario no existe o no ha podido iniciar'
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

function updateUser(req, res){
  var id = req.params.id;
  var update = req.body;

  if(id != req.user.sub){
    return res.status(500).send({message: 'no tiene permiso para actualizar usuario'});
  }
    User.findByIdAndUpdate(id, update,{new:true}, (err, userUpdate)=>{
      if (err) {
        res.status(500).send({message: 'error al actualizar usuario'});
      } else {
        if (!userUpdate) {
          res.status(404).send({message: 'no se pudo actualizar el usuario'});
        } else {
          res.status(200).send({user: userUpdate});
        }
      }
    });
}

function getUsers(req, res){
  User.find({role: 'ROLE_USER'}).exec((err, users)=>{
    if (err) {
      res.status(500).send({message: 'error al pedir lista de usuarios'});
    } else {
      if (!users) {
        res.status(404).send({message: 'no hay usuario registrados'});

      } else {
        res.status(200).send({users});
      }
    }
  });
}

//export objects
module.exports = {
  prueba,
  saveUser,
  login,
  updateUser,
  getUsers
};

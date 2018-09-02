'use strict'
//middleware
var jwt = require('jwt-simple');
var moment = require('moment');
//key to encode
var key = 'ElmO_tIEnE_dIArrEA'

//user token
//next is for middelwere, nexts lets us go to the next method
exports.ensureAuth = function(req, res, next){
  if (!req.headers.authorization) {
    return res.status(403).send({message: 'la peticion no tiene autenticacion'});
  }
  var token = req.headers.authorization.replace(/['"]+/g, '');
  try {
    var payload = jwt.decode(token, key);
    if (payload.ext <= moment().unix()) {
      return res.status(401).send({message:'token caducado'});
    }
  } catch (e) {
    return res.status(404).send({message:'token no es valido'});
  }

  req.user = payload;

  next();
};

'use strict'
//middleware
var jwt = require('jwt-simple');
var moment = require('moment');
//key to encode
var key = 'ElmO_tIEnE_dIArrEA'

//user token
exports.createToken = function(user){
  var payload = {
    //information inside the token
    sub: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()
  };
  return jwt.encode(payload, key);
};

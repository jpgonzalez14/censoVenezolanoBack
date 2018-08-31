'use strict'

function prueba(req,res){
  res.status(200).send({
    message: 'probando controlador usuarios y accion prueba'
  });
}
module.exports = {
  prueba
};

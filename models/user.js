'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: true
    },
    country: String,
    city: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: String
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', UserSchema);

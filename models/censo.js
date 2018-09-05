'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var CensoSchema = Schema({
    edad: {
        type: Number,
        unique: true
    },
    queHace: {
        type: String,
        unique: true
    },
    untimoNivelDeEstudio: {
        type: String,
        unique: true
    },
    profesion: {
        type: String,
        unique: true
    },
    enfermedadesCronicas: {
        type: String,
        unique: true
    },
    ingresos: {
        type: Number,
        unique: true
    },
    fechaIngreso: {
        type: Date,
        unique: true
    }
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Censo', CensoSchema);

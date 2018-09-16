'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var CensoSchema = Schema({
    edad: {
        type: Number,
        required: true
    },
    queHace: {
        type: String,
        required: true
    },
    untimoNivelDeEstudio: {
        type: String,
        required: true
    },
    profesion: {
        type: String,
        required: true
    },
    enfermedadesCronicas: {
        type: String,
        required: true
    },
    ingresos: {
        type: Number,
        required: true
    },
    fechaIngreso: {
        type: String,
        required: true
    },
    person: { type: Schema.ObjectId, ref: 'Person' }
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Censo', CensoSchema);

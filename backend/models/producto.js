'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    marca: String,
    modelo: String,
    anio: Number,       
    kilometraje: String, 
    precio: Number,
    imagen: String
});

module.exports = mongoose.model('Producto', ProductoSchema);
// Mongoose crea la colección 'productos' automáticamente
'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700; // El puerto que pusiste en global.ts de Angular

mongoose.Promise = global.Promise;

// Conexión a MongoDB (Asegúrate que tu base se llame 'concesionaria' o crea una)
mongoose.connect('mongodb://localhost:27017/concesionaria')
        .then(() => {
            console.log("Conexión a la base de datos establecida con éxito...");

            // Creación del servidor
            app.listen(port, () => {
                console.log("Servidor corriendo correctamente en la url: localhost:3700");
            });
        })
        .catch(err => console.log(err));
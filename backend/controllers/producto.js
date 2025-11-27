'use strict'

var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');

var controller = {

    // 1. GUARDAR AUTO
    saveProducto: async function(req, res){
        var params = req.body;
        var producto = new Producto();

        producto.marca = params.marca;
        producto.modelo = params.modelo;
        producto.anio = params.anio;
        producto.kilometraje = params.kilometraje;
        producto.precio = params.precio;
        producto.imagen = null;

        try {
            // AWAIT: Esperamos a que guarde
            var productoStored = await producto.save();
            
            if(!productoStored) return res.status(404).send({message: 'No se ha podido guardar el auto'});
            return res.status(200).send({producto: productoStored});
        
        } catch(err) {
            return res.status(500).send({message: 'Error al guardar el documento'});
        }
    },

    // 2. OBTENER UN SOLO AUTO
    getProducto: async function(req, res){
        var productoId = req.params.id;

        if(productoId == null) return res.status(404).send({message: 'El auto no existe'});

        try {
            var producto = await Producto.findById(productoId);
            
            if(!producto) return res.status(404).send({message: 'El auto no existe'});
            return res.status(200).send({producto});

        } catch(err) {
            return res.status(500).send({message: 'Error al devolver los datos'});
        }
    },

    // 3. LISTAR TODOS LOS AUTOS
    getProductos: async function(req, res){
        try {
            // AWAIT: Buscamos todos y ordenamos por año descendente
            // Nota: Si en tu modelo pusiste 'year' en vez de 'anio', cambia la palabra abajo
            var productos = await Producto.find({}).sort('-anio');
            
            if(!productos || productos.length === 0) return res.status(404).send({message: 'No hay autos para mostrar'});
            return res.status(200).send({productos});

        } catch(err) {
            return res.status(500).send({message: 'Error al devolver los datos'});
        }
    },

    // 4. ACTUALIZAR AUTO
    updateProducto: async function(req, res){
        var productoId = req.params.id;
        var update = req.body;

        try {
            var productoUpdated = await Producto.findByIdAndUpdate(productoId, update, {new:true});
            
            if(!productoUpdated) return res.status(404).send({message: 'No existe el auto para actualizar'});
            return res.status(200).send({producto: productoUpdated});

        } catch(err) {
            return res.status(500).send({message: 'Error al actualizar'});
        }
    },

    // 5. BORRAR AUTO
    deleteProducto: async function(req, res){
        var productoId = req.params.id;

        try {
            // En versiones nuevas se usa findByIdAndDelete en lugar de findByIdAndRemove
            var productoRemoved = await Producto.findByIdAndDelete(productoId);
            
            if(!productoRemoved) return res.status(404).send({message: 'No se puede eliminar ese auto (no existe)'});
            return res.status(200).send({producto: productoRemoved});

        } catch(err) {
            return res.status(500).send({message: 'Error al borrar'});
        }
    },

    // 6. SUBIR IMAGEN (Este se mantiene casi igual pero lo protegemos con try/catch por si acaso)
    uploadImage: async function(req, res){
        var productoId = req.params.id;
        var fileName = 'Imagen no subida...';

        if(req.files){
            var filePath = req.files.imagen.path;
            var fileSplit = filePath.split('\\'); // OJO: Si usas Mac/Linux cambia a '/'
            var fileName = fileSplit[fileSplit.length - 1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                
                try {
                    var productoUpdated = await Producto.findByIdAndUpdate(productoId, {imagen: fileName}, {new: true});
                    
                    if(!productoUpdated) return res.status(404).send({message: 'El auto no existe'});
                    return res.status(200).send({producto: productoUpdated});

                } catch(err) {
                    return res.status(500).send({message: 'La imagen no se ha subido'});
                }

            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La extensión no es válida'});
                });
            }
        } else {
            return res.status(200).send({message: 'No has subido ninguna imagen'});
        }
    },

    // 7. MOSTRAR IMAGEN (Este es Node puro, no usa Mongoose, así que no cambia)
    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({message: "No existe la imagen..."});
            }
        });
    }

};

module.exports = controller;
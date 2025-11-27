'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var router = express.Router();

// Middleware para subir archivos (IMPORTANTE)
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

// Definir rutas (Coinciden con tu Angular Service)
router.get('/home', (req, res) => { res.status(200).send({message: 'Soy la home del backend'}); });
router.post('/guardar-producto', ProductoController.saveProducto);
router.get('/producto/:id', ProductoController.getProducto);
router.get('/productos', ProductoController.getProductos);
router.put('/producto/:id', ProductoController.updateProducto); // Usar PUT para actualizar
router.delete('/producto/:id', ProductoController.deleteProducto);
router.post('/subir-imagen/:id', multipartMiddleware, ProductoController.uploadImage);
router.get('/get-imagen/:image', ProductoController.getImageFile);

module.exports = router;
//RUTAS = acceso a los recursos
//Verbos:
//GET- Obtener, PUT = Actualizar, POST = crear, DELETE = Eliminar 
const express = require('express')

//Enrutador
const router = express.Router() //Enrutador

//Acceso = Crear, Listar, etc..
const productoController = require('../controllers/productoController')

//Definiendo rutas
router.post('/',productoController.crearProducto)

router.get('/',productoController.obtenerProducto)

router.get('/:id',productoController.obtenerProductoPorId)

router.put('/:id',productoController.actualizarProducto)

router.delete('/:id',productoController.eliminarProducto)

module.exports = router
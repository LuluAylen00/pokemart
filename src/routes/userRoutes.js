const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router

// Invocamos el controlador, que traerá todas las funcionalidades relacionadas a las páginas que sean de usuarios
const userController = require('../controllers/userController');

// Rutas nuevas (Sprint 3 en adelante)
app.get('/access', userController.register) // Ruta "/access" para el navegador (Contiene el login y el registro)

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
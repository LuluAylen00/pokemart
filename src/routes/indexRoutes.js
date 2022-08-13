const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router

// Invocamos el controlador, que traerá todas las funcionalidades relacionadas a las páginas que no sean de productos (ni usuarios, en el futuro)
const mainController = require('../controllers/mainController');

app.get('/', mainController.oldIndex) // Ruta raíz de nuestro sitio, que ejecutará lo que haya en el método index del controlador

app.get('/access', mainController.oldAccess) // Ruta "/access" para el navegador (Contiene el login y el registro)

app.get('/cart', mainController.oldCart) // Ruta "/cart" para el navegador (Contiene el login y el registro)

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
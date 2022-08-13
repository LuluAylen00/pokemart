const {Router} = require('express');
const app = Router();
const mainController = require('../controllers/mainController')

app.get('/', mainController.index) // Ruta raíz de nuestro sitio, que ejecutará lo que haya en el método index del controlador

// Y así con el resto
app.get('/access', mainController.access) // Ruta "/access" para el navegador (Contiene el login y el registro)

app.get('/cart', mainController.cart) // Ruta "/cart" para el navegador (Contiene el login y el registro)

module.exports = app;
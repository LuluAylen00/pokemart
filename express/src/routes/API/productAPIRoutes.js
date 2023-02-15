const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router
const path = require('path');

const productController = require('../../controllers/API/productAPIController');

app.get('/api/products', productController.all);
app.get('/api/products/last', productController.last);
app.get('/api/products/:id', productController.show);

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
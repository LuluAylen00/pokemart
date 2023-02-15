const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router
const path = require('path');

const cartController = require('../../controllers/API/cartAPIController');

app.get('/api/orders', cartController.all);
app.get('/api/orders/topBought', cartController.topBought);
app.get('/api/orders/topBuyers', cartController.topBuyers);
app.get('/api/orders/:id', cartController.show);

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
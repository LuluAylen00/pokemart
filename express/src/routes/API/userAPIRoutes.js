const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router
const path = require('path');

const userController = require('../../controllers/API/userAPIController');

app.get('/api/users', userController.all);
app.get('/api/users/last', userController.last);
app.get('/api/users/:id', userController.show);

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
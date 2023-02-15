const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router
const path = require('path');

const categoryController = require('../../controllers/API/subcategoryAPIController');

app.get('/api/subcategories', categoryController.all);
app.get('/api/subcategories/most', categoryController.most);
app.get('/api/subcategories/:id', categoryController.show);

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
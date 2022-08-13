const {Router} = require('express');
const app = Router();
const productController = require('../controllers/productController');
/*
    Debido a que en el entry point usamos (app.use) sobre este archivo de rutas con la ruta predefinida como "/products/", esa definida se concatena con el primer parámetro de cualquier ruta que especifiquemos en este archivo, por lo que un "/" de aquí sería "/products" en el navegador
*/

// Iniciamos una ruta (app.get), estará destinada a la descripción de mi producto ("/products/") de mi sitio
app.get('/', productController.index);

module.exports = app;
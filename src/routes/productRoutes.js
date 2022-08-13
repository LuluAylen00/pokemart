const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router

// Invocamos el controlador, que traerá todas las funcionalidades relacionadas a las páginas de productos
const productController = require('../controllers/productController');
/*
    Debido a que en el entry point usamos (app.use) sobre este archivo de rutas con la ruta predefinida como "/products/", esa definida se concatena con el primer parámetro de cualquier ruta que especifiquemos en este archivo, por lo que un "/" de aquí sería "/products" en el navegador
*/

// Iniciamos una ruta (app.get), estará destinada a la descripción de mi producto ("/products/") de mi sitio propia del Sprint 2
app.get('/', productController.oldIndex);

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
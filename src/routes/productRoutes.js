const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router

// Invocamos el controlador, que traerá todas las funcionalidades relacionadas a las páginas de productos
const productController = require('../controllers/productController');
/*
    Debido a que en el entry point usamos (app.use) sobre este archivo de rutas con la ruta predefinida como "/products/", esa definida se concatena con el primer parámetro de cualquier ruta que especifiquemos en este archivo, por lo que un "/" de aquí sería "/products" en el navegador
*/

app.get('/create',productController.create);
app.get('/',productController.all);
app.get('/:id', productController.show);
app.get('/edit/:id',productController.edit);

app.post('/save',productController.save);
app.post('/update',productController.update);
app.post('/erase',productController.erase);

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
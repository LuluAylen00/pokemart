const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router

// Invocamos el controlador, que traerá todas las funcionalidades relacionadas a las páginas de productos
const oldController = require('../controllers/oldController');
/*
    Debido a que en el entry point usamos (app.use) sobre este archivo de rutas con la ruta predefinida como "/old/", esa definida se concatena con el primer parámetro de cualquier ruta que especifiquemos en este archivo, por lo que un "/" de aquí sería "/products" en el navegador
*/

// Rutas de las vistas antiguas
app.get('/', oldController.oldIndex); // Ruta raíz (old) de nuestro sitio, que ejecutará lo que haya en el método oldIndex del controlador
app.get('/product/',oldController.oldProduct) // Ruta "/old/product" para el navegador (Contiene la descripción del producto)
app.get('/access', oldController.oldAccess); // Ruta "/old/access" para el navegador (Contiene el login y el registro)
app.get('/cart', oldController.oldCart); // Ruta "/old/cart" para el navegador (Contiene el login y el registro)


module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
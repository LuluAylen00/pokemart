const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router
const path = require('path');

// Invocamos el controlador, que traerá todas las funcionalidades relacionadas a las páginas de productos
const productController = require('../controllers/productController');

// Traemos multer y lo configuramos
const multer = require('multer');
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, path.resolve(__dirname,"../../public/img","items"))
        
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage:dest});


const validCreate = require('../middlewares/newItem');
const isAdmin = require('../middlewares/isAdmin');

/*
    Debido a que en el entry point usamos (app.use) sobre este archivo de rutas con la ruta predefinida como "/products/", esa definida se concatena con el primer parámetro de cualquier ruta que especifiquemos en este archivo, por lo que un "/" de aquí sería "/products" en el navegador
*/
app.get('/products/create', [isAdmin],productController.create);

app.get('/products/:category?/:subcategory?', productController.category);

app.get('/product/detail/:id', productController.show);
app.get('/products/edit/:id', [isAdmin],productController.edit);

app.post('/products/save', [upload.single("image"), validCreate], productController.save);
app.put('/products/update/:id', [upload.single("image")], productController.update);
app.delete('/products/erase/:id', [isAdmin], productController.erase);

app.post('/products/buy', productController.buy)

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
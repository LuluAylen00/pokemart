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
        if(extension.indexOf("png") > 0){
            cb(null, path.resolve(__dirname,"../../public/img","items"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage:dest});

/*
    Debido a que en el entry point usamos (app.use) sobre este archivo de rutas con la ruta predefinida como "/products/", esa definida se concatena con el primer parámetro de cualquier ruta que especifiquemos en este archivo, por lo que un "/" de aquí sería "/products" en el navegador
*/
app.get('/create',productController.create);

app.get('/:category?', productController.category);

app.get('/detail/:id', productController.show);
app.get('/edit/:id',productController.edit);

app.post('/save', [upload.single("image")], productController.save);
app.put('/update/:id', [upload.single("image")], productController.update);
app.delete('/erase/:id', productController.erase);

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
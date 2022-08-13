const express = require('express'); // Requiero express
const {join, resolve} = require('path'); // Requiero el método path.resolve para concatenar las rutas mas adelante
const app = express(); // Guardo la ejecución de express() en mi app

const port = 3151; // Defino el puerto a usar
console.log("Servidor corriendo en el puerto 3151"); // Mensaje para corroborar que el servidor haya funcionado sin problemas!
app.listen(port); // Le indico a la aplicación que debe escuchar (listen) el puerto que le indiqué

const public = resolve(__dirname, '../public'); // Establezco mi ruta pública -> Llego hasta esta dirección (__dirname) y busco la carpeta public
const static = express.static(public); // Le indico a express que la ruta definida (public) será la ruta pública (express.static)
app.use(static); // Le indico a la aplicación que debe usar el resultado de la ejecución de express.static, es decir, que use la ruta definida como la ruta pública

app.set ('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");

// Requerimos el archivo de rutas principales
const indexRoutes = require('./routes/indexRoutes');
// y lo usamos
app.use(indexRoutes);

// Lo mismo con el archivo de rutas de productos
const productRoutes = require('./routes/productRoutes');
// Pero con una leve diferencia
app.use("/products", productRoutes);
const express = require('express'); // Requiero express
const {join, resolve} = require('path'); // Requiero el método path.resolve para concatenar las rutas mas adelante
const app = express(); // Guardo la ejecución de express() en mi app

const port = 3151; // Defino el puerto a usar
console.log("Servidor corriendo en el puerto 3151"); // Mensaje para corroborar que el servidor haya funcionado sin problemas!
app.listen(port); // Le indico a la aplicación que debe escuchar (listen) el puerto que le indiqué

const public = resolve(__dirname, '../public'); // Establezco mi ruta pública -> Llego hasta esta dirección (__dirname) y busco la carpeta public
const static = express.static(public); // Le indico a express que la ruta definida (public) será la ruta pública (express.static)
app.use(static); // Le indico a la aplicación que debe usar el resultado de la ejecución de express.static, es decir, que use la ruta definida como la ruta pública

app.get('/', (req, res) => { // Iniciamos una ruta (app.get), estará destinada al homepage ("/") de mi sitio
    let view = resolve(__dirname, '../views','home.html'); // Indico la ruta donde hallará el html que debe mostrar en mi homepage (__dirname, '../views','home.html')
    return res.sendFile(view); // Envío el html (res.sendFile) para que se vea en el navegador
}) 

app.get('/product', (req, res) => { // Iniciamos una ruta (app.get), estará destinada a la descripción de mi producto ("/product") de mi sitio
    let view = resolve(__dirname, '../views','product.html'); // Vuelvo a indicar la ruta donde hallará el html que corresponda (__dirname, '../views','product.html')
    return res.sendFile(view); // Envío el html (res.sendFile) para que se vea en el navegador
})

// Así con el resto
app.get('/cart', (req, res) => { // Ruta "/cart" para el navegador 
    let view = resolve(__dirname, '../views','cart.html'); // Ruta que busca el html a enviar
    return res.sendFile(view); 
})

app.get('/access', (req, res) => { // Ruta "/access" para el navegador (Contiene el login y el registro)
    let view = resolve(__dirname, '../views','access.html'); // Ruta que busca el html a enviar
    return res.sendFile(view); 
})
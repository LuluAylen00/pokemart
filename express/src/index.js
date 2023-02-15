const express = require('express'); // Requiero express
const {join, resolve} = require('path'); // Requiero el método path.resolve para concatenar las rutas mas adelante
const app = express(); // Guardo la ejecución de express() en mi app
const method = require('method-override'); // Requiero method-override para definir los métodos PUT, PATCH y DELETE en HTML/EJS
const session = require('express-session');
const cookie = require('cookie-parser');

const cors = require("cors");
app.use(cors())

const db = require('./database/models');

const port = process.env.PORT || 3151; // Defino el puerto a usar

//////////////////////////////////////////////////////
const http = require('http');
const server = http.createServer(app);
server.listen(port)

const { Server } = require("socket.io");
const io = new Server(server);

let messages = [];

let connected = 0
io.on('connection', async (socket) => {
    console.log('Un usuario se ha conectado');
    try { // { include: ["avatar", { model: db.City, as: "city", include: ["region"] }]}
        messages = await db.Chat.findAll({include: [{model: db.User, as: "trainer", include: ["avatar"]}]})
    } catch (error) {
        console.log(error);
    }
    connected++
    io.sockets.emit("connected", connected);
    io.sockets.emit("messages", messages);

    socket.on("new-message", function (data) {
        db.Chat.create({
                message: data.text,
                trainerId: data.id,
                date: data.time
            }).then(() => {
                db.Chat.findAll({include: [{model: db.User, as: "trainer", include: ["avatar"]}]}).then((messages) => {
                    io.sockets.emit("messages", messages);
                })
            }).catch ((error) => {
                console.log(error)
            })
        
        //messages.push(data);
    });

    socket.on('disconnect', function() {
        console.log("alguien se ha ido");
        connected--
        io.sockets.emit("connected", connected);
    });
});

//////////////////////////////////////////////////////

console.log("Servidor corriendo en el puerto " + port); // Mensaje para corroborar que el servidor haya funcionado sin problemas!
//app.listen(port); // Le indico a la aplicación que debe escuchar (listen) el puerto que le indiqué

const public = resolve(__dirname, '../public'); // Establezco mi ruta pública -> Llego hasta esta dirección (__dirname) y busco la carpeta public
const static = express.static(public); // Le indico a express que la ruta definida (public) será la ruta pública (express.static)
app.use(static); // Le indico a la aplicación que debe usar el resultado de la ejecución de express.static, es decir, que use la ruta definida como la ruta pública

// Ejecuto body-parser para procesar la información de los formularios
app.use(express.urlencoded({extended:true})); 
app.use(express.json())
// Ejecuto method-override para sobreescribir los métodos post en los formularios que necesite
app.use(method('m'));

app.use(session({
    secret: "Pikachu == Electric",
    resave: true,
    saveUninitialized: true
}));

app.use(cookie())

app.set ('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");


const sessionMid = require("./middlewares/session")
app.use(sessionMid)

const headerMid = require("./middlewares/header")
app.use(headerMid)

// Requerimos el archivo de rutas principales
const indexRoutes = require('./routes/indexRoutes');
// y lo usamos
app.use(indexRoutes);

// Lo mismo con el archivo de rutas de productos
const productRoutes = require('./routes/productRoutes');
// Pero con una leve diferencia
app.use(productRoutes);

// De la misma forma traemos las de usuarios
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

// Y las rutas antiguas
const oldRoutes = require('./routes/oldRoutes');
app.use("/old",oldRoutes);

app.use(require("./routes/API/productAPIRoutes"));
app.use(require("./routes/API/subcategoryAPIRoutes"));
app.use(require("./routes/API/cartAPIRoutes"));
app.use(require("./routes/API/userAPIRoutes"));

app.use(require("./middlewares/errorHandler"))
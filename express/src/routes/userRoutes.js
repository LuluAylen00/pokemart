const {Router} = require('express'); // Traemos el método Router de express
const app = Router(); // Ejecutamos y guardamos en una constante (app) el método Router

// Invocamos el controlador, que traerá todas las funcionalidades relacionadas a las páginas que sean de usuarios
const userController = require('../controllers/userController');


const validLogin = require('../middlewares/login')
const validRegister = require('../middlewares/register');
const isLogged = require('../middlewares/isGuest');
const isAdmin = require('../middlewares/isAdmin');
const isGuest = require('../middlewares/isLogged');


// Rutas nuevas (Sprint 3 en adelante)
app.get('/access', [isGuest], userController.register) // Ruta "/access" para el navegador (Contiene el login y el registro)
app.get('/profile/', [isLogged], userController.profile) // Ruta "/profile" para probar el perfil de usuario
app.post('/register', [validRegister, isGuest] , userController.save) //
app.patch('/updateName/:id', userController.updateUsername);
app.patch('/updateCity/:id', userController.updateCity);
app.patch('/updateAvatar/', userController.updateAvatar);

app.post('/access', [validLogin, isGuest], userController.connect);
app.post('/logout', userController.logout);

module.exports = app; // Exportamos la constante donde guardamos la ejecución del método Router
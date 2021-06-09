const express = require('express'); // App express
const route = express.Router(); // Manejo de rutas
const controllerVuelo = require('../controllers/controllerVuelo'); //Importacion del Controlador Usuarios
const auth = require('../middlewares/auth.middleware'); // Importacion del Controlador para el login




route.post('/add', controllerVuelo.create_vuelo_post); //Ruta para crear Usuario 

route.get('/all', /*auth.verifyAdmin,*/ controllerVuelo.vuelo_all_get); // Ruta para ver los usuarios

//route.get('/current', auth.verifyLogin, controllerVuelo.user_current_get); // Ruta Para ver a si mismo

route.get('/:id', controllerVuelo.vuelo_id_get); // Ruta para buscar por id Usuario


//Router export
module.exports = route;
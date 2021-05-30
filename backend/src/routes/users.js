//Requires
const express = require('express'); // App express
const route = express.Router(); // Manejo de rutas
const userController = require('../controllers/usuarioController'); //Importacion del Controlador Usuarios
const auth = require('../middlewares/auth.middleware'); // Importacion del Controlador para el login



//Page/subpages methods
route.post('/add', userController.create_user_post); //Ruta para crear Usuario 

route.get('/all', /*auth.verifyAdmin,*/ userController.user_get); // Ruta para ver los usuarios

route.get('/current', auth.verifyLogin, userController.user_current_get); // Ruta Para ver a si mismo

route.get('/:id', auth.verifyAdmin, userController.user_id_get); // Ruta para buscar por id Usuario

route.put('/update/:id', auth.verifyOwn, userController.user_update_put); // Ruta para actualiar los datos de usuario lo puede hacer el Admin o el mismo usuario

route.put('/remove/:id', auth.verifyOwn, userController.user_remove_put); // Eliminacion del usuario para el usuario aunque los datos suigen en la BD

route.delete('/delete/:id', auth.verifyAdmin, userController.user_destroy_delete); //Eliminacion completa del Usuario

route.get('/confirm/:token', auth.verifyAdmin, userController.user_confirm_get); // Confirmacion del usuario "Cheked = true"

//Router export
module.exports = route;
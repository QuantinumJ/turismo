//Requires
const express = require('express');
const route = express.Router();
const userController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth.middleware');



//Page/subpages methods
//route.post('/add', userController.create_user_post);

route.get('/all', auth.verifyAdmin, userController.user_get);

// route.get('/current', auth.verifyLogin, userController.user_current_get);

// route.get('/:id', auth.verifyAdmin, userController.user_id_get);

// route.put('/update/:id', auth.verifyOwn, userController.user_update_put);

// route.put('/remove/:id', auth.verifyOwn, userController.user_remove_put);

// route.delete('/delete/:id', auth.verifyAdmin, userController.user_destroy_delete);

// route.get('/confirm/:token', auth.verifyAdmin, userController.user_confirm_get);

//Router export
module.exports = route;
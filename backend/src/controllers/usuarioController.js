//----------------Requires-------------------
const User = require('../models/User');
const generateToken = require('../middlewares/generateToken.middleware');
const generatePassword = require('../middlewares/generatePassword.middleware');
const validator = require('../middlewares/validator.middleware');
const bcrypt = require('bcrypt');
const moment = require('moment');


/**
 * Funcion de creacion en bd
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create_user_post = async(req, res) => {

    if (req.body.password === undefined) req.body.password = generatePassword()

    let userData = {
        email: req.body.email.toLowerCase(),
        nombre: req.body.nombre,
        password: req.body.password,
        role: req.body.role
    }

    try {
        Object.keys(userData).forEach(km => {
            if (userData[km] == undefined) throw ({ status: 400, code: 301, err: `This ${km} are not valid or missing` });
            if (req.body[km] !== -1) {
                if (!validator.validateGeneric[km](userData[km]) == true) throw ({ status: 400, code: 301, err: `This ${km} are not valid or missing` });
            }
        });

        userData.etoken = generateToken()

        const userExist = await User.findOne({ email: userData.email });
        if (userExist) throw ({ status: 400, code: 102, error: `${userData.email} is already registered` });

        userData.created_at = moment().format();
        userData.password = bcrypt.hashSync(userData.password, 10);

        const newUser = await User.create(userData);

        res.status(200).json(newUser);

    } catch (error) {
        const status = error.status ? error.status : 500;
        res.status(status).json(error);
    }
}


// FUNCION PARA CONFIRMAR AL USUARIO
/**
 * Funcion confirmacion del usuario
 * @param {Request} req 
 * @param {Response} res 
 */
exports.user_confirm_get = async(req, res) => {
    const token = req.params.token
    try {
        if (token === undefined) throw ({ status: 400, code: 109, error: 'Unverified user' })

        const user = await User.findOne({ etoken: token });
        if (!user) throw ({ status: 404, code: 108, error: `User was not found` })

        user.checked = true;
        user.updated_at = moment().format();
        user.etoken = '';
        await user.save()

        res.status(200).json({ message: "Your user account has been confirmed" })

    } catch (error) {
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }
}

/**
 * Funcion para obtener los usuarios
 * @param {Request} req 
 * @param {Response} res 
 */
exports.user_get = async(req, res) => {

    try {
        const users = await User.find();

        if (users.length > 1) res.status(200).json(users);
        else res.status(204).json("Exito, pero no hay datos a mostrar");

    } catch (error) {
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }

}

/**
 * Funcion para obtener usuario por id
 * @param {Request} req 
 * @param {Response} res 
 */
exports.user_id_get = async(req, res) => {
    const id = req.params.id
    try {
        if (validator.validateGeneric["id"](id)) {
            const user = await User.findOne({ _id: id });

            if (user) res.status(200).json(user);
            else res.status(204).json("Exito, pero no hay datos a mostrar");
        } else {
            throw ({ status: 400, error: "Id invalida" })
        }
    } catch (error) {
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }
}

/**
 * Funcion para modificar los datos de usuario
 * @param {Request} req 
 * @param {Response} res 
 */
exports.user_update_put = async(req, res) => {
    const id = req.params.id
    const body = req.body

    userData = {
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    }

    try {
        Object.keys(userData).forEach(dat => { //Validacion de atributos
            if (userData[dat] == undefined) {
                delete userData[dat]
            } else {
                if (body[dat] !== -1)
                    if (validator.validateGeneric[dat](userData[dat]) == false)
                        throw ({ status: 400, err: `Dato ${dat} de usuario invalido` });
            }
        })

        const user = await User.findOne({ _id: id });

        if (user) {
            if (userData.email != undefined) { //No pueden repetirse emails
                mod = await User.findOne({ email: userData.email })
                if (mod)
                    throw ({ status: 400, error: "email already in use" });
            }

            userData.updated_at = moment().format();
            await user.updateOne(userData);
            res.status(200).json(true)

        } else {
            throw ({ status: 404, error: "User not found" })
        }

    } catch (error) {
        console.log(error) //Console log
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }
}

/**
 * Funcion dar de baja a usuario
 * @param {Request} req 
 * @param {Response} res 
 */
exports.user_remove_put = async(req, res) => {
    let id = req.params.id

    try {
        const user = await User.updateOne({ _id: id }, { deleted_at: moment().format() })
        if (user.nModified !== 0)
            res.status(200).json(true)
        else
            throw ({ status: 404, err: "Usuario no encontrado" })
    } catch (error) {
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }
}

/**
 * Funcion destruir registro de la bd
 * @param {Request} req 
 * @param {Response} res 
 */
exports.user_destroy_delete = async(req, res) => {
    let id = req.params.id

    try {
        const user = await User.findById(id)
        if (user) {
            if (user.deleted_at != undefined) {
                await User.deleteOne({ _id: user.id })
                res.status(200).json(true)
            } else {
                throw ({ status: 400, err: "El usuario debe de haber sido eliminado primero" })
            }
        } else {
            throw ({ status: 404, err: "Usuario no encontrado" })
        }
    } catch (error) {
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }

}

/**
 * Funcion para devolver algunos datos de usuario
 * @param {Request} req 
 * @param {Response} res 
 */
exports.user_current_get = async(req, res) => {
    const { user } = req
    delete user['deleted_at']
    delete user['password']
    delete user['etoken']
    delete user['checked']
    delete user['__v']
    delete user['role']
    delete user['updated_at']
    res.status(200).json(user)
}
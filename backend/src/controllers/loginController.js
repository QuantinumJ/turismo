const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createToken } = require("../middlewares/auth.middleware");
const moment = require('moment');
require("csurf");

/**
 * Funcion login de usuario. Relleno de cookies con id e info. CSRF COMENTADO
 * @param {Request} req 
 * @param {Response} res 
 */
const loginUser = async(req, res) => {

    const body = req.body;
    const cookies = req.cookies;
    try {
        if (cookies) {
            if (cookies.user)
                throw ({ status: 403, err: "Already logged" })
        }
        const user = await User.findOne({ email: body.email });

        if (!user || user.deleted_at || !bcrypt.compareSync(body.password, user.password) || !user.checked) {
            throw { login: false, err: "You user or your password is wrong" };
        } else {

            let expiry = new moment().add(Number(process.env.CAD_TOKEN[0]) + 1, 'h').toISOString();

            const token = await createToken(user, user.role);
            const httpOnlyCheck = user.role !== 'ADMIN' ? true : false
            const secureCheck = process.env.NODE_ENV !== "dev" ? true : false
            res.cookie('sessionId', token, { httpOnly: httpOnlyCheck, secure: secureCheck });
            res.cookie('user', user._id.toString(), { httpOnly: httpOnlyCheck, secure: secureCheck });
            res.cookie('expiry', expiry, { httpOnly: httpOnlyCheck, secure: secureCheck }) /
                 res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: false, secure: false });
                res.status(200).json({ login: true });


        }
    } catch (error) {
        console.log(error);
        const status = error.status ? error.status : 500
        res.status(status).json({
            login: false,
            err: error.err,
        });
    }
};

/**
 * Funcion borrado de cookies de usuario
 * @param {Request} req 
 * @param {Response} res 
 */
const logOutUser = async(req, res) => {
    const cookie = req.cookies;

    for (let prop in cookie) {
        if (cookie.hasOwnProperty(prop) || prop === "XSRF-TOKEN" || prop === "_csrf") {
            res.cookie(prop, '', { expires: new Date(0) });
        }
    }

    res.status(200).json({ logout: true });
}

/**
 * Funcion validar si esta logeado (cookies caducadas)
 * @param {Request} req 
 * @param {Response} res 
 */
const getIsLoggedIn = async(req, res) => {

    if (req.cookies.expiry) {
        const date = new Date().getTime();
        const expired = moment(date).isBefore(req.cookies.expiry);

        if (!expired) {
            res.status(200).send(false);
        } else {
            res.status(200).send(true);
        }
    } else {
        res.status(200).send(false);
    }
};


//Module export
module.exports = { getIsLoggedIn, logOutUser, loginUser }
const validator = require('../middlewares/validator.middleware');
const moment = require('moment');
const Vuelo = require('../models/Vuelo');


/**
 * Funcion de creacion en bd
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create_vuelo_post = async(req, res) => {

    let vueloData = {
        destino: req.body.destino,
        origen: req.body.origen,
        precio: req.body.precio,
        fecha_salida: req.body.fecha_salida,
        fecha_llegada: req.body.fecha_llegada
    }

    try {
        Object.keys(vueloData).forEach(km => {
            if (vueloData[km] == undefined) throw ({ status: 400, code: 301, err: `This ${km} are not valid or missing` });
            if (req.body[km] !== -1) {
                if (!validator.validateGeneric[km](vueloData[km]) == true) throw ({ status: 400, code: 301, err: `This ${km} are not valid or missing` });
            }
        });
        vueloData.created_at = moment().format();

        const newVuelo = await Vuelo.create(vueloData);

        res.status(200).json(newVuelo);

    } catch (error) {
        const status = error.status ? error.status : 500;
        res.status(status).json(error);
    }
}

exports.vuelo_all_get = async(req, res) => {
    console.log("req.query.search")
    console.log(typeof(req.query.search))

    try {
        var search = req.query.search
        if (search != "") {
            //const $regex = escapeStringRegexp(search);
            // console.log("PASO ша")
            const vuelo = await Vuelo.find({ disponible: true, $or: [{ destino: { $regex: search, "$options": "i" } }, { origen: { $regex: search, "$options": "i" } }] });
            if (vuelo.length > 1) res.status(200).json(vuelo);
            // for (let vuelos = 0; vuelos < array.length; vuelos++) {
            //  const user = await User.findOne({ email: body.email }); vuelo en ves del user

            // }
            else res.status(204).json("Exito, pero no hay datos a mostrar");
        } else {
            console.log("PASO ESLSE")
            const vuelo = await Vuelo.find({ disponible: true });

            if (vuelo.length > 1) res.status(200).json(vuelo);
            else res.status(204).json("Exito, pero no hay datos a mostrar");
        }



    } catch (error) {
        console.log(error)
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }

}


exports.vuelo_id_get = async(req, res) => {
    const id = req.params.id
    console.log(req)
    try {
        if (validator.validateGeneric["id"](id)) {
            const vuelo = await Vuelo.findOne({ _id: id });
            if (vuelo) res.status(200).json(vuelo);
            else res.status(204).json("Exito, pero no hay datos a mostrar");
        } else {
            throw ({ status: 400, error: "Id invalida" })
        }
    } catch (error) {
        const status = error.status ? error.status : 500
        res.status(status).json(error)
    }
}
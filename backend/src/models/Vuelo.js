//Requires
const { Schema, model } = require('mongoose');

//Roles validos
const validRole = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid Role",
};

//User mongoose schema 
const VueloSchema = Schema({

    disponible: {
        type: Boolean,
        required: true,
        default: true
    },
    destino: {
        type: String,
        maxlength: 255,
        required: true
    },
    origen: {
        type: String,
        maxlength: 255,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fecha_salida: {
        type: Date,
        required: true
    },
    fecha_llegada: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: false,
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    }
});


//Export model
module.exports = model('Vuelo', VueloSchema);
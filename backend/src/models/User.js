//Requires
const { Schema, model } = require('mongoose');

//Roles validos
const validRole = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid Role",
};

//User mongoose schema 
const UserSchema = Schema({
    email: {
        type: String,
        require: true,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        maxlength: 1024,
        required: true
    },
    nombre: {
        type: String,
        maxlength: 255,
        required: true
    },
    role: {
        type: String,
        required: false,
        enum: validRole
    },
    checked: {
        type: Boolean,
        required: true,
        default: true //De momento en true
    },
    etoken: {
        type: String
    },
    created_at: {
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
module.exports = model('User', UserSchema);
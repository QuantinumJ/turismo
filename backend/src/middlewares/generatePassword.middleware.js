const RandExp = require('randexp')

//Generacion de coontraseña aleatoria
const generatePassword = () => {
    return new RandExp(/(?=.*[^a-zA-Z0-9])(?!.*\s).{32}$/).gen()
}

//Module export
module.exports = generatePassword
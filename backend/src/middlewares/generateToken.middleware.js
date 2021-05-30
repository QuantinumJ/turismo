const RandExp = require('randexp')

//Generacion de token aleatorio
const generarConfirmTok = () => {
    return new RandExp(/[a-zA-Z0-9!*]{256}/).gen()


}

//Module export
module.exports = generarConfirmTok
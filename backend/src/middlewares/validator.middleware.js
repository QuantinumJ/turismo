const validator = require('validator');

//Roles
const roleUser = ["ADMIN", "USER"];


//Validate generic objeto principal
const validateGeneric = {
    c_banc: (c_banc) => { return validator.isEmpty(c_banc) === false && validator.isIBAN(c_banc) },
    calle: (calle) => { return validator.isEmpty(calle) === false && validator.matches(calle, /^[a-zA-Z\s\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú\/]+$/) },
    cif: (cif) => { return validator.isEmpty(cif) === false && validator.matches(cif, /^(\D*\d){6,}[a-zA-Z0-9\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú]+$/) },
    codPostal: (codPostal) => { return validator.isEmpty(codPostal) === false && validator.matches(codPostal, /^[0-9]{5}$/) },
    country: (country) => { return validator.isEmpty(country) === false, validator.matches(country, /^[a-zA-Z\s\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú]+$/) },
    descripcion: (descripcion) => { return validator.isEmpty(descripcion) === false && validator.matches(descripcion, /^[a-zA-Z0-9\s\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú,.'´-]+$/) },
    direccion: (direccion) => { return validDirecc(direccion) },
    dni: (dni) => { return validator.isEmpty(dni) === false && validator.matches(dni, /^[a-zA-Z0-9]{1}(\D*\d){5,}[a-zA-Z0-9]+$/) },
    email: (email) => { return validator.isEmpty(email) === false && validator.isEmail(email) },
    etiqueta: (etiqueta) => { return validator.isEmpty(etiqueta) === false && validator.isIn(etiqueta, etiquetaP) },
    id: (id) => { return validator.isEmpty(id) === false && validator.matches(id, /^[a-f0-9]{24}$/) },
    iva: (iva) => { return iva == true || iva == false },
    localidad: (localidad) => { return validator.isEmpty(localidad) === false && validator.matches(localidad, /^[a-zA-Z\s\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú]+$/) },
    nombre: (nombre) => { return validator.isEmpty(nombre) === false && validator.matches(nombre, /^[a-zA-Z0-9\s\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú,.'´-]+$/) },
    password: (password) => { return validator.isEmpty(password) === false && validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/) },
    provincia: (provincia) => { return validator.isEmpty(provincia) === false && validator.matches(provincia, /^[a-zA-Z\s\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú]+$/) },
    precio: (precio) => { return validator.isEmpty(precio) === false && validator.matches(precio, /^[0-9]+(\.[0-9]{1,2})?$/) },
    role: (role) => { return validator.isEmpty(role) === false && validator.isIn(role, roleUser) },
    telefono: (telefono) => { return validator.isEmpty(telefono) === false && validator.matches(telefono, /^\+?(?:\d\s?){9,15}$/) },
    destino: (destino) => { return validator.isEmpty(destino) === false && validator.matches(destino, /^[a-zA-Z\s\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú]+$/) },
    origen: (origen) => { return validator.isEmpty(origen) === false && validator.matches(origen, /^[a-zA-Z\s\ñ\Ñ\á\Á\é\É\í\Í\ó\Ó\ú\Ú]+$/) },
    fecha_salida: (fecha_salida) => { return validator.isEmpty(fecha_salida) === false && validator.matches(fecha_salida, /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])+$/) },
    fecha_llegada: (fecha_salida) => { return validator.isEmpty(fecha_salida) === false && validator.matches(fecha_salida, /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])+$/) },

}

/**
 * Funcion validar direccion
 * @param {JSON} direccion Objeto de tipo direccion {calle, localidad, codPostal, provincia}
 * @returns True | False en caso de que alguna validacion falle
 */
function validDirecc(direccion) {
    let ret = true;
    if (direccion != undefined) {
        direc = {
            calle: direccion.calle,
            localidad: direccion.localidad,
            codPostal: direccion.codPostal,
            provincia: direccion.provincia
        }
        Object.keys(direc).forEach(dat => { //Bucle de validacion de los atributos del objeto
            if (direc[dat] == undefined)
                delete direc[dat]
            else
            if (validateGeneric[dat](direc[dat]) == false) {
                ret = false;
            }
        })
    } else {
        ret = false;
    }

    return ret;
}



//Module export
module.exports = { validateGeneric }
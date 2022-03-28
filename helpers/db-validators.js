const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error("El rol "+rol+" no está registrado en la DB")
    }
}

//Verificar si el correo existe
const emailExiste = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo: correo});
    if(existeEmail){
        throw new Error("El correo "+correo+" está registrado en la DB")
    }
}

module.exports = {
    esRoleValido,
    emailExiste
}
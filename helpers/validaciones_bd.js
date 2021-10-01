// Requerimientos
const { response } = require('express');
const Role = require('../models/Role');
const Users = require('../models/Users');

// Existencia del rol
const rolValido = async (role = '') => {
    
// Se busca el rol en la base de datos
    const roleEncontrado = await Role.findOne({ role });

    if (!roleEncontrado) {
        throw new Error('El rol seleccionado no es válido')
    }
};

// Verificamos si el usuario existe en la base de datos
const existeEmail = async (email = '') => {
    const emailEncontrado = await Users.findOne({ email });
    if (emailEncontrado) {
        throw new Error('Ya existe un usuario registrado con ese email')
    };
}

//Verificamos la existencia de un usuario igual
const existeUsuario = async (id) => {
    const user = await Users.findById(id);

    if(!user){
        throw new Error('El usuario no existe')
    }
}

module.exports = {
    rolValido,
    existeEmail,
    existeUsuario
}
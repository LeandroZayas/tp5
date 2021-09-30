// Se importa el Schema Role
const { response } = require('express');
const Role = require('../models/Role');
const Users = require('../models/Users');

// Función que consulta a la base de datos si existe el rol enviado por el usuario
const rolValido = async (role = '') => {
    // Se busca el rol en la base de datos
    const roleEncontrado = await Role.findOne({ role });
    // Si el resultado de la consulta es undefined, se evalúa como false
    if (!roleEncontrado) {
        throw new Error('El rol seleccionado no es válido')
    }
};

// Función que verifica si el email ya existe en la base de datos
const existeEmail = async (username = '') => {
    const emailEncontrado = await Users.findOne({ username });
    if (emailEncontrado) {
        throw new Error('Ya existe un usuario registrado con ese nombre')
    };
}

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
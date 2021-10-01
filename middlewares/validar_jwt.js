//Requerimientos
const { response, request } = require("express");
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

// Valida tokens recibidos
const validar_jwt = async (req = request, res = response, next) => {

// Token recibido del cliente
    const token = req.header('x-token');
    
// Se verifica si el token existe en la petición
    if(!token){
        return res.status(400).json({
            msg:'Token inválido'
        })
    };
    
// Decodifica el token para obtener el uid y luego buscar el usuario
    try {
        const { uid } = jwt.verify(token, process.env.SECRET)

// Verifica el usuario en la base de datos
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg:'Token inválido - usuario no existe'
            })
        }

// Verifica si el usuario está activo
        if(!user.active){
            return res.status(401).json({
                msg:'Token inválido - usuario no existe'
            })
        }

// Se añaden los datos del usuario a la petición para que pueda ser leído
        req.user = user;
// Continuar al siguiente middleware
        next()
    } catch (error) {
        console.log('Error al verificar token: ', token);
        return res.status(401).json({
            msg:'Token inválido - Error al verificar token'
        })
    }
}

module.exports = {
    validar_jwt
};
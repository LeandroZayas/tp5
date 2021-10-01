const bcryptjs = require('bcryptjs');
const { generar_jwt } = require("../helpers/generar_jwt");
const Users = require("../models/Users");

const ctrlAuth = {};

ctrlAuth.login = async (req, res) => {
        //Recibimos datos
    let { username, password, ...otrosDatos } = req.body

    try {
        // Validamos si existe username
    const user = await Users.findOne({ username });
    
    if(!user){
        return res.status(401).json({
            msg:'Datos incorrectos, vuelva a intentarlo - username'
        });
    }
    
        // Verificación de inactividad
    if(!user.active){
        return res.status(401).json({
            msg:'Usuario inactivo'
        });
    }

    // Comparamos contraseñas
    const comparacion = bcryptjs.compareSync(password, user.password)

console.log(password, user.password)
console.log(comparacion)

    if(!comparacion){
        return res.status(401).json({
            msg:'Datos incorrectos, vuelva a intentarlo - password'
        })
    }

    console.log(user)

    // Generamos el token
    const token = await generar_jwt(user.id)

    // Respuesta
    res.json({
       user,
       token
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Consulte al Administrador del sitio'
        })
    }

};

module.exports = ctrlAuth;
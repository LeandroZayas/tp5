const bcryptjs = require('bcryptjs');
const User = require('../models/Users');

const ctrlUsers = {};

// MÉTODO GET ----------------------------------------------------
// Obtener usuarios activos
ctrlUsers.getUsers = async (req, res) => {
    try {
        const usuarios = await User.find({});
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener usuarios'
        })
    }
};

// MÉTODO POST ----------------------------------------------------
// Crear usuario
ctrlUsers.createUser = async (req, res) => {
    let newUser = {};

// Desestructuramos la información recibida del cliente
    const { email,username, password, role, ...otros_datos_recibidos } = req.body;

// Se instancia un nuevo usuario
    try {
        newUser = new User({
            email,
            username,
            password,
            role
        })

// Se alamacena el nuevo usuario en la base de datos
        await newUser.save();
        return res.json({
            msg: 'Usuario creado exitosamente!',
            usuario: newUser
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'No se pudo crear el usuario, vuelva a intentarlo'
        })
    };


}

// MÉTODO PUT ----------------------------------------------------
// Editar usuario a través de su id.
ctrlUsers.editUser = async (req, res) => {


//Recimbimos los datos
    const { id } = req.params;
    const { username, password, role, ...resto } = req.body;


//Encriptar contraseña
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt); 
    }

//Actualizamos usuario mediante ID
    const userUpdated = await User.findByIdAndUpdate(id, {
        username,
        password: resto.password,
        role
    })

//Respuesta
    return res.json({
        msg:'Datos actualizados correctamente!',
        user: userUpdated
    })

}

//MÉTODO DELETE -------------------------------------------------------
// Eliminar usuario a través de su id.
ctrlUsers.deleteUser = async (req, res) => {

//Recibimos ID
    const { id } = req.params;

//Eliminar mediante ID recibido (Eliminación Lógica)
    const userDeleted = await User.findByIdAndUpdate(id, {
       active: false
    })

//Respuesta
    return res.json({
        msg:'Usuario eliminado correctamente!',
        user: userDeleted
    })

}

module.exports = ctrlUsers;
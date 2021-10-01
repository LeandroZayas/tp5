const { response } = require("express");

// Verifica si el usuario tiene privilegios de administrador
const adminRole = async (req, res = response, next ) => {

//Si el cuerpo de la peticion no tiene token
    if(!req.user) {
        return res.status(500).json({
            msg:'Se quiere verificar rol sin validar el token'
        })
    };

//Desestructuramos el objeto
    const { role } = req.user;

    if(role !== 'ADMIN_USER' || 'COLLABORATOR_USER') {
        return res.status(401).json({
            msg: 'No tienes permisos para la acción que intentas realizar'
        })
    }

    next();
}


const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        console.log(req.user)
        
//Verifica si existe el usuario en la request  
        if(!req.user) {
            return res.status(500).json({
                msg:'Se quiere verificar rol sin validar el token'
            })
        };

// Verificacion roles permitidos
        if( !roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `Se requieren alguno de los siguientes roles ${roles}`
            })
        }
        next();
    };
}

module.exports = {
    adminRole,
    tieneRol
}
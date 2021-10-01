//Requerimos express-validator
const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {
//Mandamos datos al metodo de express-validator
    const errores = validationResult(req)

//Si hay errores 
    if(!errores.isEmpty()){
        return res.status(400).json(errores)
    }
    next();  
};

module.exports = {
    validarCampos
};
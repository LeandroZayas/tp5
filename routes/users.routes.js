//Requerimientos
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

//Importo funciones
const { rolValido, existeEmail, existeUsuario } = require('../helpers/validaciones_bd');
const { validarCampos } = require('../middlewares/validar_campos');
const { validar_jwt } = require('../middlewares/validar_jwt');
const { tieneRol } = require('../middlewares/validar_roles');

// Requerimos los controladores
const {
    getUsers,
    createUser,
    editUser,
    deleteUser } = require('../controllers/users.controllers');

//METODO GET --------------------------------------------------------------------------
// Ruta para obtener todos los usuarios activos
router.get('/', getUsers)

//METODO POST --------------------------------------------------------------------------
// Ruta para crear un usuario
router.post('/', [
    validar_jwt,
    tieneRol('ADMIN_USER', 'COLLABORATOR_USER'),

    check('email', 'El email no es correcto')
    .isEmail(),

    check('email')
    .custom(existeEmail),

    check('username', 'El username debe contener al menos 8 caracteres')
    .isLength({min:7}),
    
    check('password', 'La contraseña debe contener al menos 8 caracteres')
    .isLength({min:7}),
    
    check('role', 'El rol es obligatorio')
    .not()
    .isEmpty(),

    check('role')
    .custom(rolValido),

    validarCampos
] ,createUser)

//METODO PUT --------------------------------------------------------------------------
// Ruta para editar un usuario
router.put('/:id', [
    validar_jwt,
    
    tieneRol('ADMIN_USER'),
    
    check('id', 'No es un ID de MongoDB válido')
    .isMongoId(),
    
    check('id').custom(existeUsuario),
    
    check('role').custom(rolValido),

    check('email', 'Debe ser un e-mail')
    .isEmail(),
    
    validarCampos
] ,editUser)

////METODO DELETE --------------------------------------------------------------------------
// Ruta para eliminar un usuario
router.delete('/:id', [
    validar_jwt,
    
    tieneRol('ADMIN_USER'),
    
    check('id', 'No se recibió un ID de MongoDB válido')
    .isMongoId(),

    check('id')
    .custom(existeUsuario),

    validarCampos
    
], deleteUser)

module.exports = router;
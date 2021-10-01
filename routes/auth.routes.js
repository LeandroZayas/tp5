//Requerimientos
const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth.controllers');

//Crear ruta
router.post('/login', login);

module.exports = router;
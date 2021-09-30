//Importaciones de librerías
const express = require('express')
const morgan = require('morgan')


//Inicializaciones
const app = express();
require('dotenv').config();
require('./conexionBD');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())
 
//Configs
const port = process.env.PORT || 6000;

//Rutas
app.use('/api/user',require('./routes/users.routes'));
app.use('/api/auth',require('./routes/auth.routes'));

//Servidor en escucha
app.listen(port, ()=> console.log(`Servidor corriendo en el puerto ${port}`));
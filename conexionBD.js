const mongoose = require("mongoose");

mongoose
    .connect(process.env.ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Conectado a la base de datos correctamente"))
    .catch((err) => console.error('Error al conectar a la Base de Datos: ', err));
const jwt = require('jsonwebtoken');

const generar_jwt = (uid = '') => {

    const payload = { uid };

//Generamos forzosamente una promise porque recibimos un callback
    return new Promise((resolve, reject) => {


//Agregamos la firma del token (SECRET)
        jwt.sign(payload, process.env.SECRET,
            (error, token) => {
                if (error) {
                    console.log(error)
                    reject('Error al generar token')
                }

                resolve(token)
            }
        )
    });
};

module.exports = {
    generar_jwt
}
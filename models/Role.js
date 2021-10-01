//Requerimientos
const { model, Schema } = require('mongoose');

//Esquema de roles
const RoleSchema = new Schema({
    role: {
        type: String,
        required: true
    }
});

module.exports = model('Roles', RoleSchema);
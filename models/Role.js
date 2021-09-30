const { model, Schema } = require('mongoose');

const RoleSchema = new Schema({
    role: {
        type: String,
        required: true
    }
});

module.exports = model('Roles', RoleSchema);
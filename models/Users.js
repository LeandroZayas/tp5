const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    active: { type: Boolean, default: true },
    sigUpDate: { type: Date, default: Date.now() }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

UserSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return next()

   const salt = bcrypt.genSalt(10, (err, ) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
});


module.exports = model('Users', UserSchema);
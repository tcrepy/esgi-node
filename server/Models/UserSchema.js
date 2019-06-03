const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const db = require('../lib/db');

const UserSchema = mongoose.Schema({
    lastname: String,
    firstname: {
        type: String
    },
    pseudo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(this.password, salt).then(hash => {
            this.password = hash;
            next();
        })
    });
});

UserSchema.methods.register = function() {
    return this.save();
};

UserSchema.statics.login = function (email, password) {
    return new Promise((resolve, reject) => {
        User.findOne({email}).then(user => {
            if (!user) return reject('User not found');
            bcrypt.compare(password, user.password)
                .then(res => { res ? resolve(user) : reject("wrong password"); });
        }).catch(error => {
            reject(error)
        })
    })
};
const User = db.model('User', UserSchema);
module.exports = User;
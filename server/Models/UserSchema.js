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
        required: true,
        unique: true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    created_at: { type: Date, default: Date.now },
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
        this.findOne({email}).then(user => {
            if (!user) return reject('User not found');
            bcrypt.compare(password, user.password)
                .then(res => { res ? resolve(user) : reject("wrong password"); });
        }).catch(error => {
            reject(error)
        })
    })
};

class User {

    testIsValid(){

        let motifs = []

        if(!this.firstname || this.firstname == "")
          motifs.push('pas de prenom')
        if(!this.lastname || this.lastname == "")
          motifs.push('pas de nom')
        if(!this.pseudo || this.pseudo == "")
          motifs.push('pas de pseudo')
        if(!this.image || this.image == "")
          motifs.push('pas d image')

        if(motifs.length > 0) return false
        else return true
    }

}

UserSchema.loadClass(User)

const UserModel = db.model('User', UserSchema);
module.exports = UserModel;
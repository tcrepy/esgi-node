const createToken = require('../lib/auth').createToken;

const express = require('express');
const User = require('../Models/UserSchema');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ wel: 'come'})
});


router.post('/login', (req, res) => {
    User.login(req.body.email, req.body.password)
        .then(data => {
            const token = createToken(data);
            res.status(201).send({token});
        })
        .catch(err => {
            console.log(err);
            if (err === "User not found" || err === "wrong password") {
                res.status(400).send({
                    error: 'Wrong user or password'
                });
            } else {
                res.status(500).send({
                    error: 'Oops ! Something went wrong !'
                })
            }
        });
});

module.exports = router;

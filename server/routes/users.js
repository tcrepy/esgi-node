const createToken = require('../lib/auth').createToken;

const express = require('express');
const User = require('../Models/UserSchema');
const router = express.Router();

router.get('/', (req, res) => {

    Promise
        .resolve()
        .then(() => User.find())
        .then(users => res.send(users))
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => User.findById(id))
        .then(user => res.send(user))
        .catch(err => res.send(err));
});

router.post( '/', ( req, res, next ) => {
    Promise
        .resolve()
        .then(() => {
            if ( !( req.body.email
                && req.body.password)
                && req.body.pseudo ) {
                throw new Error( 'All fields are required' );
            }
        })
        .then(() => {
            let user = new User(req.body)
            return user.save()
        })
        .then( user => res.json( user ) )
        .catch(err => {
            console.log(err)
            return next
        })
});

router.delete( '/:id', ( req, res, next ) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => User.remove({ _id: id }).exec())
        .then(() => res.status(204).send({action : "ok"}))
        .catch(next)
});

module.exports = router;

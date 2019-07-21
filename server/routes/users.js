const createToken = require('../lib/auth').createToken;

const express = require('express');
const User = require('../Models/UserSchema');
const router = express.Router();

router.get('/', (req, res) => {

    Promise
        .resolve()
        .then(() => User.find())
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => User.findById(id))
        .then(user => {
            const {lastname, firstname, pseudo, email} = user;
            return res.status(200).send({
                lastname,
                firstname,
                pseudo,
                email
            })
        })
        .catch(err => res.status(500).send({"error" : err.toString()}));
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
        .then( user => res.status(201).json( user ) )
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.delete( '/:id', ( req, res, next ) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => User.findById(id))
        .then((user) => {
            if(user) return User.remove({ _id: id }).exec()
            else User.remove({ pseudo: id }).exec()
        })
        .then(() => res.status(204).send({action : "ok"}))
        .catch(err => res.status(204).send({"error" : err.toString()}));
});

router.put( '/:id', ( req, res, next ) => {
    const id = req.params.id
    const authorizedFields = [
      'email',
      'pseudo'
    ]

    Promise.resolve()
      .then(() => User.update({_id : id}, req.body, { authorizedFields }))
      .then(user => res.status(200).send(user))
      .catch(err => res.status(500).send({"error" : err.toString()}));
});

module.exports = router;

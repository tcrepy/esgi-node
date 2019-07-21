const express = require('express');
const Tuto = require('../Models/TutoSchema');
const router = express.Router();

router.get('/', (req, res) => {
    Promise
        .resolve()
        .then(() => Tuto.find())
        .then(tutos => res.status(200).send(tutos))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Tuto.findById(id))
        .then(tuto => res.status(200).send(tuto))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.post('/', (req, res) => {

    Promise
        .resolve()
        .then(() => {
            if ( !( req.body.title
                && req.body.price
                && req.body.videos
                && req.body.teacher
                && req.body.category) ) {
                throw new Error( 'All fields are required' );
            }
            else {
                let tuto = new Tuto(req.body)
                return tuto.save()
            }
        })
        .then( tuto => res.status(201).json( tuto ) )
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.delete( '/:id', ( req, res, next ) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Tuto.remove({ _id: id }).exec())
        .then(() => res.status(204).send({action : "ok"}))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.put( '/:id', ( req, res, next ) => {
    const id = req.params.id
    const authorizedFields = [
      'title',
      'description',
      'color'
    ]

    Promise.resolve()
      .then(() => Tuto.updateOne({_id : id}, req.body, { authorizedFields }))
      .then(tuto => res.status(200).send(tuto))
      .catch(err => res.status(500).send({"error" : err.toString()}));
});

module.exports = router;

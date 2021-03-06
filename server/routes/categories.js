const express = require('express');
const Category = require('../Models/CategorySchema');
const router = express.Router();

router.get('/', (req, res) => {
    Promise
        .resolve()
        .then(() => Category.find())
        .then(categories => res.status(200).send(categories))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Category.findById(id))
        .then(category => res.status(200).send(category))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.post('/', (req, res) => {

    Promise
        .resolve()
        .then(() => {
            if ( !( req.body.title
                && req.body.description
                && req.body.color) ) {
                throw new Error( 'All fields are required' );
            }
            else {
                let category = new Category(req.body)
                return category.save()
            }
        })
        .then( category => res.status(201).json( category ) )
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.delete( '/:id', ( req, res, next ) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Category.remove({ _id: id }).exec())
        .then(() => res.status(204))
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
      .then(() => Category.updateOne({_id : id}, req.body, { authorizedFields }))
      .then(category => res.status(200).send(category))
      .catch(err => res.status(500).send({"error" : err.toString()}));
});

module.exports = router;

const express = require('express');
const Category = require('../Models/CategorySchema');
const router = express.Router();

router.get('/', (req, res) => {

    Promise
        .resolve()
        .then(() => Category.find())
        .then(categories => res.send(categories))
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Category.findById(id))
        .then(category => res.send(category))
        .catch(err => res.send(err));
});

router.post('/', (req, res) => {

    Promise
        .resolve()
        .then(() => {
            if ( !( req.body.title
                && req.body.description) ) {
                throw new Error( 'All fields are required' );
            }
            else {
                let category = new Category(req.body)
                return category.save()
            }
        })
        .then( category => res.json( category ) )
        .catch(err => res.send(err));
});

router.delete( '/:id', ( req, res, next ) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Category.remove({ _id: id }).exec())
        .then(() => res.json({ action: true }))
        .catch(err => res.send(err));
});

module.exports = router;

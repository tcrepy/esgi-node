const express = require('express');
const Post = require('../Models/PostSchema');
const router = express.Router();

router.get('/', (req, res) => {

    Promise
        .resolve()
        .then(() => Post.find())
        .then(posts => res.send(posts))
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Post.findById(id))
        .then(post => res.send(post))
        .catch(err => res.send(err));
});

router.post('/', (req, res) => {

    Promise
        .resolve()
        .then(() => {
            if ( !( req.body.title
                && req.body.description
                && req.body.link
                && req.body.categories) ) {
                throw new Error( 'All fields are required' );
            }
            else {
                let post = new Post(req.body)
                return post.save()
            }
        })
        .then( post => res.json( post ) )
        .catch(err => res.send(err));
});

router.delete( '/:id', ( req, res, next ) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Post.remove({ _id: id }).exec())
        .then(() => res.json({ action: true }))
        .catch(err => res.send(err));
});

module.exports = router;

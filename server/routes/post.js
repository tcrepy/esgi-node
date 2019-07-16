const express = require('express');
const Post = require('../Models/PostSchema');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req.query).then(data => res.send(data)).catch(err => res.sendStatus(500));
});


router.post('/', (req, res) => {
    console.log(req.body);
    const post = new Post(req.body);
    post.save()
        .then(data => res.status(201).json(data))
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).json(err.errors);
            } else {
                res.sendStatus(500);
            }
        });
});

router.delete('/:id', (req, res) => {
    res.sendStatus(204);
});

module.exports = router;
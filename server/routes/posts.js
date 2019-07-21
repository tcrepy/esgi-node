const express = require('express');
const Post = require('../Models/PostSchema');
const router = express.Router();
const Pagination = require('../lib/Pagination');
const elasticsearch = require('@elastic/elasticsearch');


router.get('/', (req, res, next) => {
    let limit = req.query.limit ? req.query.limit : 20
    let page = req.query.page ? req.query.page - 1 : 0
    let order = req.query.order || '-created_at'
    let searchQuery = req.query || {}

    Promise.resolve()
    // On construit l'objet de recherche
        .then(() => Post.paramize(searchQuery || {}))
        .then(search =>
            Promise.all([
                // On compte le nombre d'annonces
                // correspondant à la recherche
                Post.countDocuments(search),
                // On recherche les annonces
                // correspondant à la recherche
                Post.find(search)
                    .limit(Number(limit))
                    .skip(page * Number(limit))
                    .sort(order),
            ])
        )
        .then(([count, list]) => {
            res.status(200).send(list)
        })
        .catch(err => res.status(500).send({"error": err.toString()}));
})


router.get('/upvote/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Post.update(
            {"_id": id},
            {$inc: {"upvote": 1}}
        ))
        .then(post => res.status(200).send(post))
        .catch(err => res.status(500).send({"error": err.toString()}));
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Post.findById(id))
        .then(post => res.status(200).send(post))
        .catch(err => res.status(500).send({"error": err.toString()}));
});

router.post('/', (req, res) => {

    Promise
        .resolve()
        .then(() => {
            if (!(req.body.title
                && req.body.description
                && req.body.link
                && req.body.categories)) {
                throw new Error('All fields are required');
            } else {
                let post = new Post(req.body);
                return post.save();
                //     .catch(err => {
                //     throw new Error(err.toString())
                // });
            }
        })
        .then(post => {
            const elkPost = {
                upvote: post.upvote,
                title: post.title,
                description: post.description,
                link: post.link,
                categories: post.categories,
                created_at: post.created_at,
            };
            const client = new elasticsearch.Client({
                host: 'http://elasticsearch:9200',
                log: 'trace',
                node: 'http://elastic:changeme@elasticsearch:9200'
            });
            try {
                client.index({
                    index: "posts",
                    id: post._id,
                    body: JSON.stringify(elkPost)
                }).then(() => {
                    res.status(201).json(post);
                });
            } catch (e) {
                console.log(e);
                throw new Error(e.toString())
            }
        })
        .catch(err => res.status(500).send({error: err.toString()}));
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Post.remove({_id: id}).exec())
        .then(() => res.status(204).send({action: "ok"}))
        .catch(err => res.status(500).send({"error": err.toString()}));
});


module.exports = router;

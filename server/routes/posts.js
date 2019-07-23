const express = require('express');
const Post = require('../Models/PostSchema');
const router = express.Router();
const Pagination = require('../lib/Pagination')

router.get( '/', ( req, res, next ) => {
    let limit = req.query.limit ? req.query.limit : 20
    let page = req.query.page ? req.query.page - 1 : 0
    let order = req.query.order || '-created_at'
    let searchQuery = req.query || {}

    Promise.resolve()
      // On construit l'objet de recherche
      .then( () => Post.paramize( searchQuery || {} ) )
      .then( search =>
        Promise.all( [
          // On compte le nombre d'annonces
          // correspondant à la recherche
          Post.countDocuments( search ),
          // On recherche les annonces
          // correspondant à la recherche
          Post.find( search )
            .limit( Number( limit ) )
            .skip( page * Number( limit ) )
            .sort( order ),
        ] )
      )
      .then( ( [ count, list ] ) => {
        res.status(200).send(list)
      })
      .catch(err => res.status(500).send({"error": err.toString()}));
      } )


router.put('/upvote/:id', (req, res) => {
  const data = req.body
  Promise
      .resolve()
      .then(() => Post.findById(data.post.id))
      .then((post) => {
        // upvote : on rajoute l'id du user dans le tableau
        if(!post.upvote.includes(data.user.id))
          return Promise.all([Post.updateOne(
            {"_id" : data.post.id },
            { upvote : [...post.upvote, data.user.id] }
          ), post])
        // unvote : on enlève l'id du user du tableau
        else {
          let upvote = []
          post.upvote.forEach(id => { if(id != data.user.id) upvote.push(id) })
          return Promise.all([Post.updateOne(
            {"_id" : data.post.id },
            { upvote }
          ), post])
        }
      })
      .then(([update, post]) => Post.findById(data.post.id))
      .then(post => res.status(200).send(post))
      .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => Post.findById(id))
        .then(post => res.status(200).send(post))
        .catch(err => res.status(500).send({"error" : err.toString()}));
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
        .then( post => res.status(201).json( post ) )
        .catch(err => res.status(500).send({error: err.toString()}));
});

router.delete( '/:id', ( req, res, next ) => {
  const id = req.params.id

  Promise
      .resolve()
      .then(() => Post.remove({ _id: id }).exec())
      .then(() => res.status(204))
      .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.put( '/:id', ( req, res, next ) => {
    const id = req.params.id
    const authorizedFields = [
      'title',
      'description',
      '_id'
    ]

    Promise.resolve()
      .then(() => Post.updateOne({_id : id}, req.body, { authorizedFields }))
      .then(post => res.status(200).send(post))
      .catch(err => res.status(500).send({"error" : err.toString()}));
});



module.exports = router;

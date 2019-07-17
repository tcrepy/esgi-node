const express = require('express');
const Post = require('../Models/PostSchema');
const router = express.Router();
const Pagination = require('../lib/Pagination')

router.get('/', (req, res) => {

    Promise
        .resolve()
        .then(() => Post.find())
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});
/*
router.get( '/', ( req, res, next ) => {
    let limit = req.query.limit ? req.query.limit : 20
    let page = req.query.page ? req.query.page - 1 : 0
    let order = req.query.order || '-created_at'
    let searchQuery = req.query.search || {}

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
        // On retourne la liste
        res.json( {
          posts: list,
          paging: new Pagination( {
            search: searchQuery,
            current: page + 1,
            limit: limit,
            count: count,
          } ),
        } )
      } )
      .catch( next )
  } )
*/
router.get('/upvote/:id', (req, res) => {
  const id = req.params.id

  Promise
      .resolve()
      .then(() => Post.update(
        {"_id" : id },
        { $inc: { "upvote": 1 } }
      ))
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
        .then(() => res.status(204).send({action : "ok"}))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});



module.exports = router;

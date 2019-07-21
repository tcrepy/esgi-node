const createToken = require('../lib/auth').createToken;

const express = require('express');
const User = require('../Models/UserSchema');
const Post = require('../Models/PostSchema');
const Category = require('../Models/CategorySchema');
const Tuto = require('../Models/TutoSchema');
const router = express.Router();

//Cette route est utilisée pour savoir si l'utilisateur est bien connecté
router.get('/', (req, res) => {
    res.status(200).send({
        state: 'Connected'
    });
});



router.get('/populate', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => {
            let promises = []

            for (let i = 0; i < 50; i++) {
                let categories = [];
                if (i < 10) categories.push('javascript')
                else if (i < 20) categories.push('php')
                else if (i < 30) categories.push('c#')
                else if (i < 40) categories.push('java')
                else categories.push('docker')

                let post = new Post({
                    title: `post ${i}`,
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
                    link: `https://fr.lipsum.com/`,
                    categories
                })

                promises.push(post.save())
            }

            return Promise.all(promises)
        })
        .then(() => {
            let promises = []

            for (let i = 0; i < 10; i++) {
                let user = new User({
                    pseudo: `pseudo${i}`,
                    email: `mail${i}@gmail.com`,
                    password: `azerty`
                })

                promises.push(user.save())
            }
            return Promise.all(promises)
        })
        .then(() => {
            let promises = []

            for (let i = 0; i < 10; i++) {
                let category = new Category({
                    title: `cat ${i}`,
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
                })

                promises.push(category.save())
            }

            return Promise.all(promises)
        })
        .then(() => res.json({action: true}))
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.post('/register', (req, res, next) => {
    Promise
        .resolve()
        .then(() => {
            if (!(req.body.email
                && req.body.password)
                && req.body.pseudo) {
                throw new Error('All fields are required');
            }
        })
        .then(() => {
            let user = new User(req.body)
            return user.save()
        })
        .then((user) => {
            return res.status(201).send(user);
        })
        .catch(err => res.status(500).send({"error" : err.toString()}));
});

router.post('/login', (req, res) => {
    User.login(req.body.email, req.body.password)
        .then(data => {
            const token = createToken(data);
            res.status(201).send({token});
        })
        .catch(err => {
            if (err === "User not found" || err === "wrong password") {
                res.status(400).send({
                    error: 'Wrong user or password'
                });
            } else {
                res.status(500).send({
                    error: 'Oops ! Something went wrong !'
                })
            }
        });
});

router.get('/flush', (req, res) => {
    return Promise.all([
        Tuto.remove( { } ).exec(),
        Post.remove( { } ).exec(),
        Category.remove( { } ).exec(),
        User.remove( { } ).exec()
    ])
    .then(() => res.status(204).send({action : "ok"}))
    .catch(err => res.status(500).send({"error" : err.toString()}));
});

module.exports = router;

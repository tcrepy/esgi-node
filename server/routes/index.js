const createToken = require('../lib/auth').createToken;

const express = require('express');
const User = require('../Models/UserSchema');
const Post = require('../Models/PostSchema');
const Category = require('../Models/CategorySchema');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ wel: 'come'})
});

router.get('/populate', (req, res) => {
    const id = req.params.id

    Promise
        .resolve()
        .then(() => {
            let promises = []

            for(let i=0; i<50; i++) {
                let categories = [];
                if(i<10) categories.push('javascript')
                else if(i<20) categories.push('php')
                else if(i<30) categories.push('c#')
                else if(i<40) categories.push('java')
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

            for(let i=0; i<10; i++) {
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

            for(let i=0; i<10; i++) {
                let category = new Category({
                    title: `cat ${i}`,
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
                })

                promises.push(category.save())
            }

            return Promise.all(promises)
        })
        .then(() => res.json({ action: true }))
        .catch(err => res.send(err));
});

router.post('/login', (req, res) => {
    User.login(req.body.email, req.body.password)
        .then(data => {
            const token = createToken(data);
            res.status(201).send({token});
        })
        .catch(err => {
            console.log(err);
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

module.exports = router;

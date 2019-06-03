const express = require('express');
const Category = require('../Models/CategorySchema');
const router = express.Router();

router.get('/', (req, res) => {
    Category.find(req.query).then(data => res.send(data)).catch(err => res.sendStatus(500));
});


router.post('/', (req, res) => {
    const category = new Category(req.body);
    category.save()
        .then(data => res.status(201).json(data))
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).json(err.errors);
            } else {
                res.sendStatus(500);
            }
        });
});

module.exports = router;
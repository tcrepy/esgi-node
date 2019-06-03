const mongoose = require('mongoose');
const db = require('../lib/db');

const CategorySchema = mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date
});

const Category = db.model('Category', CategorySchema);

module.exports = Category;
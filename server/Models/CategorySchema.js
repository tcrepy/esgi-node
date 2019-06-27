const mongoose = require('mongoose');
const db = require('../lib/db');

const CategorySchema = mongoose.Schema({
    title: String,
    description: String,
    created_at: { type: Date, default: Date.now },
});

const Category = db.model('Category', CategorySchema);

module.exports = Category;

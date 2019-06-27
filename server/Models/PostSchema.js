const mongoose = require('mongoose');
const db = require('../lib/db');

const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String,
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    created_at: { type: Date, default: Date.now },

});

const Post = db.model('Post', PostSchema);

module.exports = Post;

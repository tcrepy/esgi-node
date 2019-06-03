const mongoose = require('mongoose');
const db = require('../lib/db');

const PostSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String,
    createdAt: Date
});

const Post = db.model('Post', PostSchema);

module.exports = Post;
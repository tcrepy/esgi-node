const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo', {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    dbName: process.env.MONGODB_DBNAME,
    useNewUrlParser: true
});
module.exports = mongoose.connection;
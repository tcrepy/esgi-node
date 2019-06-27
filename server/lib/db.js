const mongoose = require('mongoose');

mongoose.connect( `mongodb://localhost:27017/SampleCollections`, { useNewUrlParser: true } )
module.exports = mongoose.connection;

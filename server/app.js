const express = require("express");
const bodyparser = require('body-parser');
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const indexRouter = require("./routes/index");
const elasticsearch = require('@elastic/elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
const app = express();
const cors = require('cors');

app.use(bodyparser.json());
app.use(cors());

const verify = require('./middlewares/security').verify;

app.use(verify);

app.use('/', indexRouter);

app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});


app.listen(3000, () => console.log('listening 3000'));

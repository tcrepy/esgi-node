const express = require("express");
const bodyparser = require('body-parser');
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const indexRouter = require("./routes/index");

const app = express();
const verify = require('./middlewares/security').verify;

app.use(bodyparser.json());
//app.use(verify);

app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/', indexRouter);

app.listen(3000, () => console.log('listening 3000'));

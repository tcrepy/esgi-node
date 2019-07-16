const express = require("express");
const bodyparser = require('body-parser');
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const indexRouter = require("./routes/index");

const app = express();
const cors = require('cors');

app.use('/', indexRouter);

const verify = require('./middlewares/security').verify;

app.use(cors());
app.use(bodyparser.json());
app.use(verify);

app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);


app.listen(3000, () => console.log('listening 3000'));

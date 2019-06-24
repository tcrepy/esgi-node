const express = require("express");
const bodyparser = require('body-parser');
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const categoryRouter = require("./routes/category");
const app = express();
const cors = require('cors');

const verify = require('./middlewares/security').verify;

app.use(cors());
app.use(bodyparser.json());
app.use(verify);

app.use('/posts', postRouter);
app.use('/categories', categoryRouter);

app.use('/', userRouter);

app.listen(3000, () => console.log('listening 3000'));
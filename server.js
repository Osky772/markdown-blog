const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
require('./.db-config');

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles });
});

app.use('/articles', articleRouter);

let port = process.env.PORT;
if (port == null || port === '') {
  port = 5000;
}

app.listen(port);

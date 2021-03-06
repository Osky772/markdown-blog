const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
require('./.db-config');

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const articles = [
    {
      title: 'Test article',
      createdAt: new Date(),
      description: 'test description',
    },
    {
      title: 'Test article 2',
      createdAt: new Date(),
      description: 'test description 2',
    },
  ];
  res.render('articles/index', { articles });
});

app.use('/articles', articleRouter);

app.listen(5000);

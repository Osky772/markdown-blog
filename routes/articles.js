const express = require('express');

const Article = require('../models/article');

const router = express.Router();

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.render('articles/show', { article });
  } catch (e) {
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  const { title, description, markdown } = req.body;
  let article = new Article({
    title,
    description,
    markdown,
  });

  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log('Error while sending a form: ', e);
    res.render('articles/new', { article });
  }
});

module.exports = router;

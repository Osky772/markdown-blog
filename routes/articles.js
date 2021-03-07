const express = require('express');

const Article = require('../models/article');

const router = express.Router();

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});

router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    res.render('articles/show', { article });
  } catch (e) {
    res.redirect('/');
  }
});

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', { article });
});

router.post(
  '/',
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect('new')
);

router.put(
  '/:id',
  async (req, res, next) => {
    req.article = await Article.finById(req.params.id);
    next();
  },
  saveArticleAndRedirect('edit')
);

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let { article } = req;
    const { title, description, markdown } = req.body;
    article.title = title;
    article.description = description;
    article.markdown = markdown;

    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      res.render(`articles/${path}`, { article, error });
    }
  };
}

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;

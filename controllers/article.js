const mongoose = require('mongoose')
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const Article = require('../models/article');
const { createSuccess, successReq } = require('../utils/constants');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, date, text, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    source,
    date,
    link,
    image,
    owner: req.user._id,
  })
    .then((articles) => {
      res.status(createSuccess).send([{ data: articles }]);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new ValidationError(
            'Article validation failed, fields required!',
          ),
        );
      } else {
        next(e);
      }
    });
};

module.exports.getArticles = (req, res, next) => {
  Article.find({owner: req.user._id})
    .then((articles) => {
      res.status(successReq).send([{ articles }]);
    })
    .catch((e) => {
      next(e);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const id = req.params.articleId;
  Article.findById(id)
    .orFail(() => {
      throw new NotFoundError('Requested resource not found');
    })
    .then((article) => {
      if (article.owner.equals(req.user._id)) {
        article.remove(() => res.status(successReq).send([{ data: article }]));
      } else {
        throw new ForbiddenError(
          'Access to the requested resource is forbidden',
        );
      }
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new ValidationError('Invalid ID'));
      } else if (e.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Article not found'));
      } else {
        next(e);
      }
    });
};

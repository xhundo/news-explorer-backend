const Article = require('../models/article');
const {
  createSuccess,
  badReq,
  serverFailed,
  successReq,
  notFound,
} = require('../utils/constants');

module.exports.createArticle = (req, res) => {
  const {
    keyword, title, text, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    source,
    link,
    image,
  })
    .then((article) => {
      res.status(createSuccess).send({ data: article });
    })
    .catch((e) => {
      console.log(e);
      // if (e.name === "ValidationError") {
      //     res.status(badReq).send({ message: `${e.message}` });
      // } else {
      //     res.status(serverFailed).send({
      //         message: "An error has occured on the server",
      //     });
      // }
    });
};

module.exports.getArticles = (req, res) => {
  Article.find({})
    .then((data) => {
      res.status(successReq).send([{ articles: data }]);
    })
    .catch((e) => {
      if (e.name === 'NotFoundError') {
        res.status(notFound).send({
          message: 'Requested resource not found',
        });
      } else {
        res.status(serverFailed).send({
          message: 'An error has occured on the server',
        });
      }
    });
};

module.exports.deleteArticle = (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then((article) => {
      res.status(successReq).send([{ data: article }]);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(badReq).send({ message: 'Invalid ID' });
      } else if (e.name === 'NotFoundError') {
        res.status(notFound).send({ message: 'Article not found' });
      } else {
        res.status(serverFailed).send({
          message: 'An error has occured on the server',
        });
      }
    });
};

const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('./validator');

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const createArticleValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
    image: Joi.string().required().custom(validateURL),
  }),
});

const deleteArticleValidator = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  loginValidator,
  registerValidation,
  createArticleValidator,
  deleteArticleValidator,
};

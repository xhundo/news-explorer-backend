const { celebrate, Joi } = require("celebrate");

const loginValidator = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
});

const registrationValidator = celebrate({
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
        link: Joi.string().required(),
        image: Joi.string().required(),
    }),
});

const deleteArticleValidator = celebrate({
    params: Joi.object().keys({
        articleId: Joi.string().hex().length(24),
    }),
    body: Joi.object().keys({
        link: Joi.string().uri(),
        image: Joi.string().uri(),
    }),
});

module.exports = {
    loginValidator,
    registrationValidator,
    createArticleValidator,
    deleteArticleValidator,
};

const router = require("express").Router();

const { celebrate, Joi } = require("celebrate");
const {
    getArticles,
    createArticle,
    deleteArticle,
} = require("../controllers/article");
const { auth } = require("../middlewares/auth");

router.get("/", getArticles);
router.post(
    "/",
    auth,
    celebrate({
        body: Joi.object().keys({
            keyword: Joi.string().required(),
            title: Joi.string().required(),
            text: Joi.string().required(),
            date: Joi.string().required(),
            source: Joi.string().required(),
            link: Joi.string().required(),
            image: Joi.string().required(),
        }),
    }),
    createArticle
);
router.delete(
    "/:articleId",
    auth,
    celebrate({
        params: Joi.object().keys({
            articleId: Joi.string().hex().length(24),
        }),
        headers: Joi.object().keys({}).unknown(true),
        query: Joi.object().keys({
            token: Joi.string().token(),
        }),
    }),

    deleteArticle
);

module.exports = router;

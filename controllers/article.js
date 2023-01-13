const { default: mongoose } = require("mongoose");
const NotFoundError = require("../errors/not-found-error");
const ValidationError = require("../errors/validation-error");
const Article = require("../models/article");
const { createSuccess, successReq } = require("../utils/constants");

module.exports.createArticle = (req, res, next) => {
    const { keyword, title, text, source, link, image } = req.body;

    Article.create({
        keyword,
        title,
        text,
        source,
        link,
        image,
    })
        .then((article) => {
            res.status(createSuccess).send([{ data: article }]);
        })
        .catch((e) => {
            console.log(e);
            if (e.name === "ValidationError") {
                next(
                    new ValidationError(
                        "Article validation failed, fields required!"
                    )
                );
            } else {
                next(e);
            }
        });
};

module.exports.getArticles = (req, res, next) => {
    Article.find({})
        .then((data) => {
            res.status(successReq).send([{ articles: data }]);
        })
        .catch((e) => {
            if (e.name === "NotFoundError") {
                next(new NotFoundError("Requested resource not found"));
            } else {
                next(e);
            }
        });
};

module.exports.deleteArticle = (req, res, next) => {
    // if (req.user._id !== mongoose.Types.ObjectId) {
    //     throw new Error("Invalid user ID");
    // }
    const id = req.params.articleId;
    Article.findByIdAndRemove(id)
        .orFail()
        .then((data) => {
            res.status(successReq).send([{ articles: data }]);
        })
        .catch((e) => {
            console.log(e);
            if (e.name === "ValidationError") {
                next(new ValidationError("Invalid ID"));
            } else if (e.name === "DocumentNotFoundError") {
                next(new NotFoundError("Article not found"));
            } else {
                next(e);
            }
        });
};

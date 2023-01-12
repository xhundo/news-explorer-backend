const { default: mongoose } = require("mongoose");
const Article = require("../models/article");
const {
    createSuccess,
    badReq,
    serverFailed,
    successReq,
    notFound,
    conflictError,
} = require("../utils/constants");

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
        .catch((e) => next(e));
    // console.log(e);
    // if (e.name === "ValidationError") {
    //     res.status(badReq).send({
    //         message: `Article validation failed, fields required!`,
    //     });
    // } else {
    //     res.status(serverFailed).send({
    //         message: "An error has occured on the server",
    //     });
    // }
};

module.exports.getArticles = (req, res, next) => {
    Article.find({})
        .then((data) => {
            res.status(successReq).send([{ articles: data }]);
        })
        .catch((e) => next(e));
    //     if (e.name === "NotFoundError") {
    //         res.status(notFound).send({
    //             message: "Requested resource not found",
    //         });
    //     } else {
    //         res.status(serverFailed).send({
    //             message: "An error has occured on the server",
    //         });
    //     }
    // });
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
        .catch((e) => next(e));
    //     console.log(e);
    //     if (e.name === "ValidationError") {
    //         res.status(badReq).send({ message: "Invalid ID" });
    //     } else if (e.name === "DocumentNotFoundError") {
    //         res.status(notFound).send({
    //             message: "Requested Article not found",
    //         });
    //     } else {
    //         res.status(serverFailed).send({
    //             message: "An error has occured on the server",
    //         });
    //     }
    // });
};

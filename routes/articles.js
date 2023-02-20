const router = require("express").Router();

const {
    getArticles,
    createArticle,
    deleteArticle,
} = require("../controllers/article");
const { auth } = require("../middlewares/auth");
const {
    createArticleValidator,
    deleteArticleValidator,
} = require("../utils/validation");

router.get("/", auth, getArticles);
router.post("/", auth, createArticleValidator, createArticle);
router.delete("/:articleId", auth, deleteArticleValidator, deleteArticle);

module.exports = router;

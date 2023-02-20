const router = require("express").Router();
const { login, createUser } = require("../controllers/user");
const NotFoundError = require("../errors/not-found-error");
const articlesRouter = require("./articles");
const {
    loginValidator,
    registrationValidator,
} = require("../utils/validation");
const userRouter = require("./user");

router.use("/articles", articlesRouter);
router.use("/users", userRouter);
router.post("/signin", loginValidator, login);
router.post("/signup", registrationValidator, createUser);

router.use((req, res, next) => {
    next(new NotFoundError("This route does not exist"));
});

module.exports = router;

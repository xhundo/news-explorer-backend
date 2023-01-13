const router = require('express').Router();

const articlesRouter = require('./articles');

const userRouter = require('./user');

router.use('/articles', articlesRouter);
router.use('/users', userRouter);

module.exports = router;

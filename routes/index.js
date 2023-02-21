const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/not-found-error');
const { loginValidator, registerValidation } = require('../utils/validation');
const articlesRouter = require('./articles');

const userRouter = require('./user');

router.use('/articles', articlesRouter);
router.use('/users', userRouter);
router.post('/signin', loginValidator, login);
router.post('/signup', registerValidation, createUser);
router.use((req, res, next) => {
  next(new NotFoundError('The requested route does not exist'));
});

module.exports = router;

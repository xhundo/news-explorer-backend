const bcrypt = require('bcrypt');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const User = require('../models/user');
const { successReq, createSuccess, jwtSecret } = require('../utils/constants');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((data) => {
      res.status(successReq).send({ data });
    })
    .catch((e) => {
      if (e.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Requested user not found'));
      } else {
        next(e);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, name, password: hash })
      .then((user) => {
        res.status(createSuccess).send({
          id: user._id,
          name: user.name,
          email: user.email,

        });
      })
      .catch((e) => {
        if (e.name === 'ValidationError') {
          next(new ValidationError('User validation failed'));
        } else if (e.code === 11000) {
          next(new ConflictError('User already exist'));
        } else {
          next(e);
        }
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? jwtSecret : JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((e) => {
      next(new AuthError(e.message));
    });
};

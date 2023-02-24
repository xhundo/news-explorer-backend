const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-error');
const { jwtSecret } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Authorization required!'));
  }
  let payload;
  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(
      token,
      NODE_ENV !== 'production' ? jwtSecret : JWT_SECRET,
    );
  } catch (error) {
    next(new AuthError('Authorization required!'));
  }

  req.user = payload;

  next();
};

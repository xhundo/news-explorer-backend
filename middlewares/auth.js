const jwt = require('jsonwebtoken');
const { authError } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer  ')) {
    return res
      .status(authError)
      .send({ message: 'Authorization required' });
  }
  let payload;
  const token = authorization.replace('Bearer', ' ');

  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (error) {
    return res
      .statu(authError)
      .send({ message: 'Authorization required!' });
  }

  req.user = payload;

  next();
};

const { serverErrorMsg } = require('./constants');

module.exports.centralErrorHandler = (e, req, res, next) => {
  const { statusCode = 500, message } = e;

  res.status(statusCode).send({
    message: statusCode === 500 ? serverErrorMsg : message,
  });
};

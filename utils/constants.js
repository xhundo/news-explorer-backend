const successReq = 200;
const badReq = 400;
const serverFailed = 500;
const notFound = 404;
const createSuccess = 201;
const conflictError = 409;
const authError = 401;
const forbiddenError = 403;
const jwtSecret = 'dev-secret';

module.exports = {
  successReq,
  badReq,
  serverFailed,
  notFound,
  createSuccess,
  conflictError,
  authError,
  forbiddenError,
  jwtSecret,
};

const successReq = 200;
const badReq = 400;
const serverFailed = 500;
const notFound = 404;
const createSuccess = 201;
const conflictError = 409;
const authError = 401;
const jwtSecret = 'dev-secret';
const validationErrorMsg = 'Article validation failed, fields required!';
const notFoundErrorMsg = 'Requested resource not found';
const serverErrorMsg = 'An error has occured on the server';
const forbiddenErrorMsg = 'Access to the requested resource is forbidden';
const userValidationErrorMsg = 'User validation failed';
const conflictErrorMsg = 'User already exists';
const notFoundUser = 'Requested user not found';

module.exports = {
  successReq,
  badReq,
  serverFailed,
  notFound,
  createSuccess,
  conflictError,
  authError,
  jwtSecret,
  validationErrorMsg,
  notFoundErrorMsg,
  serverErrorMsg,
  forbiddenErrorMsg,
  userValidationErrorMsg,
  conflictErrorMsg,
  notFoundUser,
};

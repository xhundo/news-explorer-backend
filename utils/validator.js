const validator = require('validator');

module.exports.validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Incorrect link');
  }
  return value;
};

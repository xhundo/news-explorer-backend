const { conflictError } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictError;
  }
}

module.exports = ConflictError;

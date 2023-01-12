const { badReq } = require("../utils/constants");

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = badReq;
    }
}

module.exports = ValidationError;

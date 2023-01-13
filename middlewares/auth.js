const jwt = require("jsonwebtoken");
const AuthError = require("../errors/auth-error");

module.exports.auth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer  ")) {
        next(new AuthError("Authorization required!"));
    }
    let payload;
    const token = authorization.replace("Bearer", " ");

    try {
        payload = jwt.verify(token, "dev-secret");
    } catch (error) {
        next(new AuthError("Authorization required!"));
    }

    req.user = payload;

    next();
};

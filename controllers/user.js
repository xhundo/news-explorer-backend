const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ConflictError = require("../errors/conflict-error");
const ValidationError = require("../errors/validation-error");
const User = require("../models/user");
const {
    successReq,
    notFound,
    serverFailed,
    badReq,
    createSuccess,
    conflictError,
} = require("../utils/constants");

module.exports.getCurrentUser = (req, res, next) => {
    User.findById(req.user._id)
        .orFail()
        .then((data) => {
            res.status(successReq).send({ data });
        })
        .catch((e) => next(e));
    // if (e.name === "NotFoundError") {
    //     res.status(notFound).send({
    //         message: "Requested user not found",
    //     });
    // } else if (e.name === "ValidationError") {
    //     res.status(badReq).send({
    //         message: "Invalid user ID",
    //     });
    // } else {
    //     res.status(serverFailed).send({
    //         message: "An error has occured on the server",
    //     });
    // }
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
                if (e.name === "ValidationError") {
                    next(new ValidationError("User validation failed"));
                } else if (e.code === 11000) {
                    next(new ConflictError("User already exist"));
                } else {
                    next(e);
                }
            });
    });

    module.exports.login = (req, res, next) => {
        const { email, password } = req.body;
        const jwtSecret = "dev-secret";

        return User.findUserByCredentials(email, password)
            .then((user) => {
                const token = jwt.sign({ _id: user._id }, jwtSecret, {
                    expiresIn: "7d",
                });
                res.send({ token });
            })
            .catch((e) => {
                if (e) {
                    next(new ValidationError(e.message));
                } else {
                    next(e);
                }
            });
    };
};

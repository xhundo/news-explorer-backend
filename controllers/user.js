const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
    successReq,
    notFound,
    serverFailed,
    badReq,
    createSuccess,
    conflictError,
} = require("../utils/constants");

module.exports.getCurrentUser = (req, res) => {
    User.findById(req.user._id)
        .orFail()
        .then((data) => {
            res.status(successReq).send({ data });
        })
        .catch((e) => {
            if (e.name === "NotFoundError") {
                res.status(notFound).send({
                    message: "Requested user not found",
                });
            } else if (e.name === "ValidationError") {
                res.status(badReq).send({
                    message: "Invalid user ID",
                });
            } else {
                res.status(serverFailed).send({
                    message: "An error has occured on the server",
                });
            }
        });
};

module.exports.createUser = (req, res) => {
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
                console.log(e);
                if (e.name === "ValidationError") {
                    res.status(badReq).send({
                        message: "User validation failed",
                    });
                } else if (e.code === 11000) {
                    res.status(conflictError).send({
                        message: "User already exists",
                    });
                } else {
                    res.status(serverFailed).send({
                        message: "An error has occurred on the server",
                    });
                }
            });
    });
};

module.exports.login = (req, res) => {
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
            console.log(e);
            if (e) {
                res.send({ message: `${e.message}` });
            } else {
                res.status(serverFailed).send({
                    message: "An error has occured on the server",
                });
            }
        });
};

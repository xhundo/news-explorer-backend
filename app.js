const express = require("express");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/user");
const router = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { auth } = require("./middlewares/auth");
const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");
const NotFoundError = require("./errors/not-found-error");

const { PORT = 3001 } = process.env;

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/newsexplorer_db");

const app = express();

app.use(requestLogger);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.post(
    "/signin",
    // celebrate({
    //     body: Joi.object().keys({
    //         email: Joi.string().required(),
    //         password: Joi.string().required(),
    //     }),
    // }),
    login
);
app.post(
    "/signup",
    // celebrate({
    //     body: Joi.object().keys({
    //         email: Joi.string().required(),
    //         password: Joi.string().required(),
    //         name: Joi.string().required().min(2).max(30),
    //     }),
    // }),
    createUser
);

app.use(errorLogger);

app.use(errors());

app.use((e, res) => {
    const { statusCode = 500, message } = e;

    res.status(statusCode).send({
        message:
            statusCode === 500 ? `An error has occured on the server` : message,
    });
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}...`);
});
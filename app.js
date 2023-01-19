const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { login, createUser } = require("./controllers/user");
const router = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3002 } = process.env;

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/newsexplorer_db");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20000000000000000000,
    standardHeaders: true,
    legacyHeaders: false,
});

app.options("*", cors());

app.use(requestLogger);

app.use(cors());

app.use(limiter);

app.post(
    "/signin",
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
    login
);

app.post(
    "/signup",
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
            name: Joi.string().required().min(2).max(30),
        }),
    }),
    createUser
);

app.use("/", router);

app.use(errors());

app.use(errorLogger);

app.use((e, req, res, next) => {
    const { statusCode = 500, message } = e;

    res.status(statusCode).send({
        message:
            statusCode === 500 ? "An error has occured on the server" : message,
    });
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}...`);
});

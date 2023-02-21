const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./utils/limiter');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralErrorHandler } = require('./utils/centralized-handling');

const { PORT = 3002, DATABASE_URL } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DATABASE_URL);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.options('*', cors());

app.use(requestLogger);

app.use(cors());

app.use(limiter);

app.use('/', router);

app.use(errors());

app.use(errorLogger);

app.use((e, req, res, next) => centralErrorHandler(e, req, res, next));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}...`);
});

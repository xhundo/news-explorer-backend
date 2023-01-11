const express = require('express');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/user');
const router = require('./routes');

const { PORT = 3001 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/newsexplorer_db', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.post('/signin', login);
app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}...`);
});

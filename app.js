const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/newsexplorer_db', {
  useNewUrlParser: true,
});

const app = express();

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}...`);
});

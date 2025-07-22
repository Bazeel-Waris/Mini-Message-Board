const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const MessagesRouter = require('./routes/messages-router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.use('/', MessagesRouter);

app.listen(port, () => {
  console.log('Mini-Board Server is running');
});
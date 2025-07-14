const express = require('express');
const app = express();
const MessagesRouter = require('./routes/messages-router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.use('/', MessagesRouter);
app.use('/', MessagesRouter);

app.listen(3000, () => {
  console.log('Mini-Board Server is running');
});
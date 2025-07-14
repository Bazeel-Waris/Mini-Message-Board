const { Router } = require('express');
const MessagesRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// It display all messages
MessagesRouter.get('/', (req, res) => {
  res.render('index', { messages });
});

// It display the specific message by ID
MessagesRouter.get('/message/:id', (req, res) => {
  res.render('messageDetail', { message : messages[req.params.id]});
});

// It display the form to create a new message
MessagesRouter.get('/new', (req, res) => {
  res.render('newMessage');
});

// It handles the form submission to create a new message
MessagesRouter.post('/new', (req, res) => {
  messages.push({ text: req.body.text, user: req.body.user, added: new Date() });
  res.redirect('/');
});

module.exports = MessagesRouter;
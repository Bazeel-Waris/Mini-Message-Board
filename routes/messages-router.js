const { Router } = require('express');
const MessagesRouter = Router();
const Pool = require('../db/pool');

// It display all messages
MessagesRouter.get('/', async (req, res) => {
  // Fetch messages from the database
  const { rows } = await Pool.query('SELECT * FROM messages ORDER BY added DESC');
  const messages = rows.map(row => ({
    id: row.id,
    text: row.text,
    user: row.username,
    added: row.added
  }));
  console.log(messages);
  res.render('index', { messages });
});

// It display the specific message by ID
MessagesRouter.get('/message/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await Pool.query('SELECT * FROM messages WHERE id = $1', [id]);
  const row = rows[0];
  
  const message = {
    text: row.text,
    user: row.username,
    added: row.added
  };
  res.render('messageDetail', { message });
});

// It display the form to create a new message
MessagesRouter.get('/new', (req, res) => {
  res.render('newMessage');
});

// It handles the form submission to create a new message
MessagesRouter.post('/new', async (req, res) => {

  const { rows } = await Pool.query('INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING *', [req.body.text, req.body.user]);

  res.redirect('/');
});

module.exports = MessagesRouter;
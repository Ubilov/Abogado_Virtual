require('dotenv').config();
const express = require('express');
const path = require('path');
const { handler } = require('./netlify/functions/chat');

require('./build');
const app = express();
app.use(express.json({ limit: '16kb' }));
app.post('/api/chat', async (req, res) => {
  const result = await handler({ httpMethod: 'POST', body: JSON.stringify(req.body) });
  res.status(result.statusCode).type('json').send(result.body);
});
app.use(express.static(path.join(__dirname, 'dist')));
app.listen(process.env.PORT || 3000, () => console.log('Servidor listo'));

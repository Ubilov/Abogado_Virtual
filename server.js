require('dotenv').config();
const express = require('express');
const path = require('path');
const { handler } = require('./netlify/functions/chat');
require('./build');
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '6mb' }));
app.post('/api/chat', async (req, res) => {
  try {
    const result = await handler({ httpMethod: 'POST', body: JSON.stringify(req.body) });
    res.status(result.statusCode).set(result.headers || {}).send(result.body);
  } catch (error) {
    console.error('Error interno', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});
app.use(express.static(path.join(__dirname, 'dist')));
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'El archivo adjunto supera el límite permitido.' });
  return res.status(400).json({ error: 'La solicitud no tiene un formato válido.' });
});
app.listen(process.env.PORT || 3000, () => console.log('Abogado Virtual disponible en puerto', process.env.PORT || 3000));

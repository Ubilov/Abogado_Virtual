require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
  const { mensaje } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: mensaje }],
    }); 
    
    const respuesta = chatCompletion.choices[0].message.content;
    res.json({ respuesta });
  } catch (error) {
    console.error('❌ Error con OpenAI:', error.response?.data || error.message);
    res.status(500).json({ respuesta: 'Error al procesar tu consulta.' });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

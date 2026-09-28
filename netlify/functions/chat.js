const OpenAI = require('openai');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido.' }) };
  }
  let mensaje;
  try {
    ({ mensaje } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Solicitud inválida.' }) };
  }
  if (typeof mensaje !== 'string' || !mensaje.trim() || mensaje.length > 4000) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Escribí una consulta de hasta 4000 caracteres.' }) };
  }
  if (!process.env.OPENAI_API_KEY) {
    return { statusCode: 503, body: JSON.stringify({ error: 'Falta configurar OPENAI_API_KEY en el servidor.' }) };
  }
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Orientá sobre derecho paraguayo en español claro. Identificá incertidumbres y no inventes artículos ni jurisprudencia. Aclará que la orientación no reemplaza asesoramiento profesional.' },
        { role: 'user', content: mensaje.trim() }
      ]
    });
    return { statusCode: 200, body: JSON.stringify({ respuesta: result.choices[0]?.message?.content || 'No se obtuvo respuesta.' }) };
  } catch (error) {
    console.error('OpenAI:', error.status || error.message);
    return { statusCode: 502, body: JSON.stringify({ error: 'No fue posible obtener una respuesta. Revisá la configuración y los registros del servidor.' }) };
  }
};

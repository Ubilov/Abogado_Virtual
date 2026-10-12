const pregunta = document.getElementById('pregunta');
const respuesta = document.getElementById('respuesta');
const boton = document.getElementById('enviar-consulta');
if (pregunta && respuesta && boton) boton.addEventListener('click', async () => {
  const mensaje = pregunta.value.trim();
  if (!mensaje || boton.disabled) return;
  boton.disabled = true;
  respuesta.textContent = 'Procesando la consulta…';
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje })
    });
    const raw = await res.text();
    let data;
    try { data = JSON.parse(raw); } catch { throw new Error('El servidor no devolvió una respuesta válida. Revisá la configuración de Netlify.'); }
    if (!res.ok) throw new Error(data.error || 'No se pudo procesar la consulta.');
    respuesta.textContent = data.reply || data.respuesta || 'La IA no devolvió texto.';
  } catch (error) {
    respuesta.textContent = error.message || 'No se pudo conectar con el servidor.';
  } finally {
    boton.disabled = false;
  }
});

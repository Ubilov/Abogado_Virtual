const pregunta = document.getElementById('pregunta');
const respuesta = document.getElementById('respuesta');
const boton = document.getElementById('enviar-consulta');

boton.addEventListener('click', async () => {
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
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'No se pudo procesar la consulta.');
    respuesta.textContent = data.respuesta;
  } catch (error) {
    respuesta.textContent = error.message || 'No se pudo conectar con el servidor.';
  } finally {
    boton.disabled = false;
  }
});

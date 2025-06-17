// js/controlArchivos.js
const claveSecretaInvitados = 'MiSuperClaveSecreta2025!';

function xorDecrypt(data, key) {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

// Función para cargar el archivo encriptado y devolver un objeto JS
async function cargarInvitados() {
  console.log("Iniciando carga del archivo...");

    try {
      const response = await fetch('./data/invitados.bbss');
      if (!response.ok) throw new Error('No se pudo cargar el archivo: ' + response.status);
      
      const base64Texto = await response.text();
      console.log("📥 Archivo encriptado cargado:", base64Texto.slice(0, 100), "...");

      // Decodificar base64
      const cifrado = atob(base64Texto);

      // Desencriptar XOR con la clave
      const textoDesencriptado = xorDecrypt(cifrado, claveSecretaInvitados);
      console.log("🔓 Texto desencriptado:", textoDesencriptado.slice(0, 100), "...");

      // Parsear JSON
      const invitados = JSON.parse(textoDesencriptado);
      console.log('🎉 Invitados desencriptados:', invitados);

      const invitadosDiv = document.getElementById('invitados');
      invitadosDiv.innerHTML = invitados.invitados.map(inv => `<p>${inv.nombre}</p>`).join('');

      return invitados;
    } catch (error) {
      console.error('❌ Error cargando invitados:', error);
      return null;
    }
}

// Ejecuta la función al cargar la página
cargarInvitados();

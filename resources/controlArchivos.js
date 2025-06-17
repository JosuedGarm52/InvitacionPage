// js/controlArchivos.js
const claveSecretaInvitados = 'MiSuperClaveSecreta2025!';
let objInvitados;

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
      //console.log("📥 Archivo encriptado cargado:", base64Texto.slice(0, 100), "...");

      // Decodificar base64
      const cifrado = atob(base64Texto);

      // Desencriptar XOR con la clave
      const textoDesencriptado = xorDecrypt(cifrado, claveSecretaInvitados);
      console.log("🔓 Texto desencriptado");

      // Parsear JSON
      objInvitados = JSON.parse(textoDesencriptado);
      //console.log('🎉 Invitados desencriptados:', invitados);

      const pnumberBuscado = obtenerPnumberDesdeURL();
      //console.log("number: ", pnumberBuscado);

      const invitadoValido = objInvitados.invitados.find(inv => Number(inv.pnumber) === Number(pnumberBuscado));

      if (invitadoValido) {
        //console.log("🎉 Invitado encontrado:", invitadoValido);
        document.getElementById('con-invitacion').classList.remove('d-none');
      } else {
        //console.warn("❌ No se encontró un invitado con ese pnumber.");
        document.getElementById('sin-invitacion').classList.remove('d-none');
      }
    } catch (error) {
      console.error('❌ Error cargando invitados:', error);
      return null;
    }
}

function obtenerPnumberDesdeURL() {
    const hash = window.location.hash;
    const posibleNumero = hash.replace('#', '');
    return /^\d+$/.test(posibleNumero) ? posibleNumero : null;
}

// Ejecuta la función al cargar la página
cargarInvitados();
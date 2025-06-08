// js/controlArchivos.js
const claveSecretaInvitados = 'MiSuperClaveSecreta2025!';

// Función para cargar el archivo encriptado y devolver un objeto JS
async function cargarInvitados() {
  try {
    console.log('🔄 Iniciando carga del archivo...');
    const response = await fetch('./data/invitados.bbss');
    if (!response.ok) throw new Error('No se pudo cargar el archivo: ' + response.status);

    const textoEncriptado = await response.text();
    console.log('📥 Archivo encriptado cargado:', textoEncriptado.slice(0, 50), '...');

    // Desencriptar
    const bytes = CryptoJS.AES.decrypt(textoEncriptado, claveSecretaInvitados);
    const textoDesencriptado = bytes.toString(CryptoJS.enc.Utf8);

    if (!textoDesencriptado) throw new Error('El texto desencriptado está vacío, posible clave incorrecta o formato inválido.');
    console.log('🔓 Texto desencriptado:', textoDesencriptado.slice(0, 100), '...');

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

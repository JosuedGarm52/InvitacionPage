const claveSecretaInvitados = 'MiSuperClaveSecreta2025!';
let objInvitados = null;

function xorDecrypt(data, key) {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function obtenerPnumberDesdeURL() {
  const hash = window.location.hash;
  const posibleNumero = hash.replace('#', '');
  return /^\d+$/.test(posibleNumero) ? Number(posibleNumero) : null;
}

function validarInvitado() {
  const hostname = window.location.hostname;

  // Excluir validación si es entorno local
  if (hostname === '127.0.0.1' || hostname === 'localhost') {
    return { nombre: 'Local Dev', pnumber: 0 }; // o simplemente: return null;
  }

  const pnumber = obtenerPnumberDesdeURL();
  if (!objInvitados || !Array.isArray(objInvitados.invitados)) return null;

  return objInvitados.invitados.find(inv => Number(inv.pnumber) === pnumber) || null;
}

function mostrarConInvitacion() {
  document.getElementById('con-invitacion')?.classList.remove('d-none');
}

function mostrarSinInvitacion() {
  document.getElementById('sin-invitacion')?.classList.remove('d-none');
}

// Esta función actualiza el objeto objInvitados y vuelve a validar
async function actualizarInvitados() {
  console.log("🔄 Cargando archivo de invitados...");

  try {
    const response = await fetch('./data/invitados.bbss');
    if (!response.ok) throw new Error('No se pudo cargar el archivo: ' + response.status);

    const base64Texto = await response.text();
    const cifrado = atob(base64Texto);
    const textoDesencriptado = xorDecrypt(cifrado, claveSecretaInvitados);

    objInvitados = JSON.parse(textoDesencriptado);
    console.log("✅ Invitados actualizados.");

    const invitado = validarInvitado();
    if (invitado) {
      console.log("🎉 Invitado válido encontrado tras actualización:", invitado);
      mostrarConInvitacion();
    } else {
      console.warn("❌ No se encontró invitado tras actualización.");
      mostrarSinInvitacion();
    }

  } catch (error) {
    console.error('❌ Error al actualizar invitados:', error);
  }
}
const claveSecretaInvitados = 'MiSuperClaveSecreta2025!';
let objInvitados = null;
let datosBodaGlobal = null;
let invitadoActual = null;

function xorDecrypt(base64Text, key) {
  // Decodificar base64 a bytes
  const bytes = Uint8Array.from(atob(base64Text), c => c.charCodeAt(0));
  const keyBytes = new TextEncoder().encode(key);

  // XOR byte a byte
  const resultBytes = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    resultBytes[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
  }

  // Decodificar bytes a UTF-8 string
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(resultBytes);
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
    invitadoActual =  { 
      nombre: 'Local Dev', 
      pnumber: 1 ,
      cnumber: 2,
    }; // o simplemente: return null;
    return invitadoActual;
  }

  const pnumber = obtenerPnumberDesdeURL();
  if (!objInvitados || !Array.isArray(objInvitados.invitados)) return null;

  invitadoActual =  objInvitados.invitados.find(inv => Number(inv.pnumber) === pnumber) || null;
  return invitadoActual;
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
    //const cifrado = atob(base64Texto);
    const textoDesencriptado = xorDecrypt(base64Texto, claveSecretaInvitados);

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

async function cargarDatosBoda(isLocal = false) {
    try {
      if(isLocal) {
          datosBodaGlobal = {
              nameEsposo: "Hector",
              nameEsposa: "Sara",
              direccionMapC : "maps.google.com/?q=Dirección+de+la+iglesia",
              direccionMapS : "maps.google.com/?q=Dirección+de+la+boda",
              madreNovia: "María Isabel González Martínez",
              padreNovia: "Carlos Eduardo Fernández López",
              madreNovio: "Ana Patricia Ruiz Sánchez",
              padreNovio: "Javier Alberto Morales Díaz",
              datosBancarios: "https://www.ejemplo.com/datos-bancarios",
              consultaNovia: "whatsapp.com/1234567890",
              consultaNovio: "whatsapp.com/0987654321",
              encuesta: "form.miform.com/viewform?usp=preview",
              urlEncuestaPrueba: "form.miform.com/viewform?usp=pp_url&entry.1882687068=333",
              datosBancarios: "data/datos.txt"
          };
          console.warn("⚠️ Modo local detectado. Usando datos de boda predeterminados.");
          return;
      }
      const response = await fetch('./data/datosBoda.bbss');
      if (!response.ok) throw new Error('No se pudo cargar datos de boda');

      const base64Texto = await response.text();
      // No hacer atob aquí porque xorDecrypt ya lo hace
      const textoPlano = xorDecrypt(base64Texto, claveSecretaInvitados);

      datosBodaGlobal = JSON.parse(textoPlano);
      console.log("✅ Datos de boda cargados:", datosBodaGlobal);

    } catch (error) {
      console.error("❌ Error al cargar datos de boda:", error);
    }
}
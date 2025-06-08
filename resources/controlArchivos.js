// controlArchivos.js
const claveSecretaInvitados = 'MiSuperClaveSecreta2025!';

// Función para cargar el archivo encriptado y devolver un objeto JS
export async function cargarInvitados() {
    try {
        // Cargamos el archivo bbss como texto
        const response = await fetch('./data/invitados.bbss');
        const textoEncriptado = await response.text();

        // Desencriptamos usando CryptoJS
        const bytes = CryptoJS.AES.decrypt(textoEncriptado, claveSecretaInvitados);
        const textoDesencriptado = bytes.toString(CryptoJS.enc.Utf8);

        // Parseamos el JSON resultante a un objeto
        const invitados = JSON.parse(textoDesencriptado);

        console.log('🎉 Invitados desencriptados:', invitados);
        return invitados;
    } catch (error) {
        console.error('❌ Error cargando invitados:', error);
        return null;
    }
}

// js/controlArchivos.js
const claveSecretaInvitados = 'MiSuperClaveSecreta2025!';

// Función para cargar el archivo encriptado y devolver un objeto JS
async function cargarInvitados() {
    try {
        // Carga el archivo bbss como texto (¡funciona bien en GitHub Pages!)
        const response = await fetch('./data/invitados.bbss');
        if (!response.ok) throw new Error('No se pudo cargar el archivo');
        const textoEncriptado = await response.text();

        // Desencripta usando CryptoJS (asegúrate de incluir la librería)
        const bytes = CryptoJS.AES.decrypt(textoEncriptado, claveSecretaInvitados);
        const textoDesencriptado = bytes.toString(CryptoJS.enc.Utf8);

        // Parseamos el JSON resultante a un objeto
        const invitados = JSON.parse(textoDesencriptado);

        console.log('🎉 Invitados desencriptados:', invitados);

        // Ejemplo de uso: mostrar en pantalla
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

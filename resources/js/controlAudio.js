const audio = document.getElementById('audio-boda');
const icon = document.getElementById('main-audio-icon');

function toggleMute() {
    audio.muted = !audio.muted;
    icon.className = audio.muted ? 'fas fa-volume-mute text-xl' : 'fas fa-volume-up text-xl';
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play().catch(err => {
        console.warn("El navegador bloqueó el autoplay. Se necesita interacción del usuario.");
        });
    } else {
        audio.pause();
    }
}

// Opcional: inicia el audio después del primer clic en cualquier parte
document.addEventListener('click', () => {
    if (audio.paused && !audio._started) {
        audio.play().then(() => {
        audio._started = true;
        }).catch(() => {});
    }
}, { once: true });
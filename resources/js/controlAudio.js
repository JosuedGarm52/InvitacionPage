const audio = document.getElementById('audio-boda');
const icon = document.getElementById('main-audio-icon');
const volumeSlider = document.getElementById('volume-slider');

let isMuted = false; // estado mute claro

// Funciones para mute y unmute
function mute() {
    audio.muted = true;
    isMuted = true;
    icon.className = 'fas fa-volume-mute text-xl';
}

function unmute() {
    audio.muted = false;
    isMuted = false;
    icon.className = 'fas fa-volume-up text-xl';
}

// Toggle mute que usa el estado claro
function toggleMute() {
    if (isMuted) {
        unmute();
    } else {
        mute();
    }
}

// Play / pause toggle
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Cambiar volumen con el slider
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    if (isMuted && e.target.value > 0) {
        unmute(); // Quitar mute si sube volumen
    }
});

// Iniciar audio después de la primera interacción
document.addEventListener('click', () => {
    if (audio.paused && !audio._started) {
        audio.volume = volumeSlider.value;
        audio.play().then(() => {
            audio._started = true;
            unmute();  // aseguramos que esté desmuted al iniciar
        }).catch(() => {});
    }
}, { once: true });

window.addEventListener('load', () => {
    const audio = document.getElementById('audio-boda');
    const icon = document.getElementById('main-audio-icon');
    audio.volume = 0.5;  // o el volumen que quieras
    audio.play().catch((error) => {
        console.warn('Autoplay fue bloqueado:', error);
        // Cambiar icono a mute para avisar usuario
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    });
});

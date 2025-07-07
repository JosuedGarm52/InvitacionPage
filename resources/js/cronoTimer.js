const targetDate = new Date("2025-09-13T18:00:00");

const diasEl = document.getElementById('dias');
const horasEl = document.getElementById('horas');
const minutosEl = document.getElementById('minutos');
const segundosEl = document.getElementById('segundos');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    diasEl.textContent = '00';
    horasEl.textContent = '00';
    minutosEl.textContent = '00';
    segundosEl.textContent = '00';
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  diasEl.textContent = String(dias).padStart(2, '0');
  horasEl.textContent = String(horas).padStart(2, '0');
  minutosEl.textContent = String(minutos).padStart(2, '0');
  segundosEl.textContent = String(segundos).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

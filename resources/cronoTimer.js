const targetDate = new Date("2025-12-31T23:59:59");

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsStatic = document.querySelector('#seconds .static');
const secondsAnimated = document.querySelector('#seconds .animated');
const messageEl = document.getElementById('message');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsStatic.textContent = '00';
    secondsAnimated.textContent = '00';
    messageEl.textContent = '🎉 ¡El día ya sucedió!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  flipNumber(daysEl, days);
  flipNumber(hoursEl, hours);
  flipNumber(minutesEl, minutes);
  animateSeconds(seconds);
}

function flipNumber(element, newNumber) {
  const formatted = String(newNumber).padStart(2, '0');
  if (element.textContent !== formatted) {
    element.classList.add('flip');
    setTimeout(() => {
      element.textContent = formatted;
      element.classList.remove('flip');
    }, 500);
  }
}

function animateSeconds(newNumber) {
  const formatted = String(newNumber).padStart(2, '0');
  if (secondsStatic.textContent !== formatted) {
    secondsAnimated.textContent = formatted;
    secondsAnimated.classList.add('slide');
    setTimeout(() => {
      secondsStatic.textContent = formatted;
      secondsAnimated.classList.remove('slide');
    }, 500);
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll('.animar-scroll');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // opcional: animar sólo una vez
      }
    });
  }, { threshold: 0.1 });

  elementos.forEach(el => {
    observer.observe(el);
  });
});
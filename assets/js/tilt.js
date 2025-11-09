// assets/js/tilt.js
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.tilt');
  const tiltEffect = (card) => {
    const height = card.clientHeight;
    const width = card.clientWidth;
    card.addEventListener('mousemove', (e) => {
      const xVal = e.layerX;
      const yVal = e.layerY;
      const xRotation = 20 * ((yVal - height / 2) / height);
      const yRotation = -20 * ((xVal - width / 2) / width);
      card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    });
  };
  cards.forEach((c) => tiltEffect(c));
});

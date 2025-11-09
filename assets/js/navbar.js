// assets/js/navbar.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  // Alterna menu mobile
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Tab bar animada: sublinha a seção ativa ao rolar
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links li a');
  function changeActive() {
    let index = sections.length;
    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
    navItems.forEach((link) => link.classList.remove('active'));
    navItems[index].classList.add('active');
  }
  changeActive();
  window.addEventListener('scroll', changeActive);
});

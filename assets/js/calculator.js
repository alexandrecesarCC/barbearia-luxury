// assets/js/calculator.js
document.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('service-type');
  const quantityInput = document.getElementById('quantity');
  const btn = document.getElementById('calc-btn');
  const result = document.getElementById('calc-result');
  const priceMap = { corte: 30, barba: 20, tratamento: 40 };
  btn.addEventListener('click', () => {
    const tipo = serviceSelect.value;
    const qntd = parseInt(quantityInput.value);
    if (!qntd || qntd < 1) {
      result.textContent = 'Digite uma quantidade válida.';
      return;
    }
    const total = priceMap[tipo] * qntd;
    result.textContent = `Total: R$ ${total.toFixed(2)}`;
  });
});

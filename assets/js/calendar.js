// assets/js/calendar.js
document.addEventListener('DOMContentLoaded', () => {
  const calendarWrapper = document.getElementById('calendar-wrapper');
  const calendarBody = document.getElementById('calendar-body');
  const monthYear = document.getElementById('month-year');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const input = document.getElementById('client-info');
  let date = new Date();
  let selectedDate = null;

  function renderCalendar() {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const monthNames = [
      'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
    ];
    monthYear.textContent = `${monthNames[month]} ${year}`;
    // Limpa dias existentes
    calendarBody.innerHTML = '';
    // Preencher espaços vazios
    for (let i = 0; i < firstDay; i++) {
      calendarBody.appendChild(document.createElement('div'));
    }
    for (let day = 1; day <= lastDate; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = day;
      // Marcar hoje
      if (
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
      ) {
        dayDiv.style.background = 'rgba(255,255,255,0.3)';
      }
      dayDiv.addEventListener('click', () => {
        selectedDate = new Date(year, month, day);
        input.value = `${input.value.split('@')[0] || ''}@${day}/${month+1}/${year}`;
        calendarWrapper.classList.add('hidden');
      });
      calendarBody.appendChild(dayDiv);
    }
  }
  prevBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });
  nextBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
  // Mostrar calendário ao focar no input
  input.addEventListener('focus', () => {
    calendarWrapper.classList.remove('hidden');
  });
  renderCalendar();
});

/*
 * Script for the Barbearia Luxury page
 * Este arquivo contém a lógica para:
 *  - Menu responsivo (navegação) em telas pequenas;
 *  - Efeito tilt suave nos cartões de serviço;
 *  - Calendário interativo para escolha de datas;
 *  - Sistema de reserva com confirmação (serviço, data e horário);
 *  - Formulário de newsletter com mensagem de sucesso;
 *  - Chatbot simples com respostas automáticas;
 *  - Modal de perfil para exibir detalhes dos profissionais.
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Controle do menu mobile.
   * Alterna a classe `open` na lista de links para mostrar ou ocultar quando o botão
   * de menu é clicado em telas menores. Também atualiza o atributo `aria-expanded`.
   */
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks  = document.querySelector('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!expanded));
    });
  }

  /**
   * Efeito de tilt simples nos cartões de serviço.
   * Calcula a rotação com base na posição do mouse em relação ao centro do cartão.
   * O efeito é resetado quando o cursor sai do cartão.
   */
  // Efeito tilt suave nos cartões de serviço. Cada cartão gira levemente conforme o movimento do mouse.
  const serviceCardsTilt = document.querySelectorAll('.service-cards .card');
  serviceCardsTilt.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / rect.height * 10;
      const rotateY = (x - rect.width / 2) / rect.width * -10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /**
   * Newsletter form.
   * Quando o usuário se inscreve na newsletter, exibimos uma mensagem de agradecimento
   * e informamos sobre o desconto no primeiro serviço. A inscrição não envia dados reais.
   */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = /** @type {HTMLInputElement} */(newsletterForm.querySelector('input[type="email"]'));
      if (emailInput && emailInput.value) {
        alert(`Obrigado por se inscrever, ${emailInput.value}! Você receberá 10% de desconto no seu primeiro serviço.`);
        emailInput.value = '';
      }
    });
  }

  /**
   * Calendário interativo.
   * Renderiza os dias do mês atual, permite navegar para meses anteriores e posteriores,
   * e destaca o dia selecionado. A data selecionada é usada para confirmar reservas.
   */
  const calendarGrid  = document.getElementById('calendarGrid');
  const calendarTitle = document.getElementById('calendarTitle');
  const prevBtn       = document.getElementById('prevMonth');
  const nextBtn       = document.getElementById('nextMonth');
  let currentDate     = new Date();

  function renderCalendar(date) {
    if (!calendarGrid || !calendarTitle) return;
    calendarGrid.innerHTML = '';
    const year  = date.getFullYear();
    const month = date.getMonth();
    // Nome do mês e ano (ex.: "novembro de 2025")
    calendarTitle.textContent = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    // Dias da semana
    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    daysOfWeek.forEach(day => {
      const cell = document.createElement('div');
      cell.textContent = day;
      cell.classList.add('muted');
      calendarGrid.appendChild(cell);
    });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Espaços vazios antes do primeiro dia
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      calendarGrid.appendChild(blank);
    }
    // Criar botões para cada dia do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = day;
      button.addEventListener('click', () => {
        // Remover seleção de outros botões
        calendarGrid.querySelectorAll('button.selected').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
      });
      calendarGrid.appendChild(button);
    }
  }

  // Renderiza o calendário inicialmente
  renderCalendar(currentDate);
  // Navegação entre meses
  prevBtn?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });
  nextBtn?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  /**
   * Confirmação de reservas.
   * Obtém os dados do cliente, o dia e horário selecionados e exibe um alerta de confirmação.
   */
  /**
   * Booking confirmation.
   * Ao clicar em Confirmar, obtemos os dados do cliente, serviço, data e horário
   * selecionados. Se algum campo estiver vazio, alertamos o usuário. Caso
   * contrário, exibimos uma mensagem de confirmação formatada.
   */
  const confirmBtn = document.getElementById('confirmBooking');
  if (confirmBtn && calendarGrid) {
    confirmBtn.addEventListener('click', () => {
      const nameEl    = /** @type {HTMLInputElement|null} */(document.getElementById('clientName'));
      const contactEl = /** @type {HTMLInputElement|null} */(document.getElementById('clientContact'));
      const serviceEl = /** @type {HTMLSelectElement|null} */(document.getElementById('service-select'));
      const slotEl    = /** @type {HTMLSelectElement|null} */(document.getElementById('slotSelect'));
      const name      = nameEl?.value || '';
      const contact   = contactEl?.value || '';
      const service   = serviceEl?.value || '';
      const slot      = slotEl?.value || '';
      const selectedDateButton = calendarGrid.querySelector('button.selected');
      const dateLabel = selectedDateButton ?
        `${selectedDateButton.textContent} de ${currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}` :
        '';
      if (!name || !contact || !service || !slot || !selectedDateButton) {
        alert('Por favor, preencha todos os campos e selecione uma data para confirmar sua reserva.');
        return;
      }
      alert(`Reserva confirmada!\n\nCliente: ${name}\nServiço: ${service}\nData: ${dateLabel}\nHorário: ${slot}\nContato: ${contact}\n\nAgradecemos a sua preferência.`);
      // Limpar formulário opcionalmente após confirmar
      nameEl.value = '';
      contactEl.value = '';
      serviceEl.value = '';
      slotEl.value = '';
      // Remover seleção de data
      calendarGrid.querySelectorAll('button.selected').forEach(btn => btn.classList.remove('selected'));
    });
  }

  /**
   * Modal de perfil para os barbeiros.
   * Ao clicar em um cartão da equipe, preenche e exibe um modal com foto, nome e biografia.
   */
  const profileModal    = document.getElementById('profileModal');
  const modalPhotoElem  = profileModal?.querySelector('.modal-photo');
  const modalNameElem   = profileModal?.querySelector('.modal-name');
  const modalBioElem    = profileModal?.querySelector('.modal-bio');
  const closeModalBtn   = profileModal?.querySelector('.close-modal');
  const teamCards       = document.querySelectorAll('.team-card');
  if (profileModal && modalPhotoElem && modalNameElem && modalBioElem && closeModalBtn) {
    teamCards.forEach(card => {
      card.addEventListener('click', () => {
        const name  = card.getAttribute('data-name');
        const bio   = card.getAttribute('data-bio');
        const photo = card.getAttribute('data-photo');
        modalPhotoElem.innerHTML = photo ? `<img src="${photo}" alt="${name}">` : '';
        modalNameElem.textContent = name || '';
        modalBioElem.textContent  = bio || '';
        profileModal.classList.remove('hidden');
      });
    });
    // Fechar modal ao clicar no botão de fechar
    closeModalBtn.addEventListener('click', () => {
      profileModal.classList.add('hidden');
    });
    // Fechar modal ao clicar fora do conteúdo
    profileModal.addEventListener('click', (event) => {
      if (event.target === profileModal) {
        profileModal.classList.add('hidden');
      }
    });
  }

  /**
   * Modal de serviço para exibir detalhes dos cortes.
   * Ao clicar em um cartão de serviço, abrimos um modal com o nome do serviço
   * e uma descrição completa armazenada no atributo data-details.
   */
  const serviceModalEl      = document.getElementById('serviceModal');
  const serviceModalTitleEl = serviceModalEl?.querySelector('.service-modal-title');
  const serviceModalDescEl  = serviceModalEl?.querySelector('.service-modal-desc');
  const closeServiceModalBtn = serviceModalEl?.querySelector('.close-service-modal');
  const serviceCardsModal   = document.querySelectorAll('.service-cards .card');
  if (serviceModalEl && serviceModalTitleEl && serviceModalDescEl && closeServiceModalBtn) {
    serviceCardsModal.forEach(card => {
      card.addEventListener('click', () => {
        const title   = card.querySelector('h3')?.textContent || '';
        const details = card.getAttribute('data-details') || '';
        serviceModalTitleEl.textContent = title;
        serviceModalDescEl.textContent  = details;
        serviceModalEl.classList.remove('hidden');
      });
    });
    closeServiceModalBtn.addEventListener('click', () => {
      serviceModalEl.classList.add('hidden');
    });
    serviceModalEl.addEventListener('click', (event) => {
      if (event.target === serviceModalEl) {
        serviceModalEl.classList.add('hidden');
      }
    });
  }

  /**
   * Chatbot simples.
   * O chat é ativado por um botão flutuante. Mensagens do usuário
   * são exibidas no painel e uma resposta automática é gerada com base
   * em palavras-chave. A janela de chat pode ser aberta/fechada.
   */
  const chatToggle   = document.getElementById('chatToggle');
  const chatWindow   = document.getElementById('chatWindow');
  const chatClose    = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput    = document.getElementById('chatInput');
  const chatSend     = document.getElementById('chatSend');

  /**
   * Adiciona uma nova mensagem ao chat.
   * @param {string} text Texto da mensagem
   * @param {'user'|'bot'} type Tipo de mensagem (usuário ou bot)
   */
  function addMessage(text, type) {
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.classList.add('message');
    msg.classList.add(type);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    // Scroll para mostrar a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * Gera uma resposta automática com base em palavras-chave simples.
   * @param {string} input Texto digitado pelo usuário
   * @returns {string} Resposta automática
   */
  function generateResponse(input) {
    const text = input.toLowerCase();
    if (text.includes('horário') || text.includes('agenda') || text.includes('agendar')) {
      return 'Para reservar um horário, selecione o serviço, data e horário na seção de Agendamento. Ficaremos felizes em atendê-lo!';
    }
    if (text.includes('serviço') || text.includes('corte') || text.includes('barba')) {
      return 'Oferecemos cortes clássicos, barbas premium e tratamentos faciais. Consulte nossas opções em “Serviços”.';
    }
    if (text.includes('preço') || text.includes('valor')) {
      return 'Os valores variam conforme o plano ou serviço. Veja nossos planos ou fale diretamente com nossa equipe no salão.';
    }
    return 'Obrigado pela mensagem! Em breve responderemos com mais detalhes.';
  }

  /**
   * Envia a mensagem digitada e gera a resposta automática.
   */
  function sendChat() {
    if (!chatInput || !chatInput.value.trim()) return;
    const userMessage = chatInput.value.trim();
    addMessage(userMessage, 'user');
    chatInput.value = '';
    // Gera resposta após pequena pausa para simular processamento
    setTimeout(() => {
      const response = generateResponse(userMessage);
      addMessage(response, 'bot');
    }, 500);
  }

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden');
    });
  }
  chatClose?.addEventListener('click', () => {
    chatWindow?.classList.add('hidden');
  });
  chatSend?.addEventListener('click', sendChat);
  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChat();
    }
  });
});
/* Menu mobile */
const toggle = document.querySelector('.nav__toggle');
const links  = document.querySelector('.nav__links');
if (toggle){
  toggle.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

/* Tabbar navegação suave */
document.querySelectorAll('.tab').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    b.classList.add('active');
    const target = document.querySelector(b.dataset.go);
    if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* Calculadora */
const calc = document.querySelector('.calc');
const totalEl = document.getElementById('calcTotal');
if (calc){
  calc.addEventListener('change', ()=>{
    const sum = [...calc.querySelectorAll('input[type="checkbox"]:checked')]
      .map(i => Number(i.dataset.price)).reduce((a,b)=>a+b,0);
    totalEl.textContent = `R$ ${sum}`;
  });
}

/* One Field Form – expande quando digita/clica */
const one = document.getElementById('oneField');
const more = document.querySelector('.onefield__more');
if (one && more){
  const openMore = ()=> more.hidden = false;
  one.addEventListener('focus', openMore);
  one.addEventListener('input', openMore);
  document.getElementById('oneFieldLogin')?.addEventListener('click', ()=>{
    alert('Login simulado (demo).');
  });
}

/* Calendário simples (expansível) */
const grid = document.querySelector('.calendar__grid');
const title = document.getElementById('monthYear');
const prev = document.querySelector('.calprev');
const next = document.querySelector('.calnext');

let cur = new Date();

function renderCalendar(base){
  if(!grid || !title) return;
  grid.innerHTML = '';
  const y = base.getFullYear(), m = base.getMonth();
  title.textContent = base.toLocaleString('pt-BR', {month:'long', year:'numeric'});

  const first = new Date(y,m,1);
  const startDay = first.getDay(); // 0-dom
  const daysInMonth = new Date(y,m+1,0).getDate();

  // cabeçalho semana
  ['D','S','T','Q','Q','S','S'].forEach(ch=>{
    const hd = document.createElement('div');
    hd.textContent = ch;
    hd.className = 'cell muted';
    grid.appendChild(hd);
  });

  // espaços em branco até o primeiro dia
  for (let i=0;i<startDay;i++){
    const blank = document.createElement('div');
    blank.className = 'cell muted'; grid.appendChild(blank);
  }

  // dias
  for(let d=1; d<=daysInMonth; d++){
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'cell';
    cell.textContent = d;
    cell.addEventListener('click', ()=>{
      document.getElementById('slotSelect')?.focus();
    });
    grid.appendChild(cell);
  }
}
if (grid){ renderCalendar(cur); }
prev?.addEventListener('click', ()=>{ cur.setMonth(cur.getMonth()-1); renderCalendar(cur); });
next?.addEventListener('click', ()=>{ cur.setMonth(cur.getMonth()+1); renderCalendar(cur); });

import './router.js';

// Menu mobile
const toggle = document.querySelector('.nav__toggle');
const links  = document.querySelector('.nav__links');
if (toggle){
  toggle.addEventListener('click', () => {
    const open = links?.dataset.open === '1';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.dataset.open = open ? '0' : '1';
    toggle.setAttribute('aria-expanded', String(!open));
  });
}

// Tabbar
document.querySelectorAll('.tab').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('is-active'));
    b.classList.add('is-active');
    const t = document.querySelector(b.dataset.go);
    t?.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Calculadora
const calc = document.querySelector('.calc');
const totalEl = document.getElementById('calcTotal');
calc?.addEventListener('change', ()=>{
  const sum = [...calc.querySelectorAll('input[type="checkbox"]:checked')]
    .map(i => Number(i.dataset.price)).reduce((a,b)=>a+b,0);
  totalEl.textContent = `R$ ${sum}`;
});

// One-field
const one = document.getElementById('oneField');
const more = document.querySelector('.onefield__more');
if (one && more){
  const openMore = ()=> (more.hidden = false);
  one.addEventListener('focus', openMore);
  one.addEventListener('input', openMore);
  document.getElementById('oneFieldLogin')?.addEventListener('click', ()=>alert('Login demo'));
}

// Calendário simples
const grid = document.querySelector('.calendar__grid');
const title = document.getElementById('monthYear');
const prev = document.querySelector('.calprev');
const next = document.querySelector('.calnext');
let cur = new Date();

function renderCalendar(base){
  if(!grid || !title) return;
  grid.innerHTML = '';
  const y = base.getFullYear(), m = base.getMonth();
  title.textContent = base.toLocaleString('pt-BR',{month:'long',year:'numeric'});

  const daysInMonth = new Date(y,m+1,0).getDate();
  const first = new Date(y,m,1).getDay();

  // cabeçalho
  ['D','S','T','Q','Q','S','S'].forEach(ch=>{
    const hd = document.createElement('div'); hd.textContent = ch;
    hd.className = 'cell muted'; grid.appendChild(hd);
  });

  for(let i=0;i<first;i++){ const blank = document.createElement('div'); blank.className='cell muted'; grid.appendChild(blank); }
  for(let d=1; d<=daysInMonth; d++){
    const cell = document.createElement('button'); cell.type='button'; cell.className='cell'; cell.textContent = d;
    cell.addEventListener('click', ()=> document.getElementById('slotSelect')?.focus());
    grid.appendChild(cell);
  }
}
if (grid){ renderCalendar(cur); }
prev?.addEventListener('click', ()=>{ cur.setMonth(cur.getMonth()-1); renderCalendar(cur); });
next?.addEventListener('click', ()=>{ cur.setMonth(cur.getMonth()+1); renderCalendar(cur); });

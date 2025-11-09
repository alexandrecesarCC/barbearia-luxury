// Ancoragem com scroll suave + correção do offset da nav
const offset = () => document.querySelector('.nav')?.getBoundingClientRect().height || 0;
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      const el = document.querySelector(id);
      const top = (el?.getBoundingClientRect().top || 0) + window.scrollY - offset() - 8;
      window.scrollTo({ top, behavior:'smooth' });
    }
  });
});

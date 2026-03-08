// js/main.js — small helpers: nav toggle, year, smooth scroll, form validation

document.addEventListener('DOMContentLoaded', () => {
  // insert current year in footers
  const year = new Date().getFullYear();
  ['year','year-2','year-3','year-4'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  // Mobile nav toggle
  const navToggleBtns = document.querySelectorAll('.nav-toggle');
  navToggleBtns.forEach(btn=>{
    btn.addEventListener('click', () => {
      const links = document.querySelectorAll('.nav-links');
      links.forEach(l => l.classList.toggle('open'));
    });
  });

  // Simple smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // Highlight nav link for current page (basic)
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path || (href === 'index.html' && path === '')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Contact form validation (simple demo, no backend)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const note = document.getElementById('form-note');

      if(!name || !email || !message){
        note.textContent = 'Please fill in all fields.';
        return;
      }
      // basic email check
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRe.test(email)){
        note.textContent = 'Please enter a valid email address.';
        return;
      }

      // pretend to send
      note.textContent = 'Sending...';
      setTimeout(()=>{
        note.textContent = 'Thanks — message sent (demo mode). I will reply on your email.';
        form.reset();
      }, 900);
    });
  }
});

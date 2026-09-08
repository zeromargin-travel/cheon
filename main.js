// ============================================================
// CHEON MINKYEONG — main.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Particle Canvas ──────────────────────────────────────
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedY = Math.random() * 0.4 + 0.1;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.6 ? 270 : 45; // violet or gold
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= 0.0008;
      if (this.y < -10 || this.opacity <= 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.hue}, 80%, 75%)`;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = Array.from({ length: 120 }, () => new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  // ── Navigation ───────────────────────────────────────────
  const nav = document.getElementById('nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll Reveal ────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ── Hero Name Letter Animation ────────────────────────────
  const heroName = document.querySelector('.hero-name-en');
  if (heroName) {
    const text = heroName.textContent;
    heroName.innerHTML = text.split('').map((ch, i) =>
      ch === ' '
        ? '<span style="display:inline-block;width:0.35em"></span>'
        : `<span style="display:inline-block;opacity:0;transform:translateY(24px);animation:letterIn 0.6s cubic-bezier(0.4,0,0.2,1) ${0.1 + i * 0.04}s forwards">${ch}</span>`
    ).join('');

    // Inject keyframe
    if (!document.querySelector('#letter-kf')) {
      const style = document.createElement('style');
      style.id = 'letter-kf';
      style.textContent = `@keyframes letterIn{to{opacity:1;transform:translateY(0)}}`;
      document.head.appendChild(style);
    }
  }

  // ── Current year in footer ────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Smooth hover glow on channel cards ───────────────────
  document.querySelectorAll('.channel-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--gx', `${x}%`);
      card.style.setProperty('--gy', `${y}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--gx');
      card.style.removeProperty('--gy');
    });
  });

});

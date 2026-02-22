// PersonalBrand — Antony Lysak
// main.js

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Burger Menu ──────────────────────────────
const burgerBtn   = document.getElementById('burgerBtn');
const burgerClose = document.getElementById('burgerClose');
const burgerMenu  = document.getElementById('burgerMenu');
const burgerLinks = document.querySelectorAll('.burger-menu__link, .burger-menu__cta');

function openMenu() {
  burgerMenu.classList.add('open');
  burgerBtn.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  burgerMenu.classList.remove('open');
  burgerBtn.classList.remove('active');
  document.body.style.overflow = '';
}

if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
if (burgerClose) burgerClose.addEventListener('click', closeMenu);
burgerLinks.forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ── Header scroll ────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── FAQ Accordion ────────────────────────────
document.querySelectorAll('.faq-item__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Fade-in on scroll ────────────────────────
const fadeTargets = document.querySelectorAll(
  '.problem-card, .framework-card, .offer-card, .proof-card, .number-card, ' +
  '.faq-item, .section-title, .section-label, .about__content, .hero__content, .hero__visual'
);
fadeTargets.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = idx * 80 + 'ms';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeTargets.forEach(el => observer.observe(el));

// ── Contact form ─────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      form.innerHTML = `<div style="text-align:center;padding:3rem 0">
        <div style="font-size:3rem;margin-bottom:1rem">✅</div>
        <h3 style="font-family:var(--font-display);font-size:1.75rem;margin-bottom:0.75rem">Screening confirmed!</h3>
        <p style="color:var(--color-text-secondary)">I'll reach out within 24 hours to schedule your call.</p>
      </div>`;
    }, 1200);
  });
}
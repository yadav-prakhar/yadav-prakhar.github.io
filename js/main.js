// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Theme handling
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const mobileThemeBtn = document.getElementById('mobileThemeToggle');
const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = (t) => localStorage.setItem('theme', t);
const applyTheme = (t) => {
  if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    html.setAttribute('data-theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
  }
};
const initTheme = () => {
  let t = getStoredTheme();
  if (!t) { t = 'system'; setStoredTheme(t); }
  applyTheme(t);
};
initTheme();
themeBtn?.addEventListener('click', () => {
  const isDark = html.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  setStoredTheme(next);
  applyTheme(next);
});
mobileThemeBtn?.addEventListener('click', () => {
  const isDark = html.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  setStoredTheme(next);
  applyTheme(next);
});

// Progress bar
const progress = document.getElementById('progress');
const setProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const width = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
  progress.style.width = width + '%';
};
setProgress();
window.addEventListener('scroll', setProgress, { passive: true });

// Simple intersection fade-up
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up, .fade-right, .fade-left').forEach((el, i) => {
  el.style.transitionDelay = (el.classList.contains('delay-50') ? 50 : el.classList.contains('delay-100') ? 100 : el.classList.contains('delay-150') ? 150 : el.classList.contains('delay-200') ? 200 : el.classList.contains('delay-300') ? 300 : el.classList.contains('delay-500') ? 500 : 0) + 'ms';
  io.observe(el);
});

// Newsletter form handling
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here you would typically send the form data to a server
      // For now, let's just show a success message
      const emailInput = document.getElementById('newsletter-email');
      const successMessage = document.getElementById('newsletter-success');
      if (emailInput && successMessage) {
        emailInput.value = '';
        successMessage.classList.remove('hidden');
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 3000);
      }
    });
  }
});

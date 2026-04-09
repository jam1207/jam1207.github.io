// Navbar scroll state
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .leader-card, .exp-row');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => { el.classList.add('reveal'); observer.observe(el); });

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar div');
skillBars.forEach(bar => {
  const target = bar.style.width;
  bar.style.width = '0';
  bar.style.transition = 'width 1s cubic-bezier(0.16,1,0.3,1)';
  const barObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { bar.style.width = target; barObserver.disconnect(); }
  }, { threshold: 0.5 });
  barObserver.observe(bar);
});

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--off-black)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObs.observe(s));

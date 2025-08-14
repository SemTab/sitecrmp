// Minimal interactivity: mobile nav, dropdown, simple carousel, counters

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Dropdown for social
  document.querySelectorAll('.nav__dropdown').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-dropdown');
      const panel = document.getElementById(`dropdown-${id}`);
      if (!panel) return;
      panel.classList.toggle('open');
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
  const donateOpen = document.getElementById('donate-open');
  const modal = document.getElementById('modal-donate');
  const donateClose = document.getElementById('donate-close');

  donateOpen.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  donateClose.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});

  // Simple carousel
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((el) => initCarousel(el));

  // Fake dynamic numbers
  const counterEl = document.getElementById('dl-counter');
  if (counterEl) {
    const base = 69359;
    const day = 24 * 60 * 60 * 1000;
    const daysFromEpoch = Math.floor(Date.now() / day);
    counterEl.textContent = (base + (daysFromEpoch % 500)).toLocaleString('ru-RU');
  }

  const playersEl = document.getElementById('players-count');
  if (playersEl) {
    const value = 30 + Math.floor(Math.random() * 40);
    playersEl.textContent = String(value);
  }
});

function initCarousel(root) {
  const track = root.querySelector('[data-carousel-track]');
  const slides = Array.from(track?.children || []);
  const prev = root.querySelector('.carousel__ctrl.prev');
  const next = root.querySelector('.carousel__ctrl.next');
  if (!track || slides.length === 0) return;

  let index = 0;
  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  prev?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
  next?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });

  // Auto-play
  let timer = setInterval(() => {
    index = (index + 1) % slides.length;
    update();
  }, 4500);

  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
      index = (index + 1) % slides.length;
      update();
    }, 4500);
  });

  update();
}



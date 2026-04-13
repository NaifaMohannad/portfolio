// ── WAIT FOR DOM TO LOAD (IMPORTANT FIX) ──
document.addEventListener("DOMContentLoaded", () => {

  // ── ADD FADE-UP CLASS TO ALL SECTIONS ──
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-up');
  });

  // ── FADE IN ANIMATION ON SCROLL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // ── ACTIVE NAV LINK ON SCROLL ──
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = '#14a8ad';
      }
    });
  });

  // ── NAV BACKGROUND ON SCROLL ──
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(4, 25, 26, 0.98)';
    } else {
      nav.style.background = 'rgba(4, 25, 26, 0.88)';
    }
  });

  // ── TYPING ANIMATION ──
  const titles = [
    'Full Stack Developer',
    'React Developer',
    'Django Developer',
    'GenAI Developer'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingEl = document.querySelector('.typing-text');

  function type() {
    if (!typingEl) return;

    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      setTimeout(() => { isDeleting = true; }, 1800);
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }

    setTimeout(type, isDeleting ? 60 : 100);
  }

  type();

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── COUNT UP ANIMATION ──
  function countUp(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + (el.dataset.suffix || '');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + (el.dataset.suffix || '');
      }
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNums = entry.target.querySelectorAll('.stat-num');
        statNums.forEach(stat => {
          const value = parseInt(stat.textContent);
          if (!isNaN(value)) {
            stat.dataset.suffix = stat.textContent.replace(value, '');
            countUp(stat, value);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ── PROJECT TILT EFFECT ──
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform =
        `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── SKILL HOVER GLOW ──
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.background =
        `radial-gradient(circle at ${x}px ${y}px, rgba(13,115,119,0.15), rgba(13,115,119,0.05) 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

});
// Quantor - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // --- Loader ---
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        loader.classList.add('hidden');
      }, 600);
    });
    // Fallback: hide after 3s
    setTimeout(function() {
      loader.classList.add('hidden');
    }, 3000);
  }

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- Mobile menu ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // --- Scroll animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  document.querySelectorAll('.service-card, .partner-card, .service-detail-card, .stat-item, .about-feature, .contact-info-card').forEach(function(el) {
    el.classList.add('animate-target');
    observer.observe(el);
  });

  // --- Counter animation for stats ---
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function(el) {
    statsObserver.observe(el);
  });

  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '');
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }
});

// --- CSS for animations (injected) ---
(function() {
  var style = document.createElement('style');
  style.textContent = `
    .animate-target {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .animate-target.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    .service-card:nth-child(2) { transition-delay: 0.1s; }
    .service-card:nth-child(3) { transition-delay: 0.2s; }
    .service-card:nth-child(4) { transition-delay: 0.3s; }
    .service-card:nth-child(5) { transition-delay: 0.4s; }
    .service-card:nth-child(6) { transition-delay: 0.5s; }
  `;
  document.head.appendChild(style);
})();

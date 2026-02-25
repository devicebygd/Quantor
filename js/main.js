// Quantor - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // --- Footer year ---
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Active nav link ---
  var path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === '/') ||
        (href !== '/' && path.indexOf(href) === 0)) {
      link.classList.add('active');
    }
  });

  // --- Contact form success message ---
  if (window.location.search.indexOf('sent=true') !== -1) {
    var successEl = document.getElementById('form-success');
    if (successEl) successEl.style.display = 'flex';
  }

  // --- Loader ---
  var loader = document.getElementById('page-loader');
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
  var navbar = document.getElementById('navbar');
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
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var navLinks = document.getElementById('navLinks');
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
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function(entries) {
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
  var statNumbers = document.querySelectorAll('.stat-number');
  var statsObserver = new IntersectionObserver(function(entries) {
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
    var text = el.textContent.trim();
    var match = text.match(/^(\d+)/);
    if (!match) return;

    var target = parseInt(match[1]);
    var suffix = text.replace(match[1], '');
    var duration = 1500;
    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }
});

// --- CSS for animations (injected) ---
(function() {
  var style = document.createElement('style');
  style.textContent = [
    '.animate-target {',
    '  opacity: 0;',
    '  transform: translateY(24px);',
    '  transition: opacity 0.6s ease, transform 0.6s ease;',
    '}',
    '.animate-target.animate-in {',
    '  opacity: 1;',
    '  transform: translateY(0);',
    '}',
    '.service-card:nth-child(2) { transition-delay: 0.1s; }',
    '.service-card:nth-child(3) { transition-delay: 0.2s; }',
    '.service-card:nth-child(4) { transition-delay: 0.3s; }',
    '.service-card:nth-child(5) { transition-delay: 0.4s; }',
    '.service-card:nth-child(6) { transition-delay: 0.5s; }'
  ].join('\n');
  document.head.appendChild(style);
})();

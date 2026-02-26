// Quantor - Main JavaScript

// --- Icon Map ---
var ICONS = {
  license: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  server: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/><rect x="7" y="14" width="4" height="4" rx="1"/><line x1="15" y1="14" x2="17" y2="14"/><line x1="15" y1="17" x2="17" y2="17"/></svg>',
  network: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="12" x2="5" y2="17"/><line x1="12" y1="12" x2="19" y2="17"/></svg>',
  cable: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  audit: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>',
  automation: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>',
  inventory: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
  ticket: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>',
  datacenter: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="6" rx="1"/><rect x="2" y="15" width="20" height="6" rx="1"/><line x1="6" y1="6" x2="6" y2="6.01"/><line x1="6" y1="18" x2="6" y2="18.01"/><line x1="10" y1="6" x2="18" y2="6"/><line x1="10" y1="18" x2="18" y2="18"/><line x1="12" y1="9" x2="12" y2="15"/></svg>',
  cloud: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>',
  security: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg>',
  support: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>',
  default: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>'
};

var ABOUT_ICONS = {
  check: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  clock: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  shield: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  default: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>'
};

function getIcon(name) {
  return ICONS[name] || ICONS['default'];
}

function getAboutIcon(name) {
  return ABOUT_ICONS[name] || ABOUT_ICONS['default'];
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function loadJSON(url) {
  return fetch(url).then(function(r) { return r.json(); });
}

function setText(id, text) {
  var el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function setHtml(id, html) {
  var el = document.getElementById(id);
  if (el && html) el.innerHTML = html;
}

// --- Data rendering functions ---

function renderServicesGrid(container, services) {
  var html = '';
  services.filter(function(s) { return s.active; }).sort(function(a, b) { return a.order - b.order; }).forEach(function(s) {
    html += '<div class="service-card">' +
      '<div class="service-icon">' + getIcon(s.icon) + '</div>' +
      '<h3>' + escapeHtml(s.title) + '</h3>' +
      '<p>' + escapeHtml(s.shortDesc) + '</p>' +
      '</div>';
  });
  container.innerHTML = html;
}

function renderServicesList(container, services, buttonText) {
  var btnLabel = buttonText || 'Ətraflı Məlumat';
  var html = '';
  services.filter(function(s) { return s.active; }).sort(function(a, b) { return a.order - b.order; }).forEach(function(s, i) {
    var num = String(i + 1).padStart(2, '0');
    var reverse = i % 2 !== 0 ? ' reverse' : '';
    html += '<div class="service-detail-card' + reverse + '">' +
      '<div class="service-detail-content">' +
      '<div class="service-detail-number">' + num + '</div>' +
      '<h2>' + escapeHtml(s.title) + '</h2>' +
      '<p class="service-detail-short">' + escapeHtml(s.shortDesc) + '</p>' +
      '<p class="service-detail-full">' + escapeHtml(s.fullDesc) + '</p>' +
      '<a href="/elaqe" class="btn btn-primary btn-sm">' + escapeHtml(btnLabel) + '</a>' +
      '</div>' +
      '<div class="service-detail-icon">' +
      '<div class="service-detail-icon-inner">' + getIcon(s.icon) + '</div>' +
      '</div></div>';
  });
  container.innerHTML = html;
}

function renderPartnersMarquee(container, partners) {
  var items = partners.filter(function(p) { return p.active; }).sort(function(a, b) { return a.order - b.order; });
  var html = '';
  for (var r = 0; r < 2; r++) {
    items.forEach(function(p) {
      html += '<div class="partner-item"><span class="partner-name">' + escapeHtml(p.name) + '</span></div>';
    });
  }
  container.innerHTML = html;
}

function renderPartnersGrid(container, partners, linkText) {
  var linkLabel = linkText || 'Sayta keçid';
  var html = '';
  partners.filter(function(p) { return p.active; }).sort(function(a, b) { return a.order - b.order; }).forEach(function(p) {
    html += '<div class="partner-card">' +
      '<div class="partner-logo-placeholder">' +
      '<svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' +
      '</div>' +
      '<h3>' + escapeHtml(p.name) + '</h3>' +
      '<p>' + escapeHtml(p.description) + '</p>' +
      '<a href="' + escapeHtml(p.website) + '" target="_blank" rel="noopener" class="partner-link">' + escapeHtml(linkLabel) + ' &rarr;</a>' +
      '</div>';
  });
  container.innerHTML = html;
}

function renderStats(container, stats) {
  var html = '';
  stats.forEach(function(s) {
    html += '<div class="stat-item">' +
      '<span class="stat-number">' + escapeHtml(s.number) + '</span>' +
      '<span class="stat-label">' + escapeHtml(s.label) + '</span>' +
      '</div>';
  });
  container.innerHTML = html;
}

function renderContactInfo(settings) {
  setText('contact-phone', settings.phone);
  setText('contact-email', settings.email);
  setText('contact-address', settings.address);
}

function renderFooterContact(settings) {
  document.querySelectorAll('[data-footer-phone]').forEach(function(el) {
    el.textContent = settings.phone || '';
  });
  document.querySelectorAll('[data-footer-email]').forEach(function(el) {
    el.textContent = settings.email || '';
  });
  document.querySelectorAll('[data-footer-address]').forEach(function(el) {
    el.textContent = settings.address || '';
  });
  document.querySelectorAll('[data-footer-desc]').forEach(function(el) {
    el.textContent = settings.footerDesc || settings.siteDescription || '';
  });
  // Footer service links
  var footerServicesUl = document.getElementById('footer-services-list');
  if (footerServicesUl && settings.footerServiceLinks) {
    var html = '';
    settings.footerServiceLinks.forEach(function(link) {
      html += '<li><a href="/xidmetler">' + escapeHtml(link.label) + '</a></li>';
    });
    footerServicesUl.innerHTML = html;
  }
}

function renderHero(settings) {
  setText('hero-tagline', settings.siteTagline);
  setText('hero-title', settings.heroTitle);
  setText('hero-subtitle', settings.heroSubtitle);
  setText('about-text', settings.aboutText);
  // About features
  var aboutFeaturesEl = document.getElementById('about-features');
  if (aboutFeaturesEl && settings.aboutFeatures) {
    var html = '';
    settings.aboutFeatures.forEach(function(f) {
      html += '<div class="about-feature">' +
        '<div class="about-feature-icon">' + getAboutIcon(f.icon) + '</div>' +
        '<div><strong>' + escapeHtml(f.title) + '</strong>' +
        '<p>' + escapeHtml(f.description) + '</p></div></div>';
    });
    aboutFeaturesEl.innerHTML = html;
  }
  // About card
  setText('about-card-title', settings.aboutCardTitle);
  setText('about-card-desc', settings.aboutCardDesc);
}

function renderNav(nav) {
  if (!nav) return;
  document.querySelectorAll('[data-nav-home]').forEach(function(el) { el.textContent = nav.home || ''; });
  document.querySelectorAll('[data-nav-services]').forEach(function(el) { el.textContent = nav.services || ''; });
  document.querySelectorAll('[data-nav-partners]').forEach(function(el) { el.textContent = nav.partners || ''; });
  document.querySelectorAll('[data-nav-contact]').forEach(function(el) { el.textContent = nav.contact || ''; });
}

function renderPageHeader(page) {
  if (!page) return;
  setText('page-header-badge', page.headerBadge);
  setHtml('page-header-title', page.headerTitle ? page.headerTitle.replace(/\*([^*]+)\*/, '<span class="text-blue">$1</span>') : '');
  setText('page-header-subtitle', page.headerSubtitle);
}

function renderCTA(page) {
  if (!page) return;
  setText('cta-title', page.ctaTitle);
  setText('cta-text', page.ctaText);
  setText('cta-button', page.ctaButton);
}

function renderHomeSections(home) {
  if (!home) return;
  setText('about-badge', home.aboutBadge);
  setHtml('about-title', home.aboutTitle ? home.aboutTitle.replace(/\*([^*]+)\*/, '<span class="text-blue">$1</span>') : '');
  setText('services-badge', home.servicesBadge);
  setHtml('services-title', home.servicesTitle ? home.servicesTitle.replace(/\*([^*]+)\*/, '<span class="text-blue">$1</span>') : '');
  setText('services-subtitle', home.servicesSubtitle);
  setText('services-button', home.servicesButton);
  setText('partners-badge', home.partnersBadge);
  setHtml('partners-title', home.partnersTitle ? home.partnersTitle.replace(/\*([^*]+)\*/, '<span class="text-blue">$1</span>') : '');
  setText('partners-subtitle', home.partnersSubtitle);
  setText('cta-title', home.ctaTitle);
  setText('cta-text', home.ctaText);
  setText('cta-button', home.ctaButton);
  setText('hero-btn-primary', home.heroBtnPrimary);
  setText('hero-btn-secondary', home.heroBtnSecondary);
}

function renderContactPage(contact) {
  if (!contact) return;
  setText('form-title', contact.formTitle);
  setText('form-subtitle', contact.formSubtitle);
  setText('form-button-text', contact.formButton);
  setText('contact-info-title', contact.contactInfoTitle);
  setText('work-hours-title', contact.workHoursTitle);
  // Success message
  var successTextEl = document.getElementById('form-success-text');
  if (successTextEl && contact.formSuccess) successTextEl.textContent = contact.formSuccess;
  // Work hours
  var workHoursEl = document.getElementById('work-hours-list');
  if (workHoursEl && contact.workHours) {
    var html = '';
    contact.workHours.forEach(function(wh) {
      html += '<div class="work-hours-row">' +
        '<span>' + escapeHtml(wh.days) + '</span>' +
        '<span>' + escapeHtml(wh.hours) + '</span></div>';
    });
    workHoursEl.innerHTML = html;
  }
}

function renderNotFound(notFound) {
  if (!notFound) return;
  setText('notfound-title', notFound.title);
  setText('notfound-desc', notFound.description);
  setText('notfound-button', notFound.button);
}

function initAnimations() {
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
  document.querySelectorAll('.service-card, .partner-card, .service-detail-card, .stat-item, .about-feature, .contact-info-card').forEach(function(el) {
    el.classList.add('animate-target');
    observer.observe(el);
  });

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
}

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

// --- Detect current page ---
function getCurrentPage() {
  var path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  if (path === '/' || path === '') return 'home';
  if (path.indexOf('/xidmetler') === 0) return 'services';
  if (path.indexOf('/terefdaslar') === 0) return 'partners';
  if (path.indexOf('/elaqe') === 0) return 'contact';
  return 'notFound';
}

// --- Main ---
document.addEventListener('DOMContentLoaded', function() {

  var currentPage = getCurrentPage();

  // Footer year
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Active nav link
  var path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === '/') ||
        (href !== '/' && path.indexOf(href) === 0)) {
      link.classList.add('active');
    }
  });

  // Contact form success message
  if (window.location.search.indexOf('sent=true') !== -1) {
    var successEl = document.getElementById('form-success');
    if (successEl) successEl.style.display = 'flex';
  }

  // Loader
  var loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', function() {
      setTimeout(function() { loader.classList.add('hidden'); }, 600);
    });
    setTimeout(function() { loader.classList.add('hidden'); }, 3000);
  }

  // Navbar scroll
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  // Mobile menu
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var navLinksEl = document.getElementById('navLinks');
  if (mobileMenuBtn && navLinksEl) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinksEl.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
    });
    navLinksEl.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinksEl.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // --- Element references ---
  var servicesGrid = document.getElementById('services-grid');
  var servicesList = document.getElementById('services-list');
  var partnersMarquee = document.getElementById('partners-marquee-track');
  var partnersGrid = document.getElementById('partners-grid');
  var statsGrid = document.getElementById('stats-grid');

  // --- Load pages.json for page-specific content ---
  loadJSON('/data/pages.json').then(function(pages) {
    // Navigation labels
    renderNav(pages.nav);

    // Page-specific rendering
    if (currentPage === 'home') {
      renderHomeSections(pages.home);
    } else if (currentPage === 'services') {
      renderPageHeader(pages.services);
      renderCTA(pages.services);
    } else if (currentPage === 'partners') {
      renderPageHeader(pages.partners);
      renderCTA(pages.partners);
    } else if (currentPage === 'contact') {
      renderPageHeader(pages.contact);
      renderContactPage(pages.contact);
    } else if (currentPage === 'notFound') {
      renderNotFound(pages.notFound);
    }

    // Load services with page-specific button text
    if (servicesGrid || servicesList) {
      loadJSON('/data/services.json').then(function(data) {
        var services = data.items || data;
        if (servicesGrid) renderServicesGrid(servicesGrid, services);
        if (servicesList) renderServicesList(servicesList, services, pages.services && pages.services.detailButton);
        initAnimations();
      }).catch(function() {});
    }

    // Load partners with page-specific link text
    if (partnersMarquee || partnersGrid) {
      loadJSON('/data/partners.json').then(function(data) {
        var partners = data.items || data;
        if (partnersMarquee) renderPartnersMarquee(partnersMarquee, partners);
        if (partnersGrid) renderPartnersGrid(partnersGrid, partners, pages.partners && pages.partners.partnerLinkText);
        initAnimations();
      }).catch(function() {});
    }
  }).catch(function() {
    // Fallback: load services/partners without page text
    if (servicesGrid || servicesList) {
      loadJSON('/data/services.json').then(function(data) {
        var services = data.items || data;
        if (servicesGrid) renderServicesGrid(servicesGrid, services);
        if (servicesList) renderServicesList(servicesList, services);
        initAnimations();
      }).catch(function() {});
    }
    if (partnersMarquee || partnersGrid) {
      loadJSON('/data/partners.json').then(function(data) {
        var partners = data.items || data;
        if (partnersMarquee) renderPartnersMarquee(partnersMarquee, partners);
        if (partnersGrid) renderPartnersGrid(partnersGrid, partners);
        initAnimations();
      }).catch(function() {});
    }
  });

  // Load settings for all pages
  loadJSON('/data/settings.json').then(function(settings) {
    renderFooterContact(settings);
    if (currentPage === 'home') renderHero(settings);
    if (statsGrid && settings.heroStats) {
      renderStats(statsGrid, settings.heroStats);
      initAnimations();
    }
    renderContactInfo(settings);
  }).catch(function() {});

  // Init animations for static content
  initAnimations();
});

// --- Injected animation CSS ---
(function() {
  var style = document.createElement('style');
  style.textContent = [
    '.animate-target { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }',
    '.animate-target.animate-in { opacity: 1; transform: translateY(0); }',
    '.service-card:nth-child(2) { transition-delay: 0.1s; }',
    '.service-card:nth-child(3) { transition-delay: 0.2s; }',
    '.service-card:nth-child(4) { transition-delay: 0.3s; }',
    '.service-card:nth-child(5) { transition-delay: 0.4s; }',
    '.service-card:nth-child(6) { transition-delay: 0.5s; }'
  ].join('\n');
  document.head.appendChild(style);
})();

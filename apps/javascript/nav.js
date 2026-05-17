// nav.js
document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.querySelector('.nav-links');
  var navbar    = document.getElementById('navbar');

  if (hamburger && navLinks) {
    // Create Overlay dynamically
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Create Mobile Header and Footer inside navLinks if not present
    if (!document.querySelector('.mobile-nav-header')) {
      const isSubPage = window.location.pathname.includes('/apps/');
      const resolvePath = (path) => {
        if (path === 'index.html') {
          return isSubPage ? '../index.html' : 'index.html';
        }
        return isSubPage ? path : 'apps/' + path;
      };

      const header = document.createElement('li');
      header.className = 'mobile-nav-header';
      header.innerHTML = `
        <span class="nav-brand-name">BASORIA</span>
        <button class="close-btn">&times;</button>
      `;
      navLinks.prepend(header);

      const footer = document.createElement('li');
      footer.className = 'mobile-nav-footer';
      footer.innerHTML = `
        <p>Nikmati Bakso Juara dengan rasa autentik dan bahan premium langsung dari Bogor.</p>
        <div class="mobile-nav-btns">
          <a href="${resolvePath('kontak.html')}" class="btn-join">HUBUNGI</a>
        </div>
      `;
      navLinks.appendChild(footer);

      // Add arrows to existing links
      navLinks.querySelectorAll('a:not(.btn-join):not(.btn-signin)').forEach(link => {
        const span = document.createElement('span');
        span.innerHTML = '&rsaquo;';
        link.appendChild(span);
      });
    }

    const closeBtn = document.querySelector('.close-btn');

    function toggleMenu() {
      navLinks.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    }

    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) toggleMenu();
      });
    });
  }

  window.addEventListener('scroll', function () {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // UI/UX Smooth Scroll Animations using IntersectionObserver
  const animateSelectors = [
    '.section-heading', '.about-body-text', '.menu-card-preview',
    '.stat-item', '.cta-band-content h2', '.cta-band-content p', '.cta-btn-row',
    '.menu-full-card', '.about-img-frame', '.about-body-full p',
    '.value-card', '.gallery-cell', '.contact-info', '.contact-form-wrap',
    '.menu-list-row'
  ];
  
  // Apply fade-up base class dynamically
  animateSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('fade-up');
      // Add staggered delays for grids
      if (index % 3 === 1) el.classList.add('delay-100');
      if (index % 3 === 2) el.classList.add('delay-200');
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });
});


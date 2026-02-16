const siteHeader = document.querySelector('.site-header');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const scrollLinks = document.querySelectorAll('[data-scroll-target]');
const currentYear = document.getElementById('currentYear');
const profileImage = document.getElementById('profileImage');

const revealSelectors = [
  '.hero-content',
  '.section-head',
  '.bio-card',
  '.info-card',
  '.project-card',
  '.tech-card',
  '.hardware-badge',
  '.footer h2',
  '.footer-text',
  '.contact-card',
];

const REVEAL_STAGGER_MS = 110;

const closeMobileMenu = () => {
  if (!mobileMenu || !menuToggle) {
    return;
  }

  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

const updateHeaderState = () => {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle('scrolled', window.scrollY > 50);
};

const setupProfileImageFallback = () => {
  if (!profileImage) {
    return;
  }

  const sources = [
    './assets/img/profile.webp',
    'assets/img/profile.webp',
    '/assets/img/profile.webp',
  ];
  let currentIndex = 0;

  const tryNextSource = () => {
    if (currentIndex >= sources.length) {
      profileImage.style.display = 'none';
      return;
    }

    profileImage.src = sources[currentIndex];
    currentIndex += 1;
  };

  profileImage.addEventListener('error', tryNextSource);
  tryNextSource();
};

const setupRevealAnimations = () => {
  const revealElements = document.querySelectorAll(revealSelectors.join(','));

  if (revealElements.length === 0) {
    return;
  }

  revealElements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * REVEAL_STAGGER_MS}ms`);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    revealElements.forEach((element) => observer.observe(element));
    return;
  }

  revealElements.forEach((element) => element.classList.add('is-visible'));
};

scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('data-scroll-target');

    if (!targetId) {
      return;
    }

    event.preventDefault();

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      closeMobileMenu();
      return;
    }

    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  });
});

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();
setupProfileImageFallback();
setupRevealAnimations();

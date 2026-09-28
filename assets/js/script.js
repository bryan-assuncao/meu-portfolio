const siteHeader = document.querySelector('.site-header');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const scrollLinks = document.querySelectorAll('[data-scroll-target]');
const currentYear = document.getElementById('currentYear');
const profileImage = document.getElementById('profileImage');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const revealSelectors = [
  '.section-head',
  '.xp-card',
  '.experience-linkedin-link',
  '.impact-card',
  '.project-card',
  '.tech-card',
  '.hardware-badge',
  '.bio-lead',
  '.bio-text',
  '.footer-head',
  '.contact-row',
];

const REVEAL_STAGGER_MS = 90;

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

// Uma sentinela observada troca o listener de scroll: o navegador avisa
// quando cruza o limiar em vez de rodar JS em todo frame de scroll.
const setupHeaderState = () => {
  if (!siteHeader) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();
    return;
  }

  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText =
    'position:absolute;top:0;left:0;width:1px;height:50px;pointer-events:none;visibility:hidden;';
  document.body.prepend(sentinel);

  const observer = new IntersectionObserver(
    ([entry]) => {
      siteHeader.classList.toggle('scrolled', !entry.isIntersecting);
    },
    { threshold: 0 },
  );

  observer.observe(sentinel);
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
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealElements.forEach((element) => observer.observe(element));
    return;
  }

  revealElements.forEach((element) => element.classList.add('is-visible'));
};

// Destaca no menu a seção que ocupa o meio da tela.
const setupActiveNav = () => {
  const navLinks = document.querySelectorAll('[data-nav]');

  if (navLinks.length === 0 || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.dataset.nav === entry.target.id);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  navLinks.forEach((link) => {
    const section = document.getElementById(link.dataset.nav);

    if (section) {
      observer.observe(section);
    }
  });
};

// Barra de leitura no header; o rAF garante no máximo uma escrita por frame.
const setupScrollProgress = () => {
  const bar = document.getElementById('scrollProgress');

  if (!bar) {
    return;
  }

  let ticking = false;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${progress})`;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  update();
};

// Posição do cursor em cada card vira --mx/--my para o brilho em CSS.
const setupSpotlight = () => {
  if (!hasFinePointer) {
    return;
  }

  document.addEventListener(
    'pointermove',
    (event) => {
      const card = event.target.closest?.('.spotlight');

      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );
};

// Abas acessíveis da janela de código do hero. Os painéis só são
// escondidos aqui, então sem JS todo o conteúdo continua visível.
const setupTablist = (list) => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];

  if (tabs.length === 0) {
    return;
  }

  const select = (tab) => {
    tabs.forEach((item) => {
      const isActive = item === tab;
      const panel = document.getElementById(item.getAttribute('aria-controls'));

      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;

      if (panel) {
        panel.hidden = !isActive;
        panel.classList.toggle('is-active', isActive);
      }
    });

  };

  const keys = {
    ArrowRight: 1,
    ArrowDown: 1,
    ArrowLeft: -1,
    ArrowUp: -1,
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      const step = keys[event.key];

      if (!step) {
        return;
      }

      event.preventDefault();
      const next = tabs[(index + step + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });

  select(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') ?? tabs[0]);
};

const setupTabs = () => {
  document.querySelectorAll('[role="tablist"]').forEach(setupTablist);
};

// Números de destaque contam de 0 até o valor quando entram na tela.
// Sem JS (ou com movimento reduzido) o valor final já está no HTML.
const setupCountUp = () => {
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length === 0 || prefersReducedMotion || !('IntersectionObserver' in window)) {
    return;
  }

  const DURATION = 1400;

  const run = (element) => {
    const target = Number(element.dataset.count);
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - (1 - t) ** 3;
      element.textContent = String(Math.round(target * eased));

      if (t < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((element) => {
    element.textContent = '0';
    observer.observe(element);
  });
};

const setupLocalTime = () => {
  const target = document.getElementById('localTime');

  if (!target) {
    return;
  }

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  });

  const update = () => {
    const now = new Date();
    target.textContent = formatter.format(now);
    target.dateTime = now.toISOString();
  };

  update();
  setInterval(update, 30_000);
};

// Campo de pontos do hero: uma onda lenta de fundo e um halo que segue o
// cursor. Só anima enquanto o hero está visível e a aba está ativa.
const setupHeroCanvas = () => {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas?.getContext('2d');

  if (!canvas || !ctx) {
    return;
  }

  const GAP = 26;
  const RADIUS = 180;
  const pointer = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
  let width = 0;
  let height = 0;
  let dots = [];
  let frameId = 0;
  let isVisible = true;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    dots = [];
    const offsetX = (width % GAP) / 2;
    const offsetY = (height % GAP) / 2;

    for (let y = offsetY; y < height; y += GAP) {
      for (let x = offsetX; x < width; x += GAP) {
        dots.push({ x, y });
      }
    }
  };

  const draw = (time) => {
    pointer.x += (pointer.targetX - pointer.x) * 0.12;
    pointer.y += (pointer.targetY - pointer.y) * 0.12;

    ctx.clearRect(0, 0, width, height);
    const t = time * 0.0006;

    for (const dot of dots) {
      const wave = prefersReducedMotion
        ? 0.5
        : (Math.sin(dot.x * 0.012 + t) + Math.cos(dot.y * 0.016 - t * 0.8)) * 0.25 + 0.5;

      const dx = dot.x - pointer.x;
      const dy = dot.y - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const glow = distance < RADIUS ? 1 - distance / RADIUS : 0;
      const eased = glow * glow;

      const size = 0.7 + wave * 0.5 + eased * 1.6;
      const alpha = 0.07 + wave * 0.1 + eased * 0.6;

      ctx.fillStyle =
        eased > 0.02 ? `rgba(233, 228, 216, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const loop = (time) => {
    draw(time);
    frameId = requestAnimationFrame(loop);
  };

  const start = () => {
    if (!frameId && isVisible && !document.hidden) {
      frameId = requestAnimationFrame(loop);
    }
  };

  const stop = () => {
    cancelAnimationFrame(frameId);
    frameId = 0;
  };

  resize();
  draw(0);

  window.addEventListener('resize', () => {
    resize();
    draw(performance.now());
  });

  if (prefersReducedMotion) {
    return;
  }

  const hero = canvas.parentElement;

  if (hasFinePointer && hero) {
    hero.addEventListener('pointermove', (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;

      if (pointer.x < -1000) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
    });

    hero.addEventListener('pointerleave', () => {
      pointer.targetX = -9999;
      pointer.targetY = -9999;
    });
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      isVisible ? start() : stop();
    }).observe(canvas);
  }

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });

  start();
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

setupHeaderState();
setupProfileImageFallback();
setupRevealAnimations();
setupActiveNav();
setupScrollProgress();
setupSpotlight();
setupTabs();
setupCountUp();
setupLocalTime();
setupHeroCanvas();

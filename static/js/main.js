class ParticleSystem {
  constructor(canvas, count = 30) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.particleCount = count;
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  init() {
    const colors = [
      { r: 187, g: 148, b: 87 },   // golden
      { r: 255, g: 230, b: 167 },  // cream
      { r: 153, g: 88, b: 42 }     // amber
    ];
    
    for (let i = 0; i < this.particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1.5 + 1,
        speedY: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.35 + 0.15,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        color: color
      });
    }
  }
  
  update() {
    this.particles.forEach(particle => {
      particle.y -= particle.speedY;
      particle.x += particle.speedX;
      particle.twinkle += particle.twinkleSpeed;
      
      if (particle.y < -10) {
        particle.y = this.canvas.height + 10;
        particle.x = Math.random() * this.canvas.width;
      }
      
      if (particle.x < -10) {
        particle.x = this.canvas.width + 10;
      } else if (particle.x > this.canvas.width + 10) {
        particle.x = -10;
      }
    });
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      const twinkleOpacity = particle.opacity * (0.5 + Math.sin(particle.twinkle) * 0.5);
      const c = particle.color;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${twinkleOpacity})`;
      this.ctx.fill();
      
      const glowSize = particle.size * 2;
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, glowSize
      );
      gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${twinkleOpacity * 0.5})`);
      gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
  }
  
  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

function initParticles(canvasId = 'particles-canvas', count = null) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  
  if (count === null) {
    count = window.innerWidth < 768 ? 10 : 30;
  }
  
  const particleSystem = new ParticleSystem(canvas, count);
  particleSystem.animate();
  return particleSystem;
}

// Lazy loading avec IntersectionObserver pour les particules
function initParticlesLazy(canvasId = 'particles-canvas', count = null) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  
  // Créer un observer pour détecter quand le canvas est visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Le canvas est visible, initialiser les particules
        if (count === null) {
          count = window.innerWidth < 768 ? 10 : 30;
        }
        
        const particleSystem = new ParticleSystem(canvas, count);
        particleSystem.animate();
        
        // Arrêter d'observer une fois initialisé
        observer.unobserve(canvas);
      }
    });
  }, {
    // Options de l'observer
    rootMargin: '50px', // Commencer à charger 50px avant que le canvas soit visible
    threshold: 0.1 // Déclencher quand au moins 10% du canvas est visible
  });
  
  observer.observe(canvas);
  return observer;
}

function initPageTransitions() {
  const links = document.querySelectorAll('a[href$=".html"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href && !href.startsWith('http') && !link.hasAttribute('target')) {
        e.preventDefault();
        
        // Afficher le loader
        PageLoader.show();
        
        document.body.classList.add('page-exit');
        
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });
}

function initButtonRipple() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.btn, button, .payment-method-card, .menu-item');
    
    if (button) {
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    }
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        const children = entry.target.querySelectorAll('.reveal-item');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, index * 100);
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
}

function initCursorGlow() {
  if (window.innerWidth < 1024) return;
  
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-glow');
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
}

document.addEventListener('DOMContentLoaded', () => {
  // Masquer le loader au chargement de la page
  PageLoader.hide();
  
  // Initialiser le gestionnaire réseau
  NetworkManager.init();
  
  // Enregistrer le Service Worker
  registerServiceWorker();
  
  setTimeout(() => {
    document.body.classList.remove('page-enter');
  }, 50);
  
  initPageTransitions();
  initButtonRipple();
  initScrollReveal();
  initCursorGlow();
  
  // Utiliser lazy loading pour les particules (amélioration performance)
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    initParticlesLazy('particles-canvas');
  }
  
  const authCanvas = document.getElementById('auth-particles-canvas');
  if (authCanvas) {
    initParticlesLazy('auth-particles-canvas');
  }
  
  // Hero scroll indicator
  window.addEventListener('scroll', () => {
    const hint = document.querySelector('.hero-scroll-hint');
    if (hint) {
      hint.classList.toggle('hidden', window.scrollY > 80);
    }
  });
});

// Ensure pages restored from browser back/forward cache are visible.
window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-exit', 'page-enter');
  if (PageLoader && typeof PageLoader.hide === 'function') {
    PageLoader.hide();
  }
});

// ===================================
// PAGE LOADER SYSTEM
// ===================================

const PageLoader = {
  loader: null,
  
  init() {
    if (!this.loader) {
      this.loader = document.createElement('div');
      this.loader.className = 'page-loader';
      this.loader.innerHTML = `
        <div class="loader-spinner"></div>
        <div class="loader-text">Загрузка...</div>
        <svg aria-hidden="true" class="loader-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="10" x2="30" y2="10" stroke="#BB9457" stroke-width="1"/>
          <rect x="35" y="5" width="10" height="10" fill="none" stroke="#BB9457" stroke-width="1" transform="rotate(45 40 10)"/>
          <line x1="50" y1="10" x2="80" y2="10" stroke="#BB9457" stroke-width="1"/>
        </svg>
        <div class="loader-progress">
          <div class="loader-progress-bar"></div>
        </div>
      `;
      document.body.appendChild(this.loader);
    }
  },
  
  show() {
    this.init();
    // Petit délai pour permettre la transition CSS
    requestAnimationFrame(() => {
      this.loader.classList.add('active');
    });
  },
  
  hide() {
    if (this.loader) {
      this.loader.classList.remove('active');
    }
  }
};

// ===================================
// TOAST NOTIFICATION SYSTEM
// ===================================

const Toast = {
  container: null,
  
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.setAttribute('role', 'region');
      this.container.setAttribute('aria-label', 'Уведомления');
      this.container.setAttribute('aria-live', 'polite');
      document.body.appendChild(this.container);
    }
  },
  
  show(message, type = 'info', duration = 5000) {
    this.init();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    
    const titles = {
      success: 'Успех',
      error: 'Ошибка',
      warning: 'Внимание',
      info: 'Информация'
    };
    
    toast.innerHTML = `
      <div class="toast-icon" aria-hidden="true">${icons[type]}</div>
      <div class="toast-content">
        <div class="toast-title">${titles[type]}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Закрыть уведомление">×</button>
      <div class="toast-progress">
        <div class="toast-progress-bar"></div>
      </div>
    `;
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.remove(toast));
    
    this.container.appendChild(toast);
    
    if (duration > 0) {
      setTimeout(() => this.remove(toast), duration);
    }
    
    return toast;
  },
  
  remove(toast) {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  },
  
  success(message, duration = 5000) {
    return this.show(message, 'success', duration);
  },
  
  error(message, duration = 5000) {
    return this.show(message, 'error', duration);
  },
  
  warning(message, duration = 5000) {
    return this.show(message, 'warning', duration);
  },
  
  info(message, duration = 5000) {
    return this.show(message, 'info', duration);
  }
};

// ===================================
// NETWORK MANAGER
// ===================================

const NetworkManager = {
  isOnline: navigator.onLine,
  statusBanner: null,
  pendingRequests: [],
  retryAttempts: 3,
  retryDelay: 1000,
  
  init() {
    // Créer le bandeau de statut réseau
    if (!this.statusBanner) {
      this.statusBanner = document.createElement('div');
      this.statusBanner.className = 'network-status';
      document.body.appendChild(this.statusBanner);
    }
    
    // Écouter les événements réseau
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Vérifier l'état initial
    if (!navigator.onLine) {
      this.handleOffline();
    }
  },
  
  handleOffline() {
    this.isOnline = false;
    this.showStatus('offline', 'Нет подключения к интернету', `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="1" y1="1" x2="23" y2="23"></line>
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
    `);
    
    // Afficher un toast
    if (window.LavCafe && window.LavCafe.Toast) {
      window.LavCafe.Toast.warning('Вы работаете в автономном режиме. Некоторые функции могут быть недоступны.', 0);
    }
  },
  
  handleOnline() {
    this.isOnline = true;
    this.showStatus('online', 'Подключение восстановлено', `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
        <line x1="12" y1="20" x2="12.01" y2="20"></line>
      </svg>
    `);
    
    // Masquer après 3 secondes
    setTimeout(() => this.hideStatus(), 3000);
    
    // Afficher un toast
    if (window.LavCafe && window.LavCafe.Toast) {
      window.LavCafe.Toast.success('Подключение к интернету восстановлено');
    }
    
    // Synchroniser les données en attente
    this.syncPendingData();
  },
  
  showStatus(type, message, icon) {
    this.statusBanner.className = `network-status ${type} show`;
    this.statusBanner.innerHTML = `
      <div class="network-status-icon" aria-hidden="true">${icon}</div>
      <span>${message}</span>
    `;
  },
  
  hideStatus() {
    this.statusBanner.classList.remove('show');
  },
  
  // Fonction pour effectuer une requête avec retry automatique
  async fetchWithRetry(url, options = {}, retries = this.retryAttempts) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (retries > 0 && this.isOnline) {
        console.warn(`Retry attempt ${this.retryAttempts - retries + 1} for ${url}`);
        await this.delay(this.retryDelay);
        return this.fetchWithRetry(url, options, retries - 1);
      }
      
      // Si hors ligne, ajouter à la file d'attente
      if (!this.isOnline) {
        this.addToPendingQueue({ url, options });
        throw new Error('Нет подключения к интернету. Запрос будет повторен при восстановлении связи.');
      }
      
      throw error;
    }
  },
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  // Ajouter une requête à la file d'attente
  addToPendingQueue(request) {
    this.pendingRequests.push(request);
    this.savePendingRequests();
  },
  
  // Sauvegarder les requêtes en attente dans localStorage
  savePendingRequests() {
    try {
      localStorage.setItem('pendingRequests', JSON.stringify(this.pendingRequests));
    } catch (e) {
      console.warn('Impossible de sauvegarder les requêtes en attente:', e);
    }
  },
  
  // Charger les requêtes en attente depuis localStorage
  loadPendingRequests() {
    try {
      const saved = localStorage.getItem('pendingRequests');
      if (saved) {
        this.pendingRequests = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Impossible de charger les requêtes en attente:', e);
    }
  },
  
  // Synchroniser les données en attente
  async syncPendingData() {
    this.loadPendingRequests();
    
    if (this.pendingRequests.length === 0) {
      return;
    }
    
    console.log(`Synchronisation de ${this.pendingRequests.length} requête(s) en attente...`);
    
    const requests = [...this.pendingRequests];
    this.pendingRequests = [];
    
    for (const request of requests) {
      try {
        await fetch(request.url, request.options);
        console.log(`Requête synchronisée: ${request.url}`);
      } catch (error) {
        console.error(`Échec de synchronisation: ${request.url}`, error);
        // Remettre dans la file si échec
        this.addToPendingQueue(request);
      }
    }
    
    this.savePendingRequests();
    
    if (this.pendingRequests.length === 0 && window.LavCafe && window.LavCafe.Toast) {
      window.LavCafe.Toast.success('Все данные синхронизированы');
    }
  },
  
  // Vérifier si en ligne avant une action
  requireOnline(action) {
    if (!this.isOnline) {
      if (window.LavCafe && window.LavCafe.Toast) {
        window.LavCafe.Toast.error('Для этого действия требуется подключение к интернету');
      }
      return false;
    }
    return true;
  }
};

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('[Service Worker] Web API non supportée');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    console.log('[Service Worker] Enregistré avec succès :', registration.scope);

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            Toast.info('Une nouvelle version est disponible. Rechargez la page pour mettre à jour.');
          }
        });
      }
    });
  } catch (error) {
    console.warn('[Service Worker] Impossible de l\'enregistrer :', error);
  }
}

async function clearServiceWorkerCache() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const allCacheNames = await caches.keys();

    await Promise.all(
      allCacheNames
        .filter(name => name.startsWith('lav-cafe-'))
        .map(name => caches.delete(name))
    );

    console.log('[Service Worker] Caches retirés');
    return true;
  } catch (error) {
    console.error('[Service Worker] Erreur suppression cache :', error);
    return false;
  }
}

async function getServiceWorkerVersion() {
  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
    return null;
  }

  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      if (event.data && event.data.version) {
        resolve(event.data.version);
      } else {
        resolve(null);
      }
    };

    navigator.serviceWorker.controller.postMessage({ type: 'GET_VERSION' }, [messageChannel.port2]);
  });
}

window.LavCafe = {
  ParticleSystem,
  initParticles,
  initPageTransitions,
  initButtonRipple,
  initScrollReveal,
  initCursorGlow,
  PageLoader,
  Toast,
  NetworkManager,
  clearServiceWorkerCache,
  getServiceWorkerVersion
};

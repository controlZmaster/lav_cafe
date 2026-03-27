// ===================================
// MICRO-ANIMATIONS UTILITIES
// Лав Кафе - Animation Helpers
// ===================================

/**
 * Anime un compteur de 0 à une valeur cible
 * @param {HTMLElement} element - L'élément à animer
 * @param {number} target - La valeur cible
 * @param {number} duration - Durée en ms (défaut: 300)
 */
function animateCounter(element, target, duration = 300) {
  if (!element) return;
  
  const start = parseInt(element.textContent) || 0;
  const increment = (target - start) / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      element.textContent = Math.round(target);
      element.classList.add('count-animate');
      setTimeout(() => element.classList.remove('count-animate'), 300);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

/**
 * Anime un prix avec effet de mise à jour
 * @param {HTMLElement} element - L'élément prix
 * @param {number} newPrice - Le nouveau prix
 */
function animatePrice(element, newPrice) {
  if (!element) return;
  
  element.classList.add('updated');
  element.textContent = `${newPrice} ₽`;
  
  setTimeout(() => {
    element.classList.remove('updated');
  }, 400);
}

/**
 * Ajoute un effet shake à un élément (pour les erreurs)
 * @param {HTMLElement} element - L'élément à secouer
 */
function shakeElement(element) {
  if (!element) return;
  
  element.classList.add('shake');
  setTimeout(() => {
    element.classList.remove('shake');
  }, 400);
}

/**
 * Fade in d'un élément
 * @param {HTMLElement} element - L'élément à afficher
 */
function fadeIn(element) {
  if (!element) return;
  
  element.style.display = '';
  element.classList.add('fade-in');
  
  setTimeout(() => {
    element.classList.remove('fade-in');
  }, 300);
}

/**
 * Fade out d'un élément
 * @param {HTMLElement} element - L'élément à masquer
 * @param {Function} callback - Fonction à appeler après l'animation
 */
function fadeOut(element, callback) {
  if (!element) return;
  
  element.classList.add('fade-out');
  
  setTimeout(() => {
    element.style.display = 'none';
    element.classList.remove('fade-out');
    if (callback) callback();
  }, 300);
}

/**
 * Ajoute un état de chargement à un bouton
 * @param {HTMLElement} button - Le bouton
 * @param {boolean} loading - État de chargement
 */
function setButtonLoading(button, loading) {
  if (!button) return;
  
  if (loading) {
    button.classList.add('loading');
    button.disabled = true;
  } else {
    button.classList.remove('loading');
    button.disabled = false;
  }
}

/**
 * Anime l'ajout d'un item au panier
 * @param {string} itemId - ID de l'item
 */
function animateAddToCart(itemId) {
  const menuItem = document.querySelector(`[data-item-id="${itemId}"]`);
  const cartBadge = document.getElementById('cart-badge');
  
  if (menuItem && cartBadge) {
    // Animation de l'item
    menuItem.style.transform = 'scale(0.95)';
    setTimeout(() => {
      menuItem.style.transform = '';
    }, 150);
    
    // Animation du badge
    cartBadge.classList.remove('animate');
    void cartBadge.offsetWidth; // Force reflow
    cartBadge.classList.add('animate');
    setTimeout(() => cartBadge.classList.remove('animate'), 400);
  }
}

/**
 * Vérifie si l'utilisateur préfère les animations réduites
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Exécute une animation seulement si l'utilisateur n'a pas désactivé les animations
 * @param {Function} animationFn - Fonction d'animation à exécuter
 */
function runAnimation(animationFn) {
  if (!prefersReducedMotion()) {
    animationFn();
  }
}

/**
 * Ajoute un effet de pulsation à un élément
 * @param {HTMLElement} element - L'élément
 * @param {number} duration - Durée en ms
 */
function pulseElement(element, duration = 300) {
  if (!element || prefersReducedMotion()) return;
  
  const originalTransform = element.style.transform;
  
  element.style.transition = `transform ${duration}ms ease`;
  element.style.transform = 'scale(1.05)';
  
  setTimeout(() => {
    element.style.transform = originalTransform;
    setTimeout(() => {
      element.style.transition = '';
    }, duration);
  }, duration / 2);
}

// Export pour utilisation globale
if (typeof window !== 'undefined') {
  window.Animations = {
    animateCounter,
    animatePrice,
    shakeElement,
    fadeIn,
    fadeOut,
    setButtonLoading,
    animateAddToCart,
    prefersReducedMotion,
    runAnimation,
    pulseElement
  };
}

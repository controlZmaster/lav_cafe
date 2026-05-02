let cartState = {
  items: [],
  tableNumber: ''
};
const removingItemIds = new Set();

function normalizeCartState(rawState) {
  const normalized = {
    items: [],
    tableNumber: ''
  };

  if (!rawState || typeof rawState !== 'object') {
    return normalized;
  }

  if (Array.isArray(rawState.items)) {
    normalized.items = rawState.items
      .filter(item => item && typeof item === 'object' && item.id)
      .map(item => ({
        id: String(item.id),
        name: String(item.name || ''),
        price: Number(item.price) || 0,
        quantity: Math.max(1, Number(item.quantity) || 1)
      }));
  }

  if (rawState.tableNumber) {
    normalized.tableNumber = String(rawState.tableNumber);
  }

  return normalized;
}

function getItemCount() {
  if (!Array.isArray(cartState.items)) return 0;
  return cartState.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
}

function loadCart() {
  try {
    const saved = sessionStorage.getItem('cart');
    if (saved) {
      cartState = normalizeCartState(JSON.parse(saved));
    }
    
    const tableNumber = sessionStorage.getItem('tableNumber');
    if (tableNumber) {
      cartState.tableNumber = tableNumber;
    }
  } catch (e) {
    console.warn('Storage non disponible:', e);
    // Le cartState reste avec les valeurs par défaut
  }
  
  return cartState;
}

function saveCart() {
  try {
    sessionStorage.setItem('cart', JSON.stringify(cartState));
  } catch (e) {
    console.warn('Storage non disponible:', e);
    // Le panier reste en mémoire mais ne sera pas persisté
  }
}

function addItem(itemData) {
  if (!Array.isArray(cartState.items)) {
    cartState.items = [];
  }

  const existingItem = cartState.items.find(item => item.id === itemData.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartState.items.push({
      id: itemData.id,
      name: itemData.name,
      price: itemData.price,
      quantity: 1
    });
  }
  
  saveCart();
  renderCart();
  updateCartBadge();
  updateMobileBottomBar();
  
  // Animation bounce sur le badge du panier
  const cartBadge = document.getElementById('cart-badge');
  if (cartBadge) {
    cartBadge.classList.remove('animate');
    void cartBadge.offsetWidth; // Force reflow
    cartBadge.classList.add('animate');
    setTimeout(() => cartBadge.classList.remove('animate'), 400);
  }
}

function removeItem(itemId) {
  if (removingItemIds.has(itemId)) return;

  removingItemIds.add(itemId);
  renderCart();

  setTimeout(() => {
    cartState.items = cartState.items.filter(item => item.id !== itemId);
    removingItemIds.delete(itemId);
    saveCart();
    renderCart();
    updateCartBadge();
    updateMobileBottomBar();
  }, 220);
}

function clear() {
  cartState.items = [];
  removingItemIds.clear();
  saveCart();
  renderCart();
  updateCartBadge();
  updateMobileBottomBar();
}

function updateQuantity(itemId, delta) {
  const item = cartState.items.find(item => item.id === itemId);
  
  if (item) {
    item.quantity += delta;
    
    if (item.quantity <= 0) {
      removeItem(itemId);
    } else {
      saveCart();
      renderCart();
      updateCartBadge();
      updateMobileBottomBar();
    }
  }
}

function getTotal() {
  const subtotal = cartState.items.reduce((sum, item) => {
    return sum + ((Number(item.price) || 0) * (Number(item.quantity) || 0));
  }, 0);
  
  const service = 0;
  const total = subtotal;
  
  return { subtotal, service, total };
}

function renderCart() {
  const cartContent = document.getElementById('cart-content');
  const cartEmpty = document.getElementById('cart-empty');
  const cartSummary = document.getElementById('cart-summary');
  const cartTableInfo = document.getElementById('cart-table-info');
  
  if (!cartContent) return;
  
  if (cartTableInfo && cartState.tableNumber) {
    cartTableInfo.textContent = `Стол ${cartState.tableNumber}`;
  }
  
  if (cartState.items.length === 0) {
    cartContent.innerHTML = '';
    if (cartEmpty) cartEmpty.style.display = 'flex';
    if (cartSummary) cartSummary.style.display = 'none';
    return;
  }
  
  if (cartEmpty) cartEmpty.style.display = 'none';
  if (cartSummary) cartSummary.style.display = 'block';
  
  const previousItemIds = Array.from(cartContent.querySelectorAll('.cart-item')).map(el => 
    el.querySelector('.cart-item-remove')?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1]
  );
  
  cartContent.innerHTML = cartState.items.map(item => `
    <div class="cart-item ${!previousItemIds.includes(item.id) ? 'new' : ''} ${removingItemIds.has(item.id) ? 'removing' : ''}">
      <div class="cart-item-header">
        <div class="cart-item-name">${item.name}</div>
        <button class="cart-item-remove" onclick="Cart.removeItem('${item.id}')" aria-label="Retirer">×</button>
      </div>
      <div class="cart-item-footer">
        <div class="quantity-controls">
          <button class="qty-btn" onclick="Cart.updateQuantity('${item.id}', -1)">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" onclick="Cart.updateQuantity('${item.id}', 1)">+</button>
        </div>
        <div class="cart-item-price">${item.price * item.quantity} ₽</div>
      </div>
    </div>
  `).join('');
  
  // Retirer la classe 'new' après l'animation
  setTimeout(() => {
    cartContent.querySelectorAll('.cart-item.new').forEach(el => el.classList.remove('new'));
  }, 300);
  
  const totals = getTotal();

  const totalEl = document.getElementById('total');
  if (totalEl) totalEl.textContent = `${totals.total} ₽`;
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = String(getItemCount());
  }
}

function updateMobileBottomBar() {
  const bottomBarCount = document.getElementById('bottom-bar-count');
  const bottomBarTotal = document.getElementById('bottom-bar-total');
  const mobileBottomBar = document.getElementById('mobile-bottom-bar');
  
  if (bottomBarCount && bottomBarTotal) {
    const itemCount = getItemCount();
    const totals = getTotal();
    
    bottomBarCount.textContent = itemCount === 1 ? '1 позиция' : itemCount < 5 ? `${itemCount} позиции` : `${itemCount} позиций`;
    bottomBarTotal.textContent = `${totals.total} ₽`;
    
    if (mobileBottomBar) {
      if (itemCount > 0) {
        mobileBottomBar.style.display = 'flex';
      } else {
        mobileBottomBar.style.display = 'none';
      }
    }
  }
}

function initCartUI() {
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const bottomBarBtn = document.getElementById('bottom-bar-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartPanel = document.getElementById('cart-panel');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const categorySidebar = document.getElementById('category-sidebar');
  
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (cartState.items.length === 0) {
        if (window.LavCafe && window.LavCafe.Toast) {
          window.LavCafe.Toast.warning('Ваш выбор пуст');
        }
        return;
      }
      clear();
      if (window.LavCafe && window.LavCafe.Toast) {
        window.LavCafe.Toast.success('Выбор очищен', 1800);
      }
    });
  }

  if (cartToggleBtn && cartPanel && cartOverlay) {
    cartToggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        cartPanel.classList.add('open');
        cartOverlay.classList.add('show');
        if (categorySidebar) categorySidebar.classList.remove('open');
      } else {
        cartPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
  
  if (bottomBarBtn && cartPanel && cartOverlay) {
    bottomBarBtn.addEventListener('click', () => {
      cartPanel.classList.add('open');
      cartOverlay.classList.add('show');
      if (categorySidebar) categorySidebar.classList.remove('open');
    });
    
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        cartPanel.classList.remove('open');
        cartOverlay.classList.remove('show');
        if (categorySidebar) categorySidebar.classList.remove('open');
      }
    });
  }
  
  if (mobileMenuBtn && categorySidebar && cartOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      categorySidebar.classList.toggle('open');
      if (categorySidebar.classList.contains('open')) {
        cartOverlay.classList.add('show');
        if (cartPanel) cartPanel.classList.remove('open');
      } else {
        cartOverlay.classList.remove('show');
      }
    });
  }
  
  const categoryLinks = document.querySelectorAll('.category-link');
  categoryLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        if (categorySidebar) categorySidebar.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('show');
      }
    });
  });
}

window.Cart = {
  loadCart,
  saveCart,
  addItem,
  removeItem,
  clear,
  updateQuantity,
  getTotal,
  renderCart,
  updateCartBadge,
  updateMobileBottomBar,
  initCartUI
};

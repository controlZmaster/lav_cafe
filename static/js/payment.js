let selectedMethod = null;
let cartData = null;
let totalAmount = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadCartData();
  setupPaymentMethods();
  setupFormHandlers();
  setupConfirmButton();
});

function loadCartData() {
  try {
    const cart = sessionStorage.getItem('cart');
    const tableNumber = sessionStorage.getItem('tableNumber');
    
    if (!cart) {
      showEmptyCart();
      return;
    }
    
    cartData = JSON.parse(cart);
    
    if (cartData.items.length === 0) {
      showEmptyCart();
      return;
    }
    
    renderOrderSummary(cartData, tableNumber);
    updateTableNumber(tableNumber);
    updateTimestamp();
  } catch (e) {
    console.warn('Storage non disponible:', e);
    showEmptyCart();
  }
}

function showEmptyCart() {
  document.getElementById('order-items').style.display = 'none';
  document.getElementById('order-totals').style.display = 'none';
  document.getElementById('empty-cart-warning').style.display = 'block';
  document.getElementById('confirm-btn').disabled = true;
}

function renderOrderSummary(cart, tableNumber) {
  const orderItemsContainer = document.getElementById('order-items');
  
  orderItemsContainer.innerHTML = cart.items.map(item => `
    <div class="order-item">
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-quantity">Quantité: ${item.quantity}</div>
      </div>
      <div class="item-total">${item.price * item.quantity} ₽</div>
    </div>
  `).join('');
  
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const service = Math.round(subtotal * 0.1);
  const total = subtotal + service;
  
  totalAmount = total;
  
  document.getElementById('subtotal-amount').textContent = `${subtotal} ₽`;
  document.getElementById('service-amount').textContent = `${service} ₽`;
  document.getElementById('total-amount').textContent = `${total} ₽`;
  document.getElementById('table-number').textContent = tableNumber || '-';
  
  document.getElementById('moncash-total').textContent = `${total} ₽`;
  document.getElementById('cash-total').textContent = `${total} ₽`;
  document.getElementById('cash-table').textContent = tableNumber || '-';
}

function updateTableNumber(tableNumber) {
  const navTableNumber = document.getElementById('table-number-nav');
  if (navTableNumber) {
    navTableNumber.textContent = tableNumber || '-';
  }
}

function updateTimestamp() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const timeStr = now.toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  document.getElementById('order-timestamp').textContent = `Заказ от ${dateStr} в ${timeStr}`;
}

function setupPaymentMethods() {
  const methodCards = document.querySelectorAll('.payment-method-card');
  
  methodCards.forEach(card => {
    card.addEventListener('click', () => {
      methodCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      selectedMethod = card.getAttribute('data-method');
      
      document.getElementById('form-card').style.display = 'none';
      document.getElementById('form-moncash').style.display = 'none';
      document.getElementById('form-cash').style.display = 'none';
      
      if (selectedMethod === 'card') {
        document.getElementById('form-card').style.display = 'block';
      } else if (selectedMethod === 'moncash') {
        document.getElementById('form-moncash').style.display = 'block';
      } else if (selectedMethod === 'cash') {
        document.getElementById('form-cash').style.display = 'block';
      }
      
      updateConfirmButton();
    });
  });
}

function setupFormHandlers() {
  const cardNumber = document.getElementById('card-number');
  const cardExpiry = document.getElementById('card-expiry');
  const cardCvv = document.getElementById('card-cvv');
  const instructionsInput = document.getElementById('instructions');
  
  if (cardNumber) {
    cardNumber.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
      
      detectCardType(value);
    });
  }
  
  if (cardExpiry) {
    cardExpiry.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }
  
  if (cardCvv) {
    cardCvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
  
  if (instructionsInput) {
    instructionsInput.addEventListener('input', (e) => {
      const charCount = e.target.value.length;
      document.getElementById('char-count').textContent = charCount;
    });
  }
}

function detectCardType(number) {
  const logo = document.getElementById('card-type-logo');
  
  if (number.startsWith('4')) {
    logo.textContent = 'VISA';
    logo.style.color = 'var(--color-gold)';
  } else if (number.startsWith('5')) {
    logo.textContent = 'MC';
    logo.style.color = 'var(--color-gold)';
  } else {
    logo.textContent = '';
  }
}

function updateConfirmButton() {
  const btn = document.getElementById('confirm-btn');
  const btnText = document.getElementById('btn-text');
  
  if (!selectedMethod) {
    btn.disabled = true;
    btnText.textContent = 'Выберите способ оплаты';
    return;
  }
  
  btn.disabled = false;
  
  if (selectedMethod === 'card') {
    btnText.textContent = `Оплатить ${totalAmount} ₽`;
  } else if (selectedMethod === 'moncash') {
    btnText.textContent = 'Отправить запрос на оплату';
  } else if (selectedMethod === 'cash') {
    btnText.textContent = 'Подтвердить заказ';
  }
}

function setupConfirmButton() {
  const btn = document.getElementById('confirm-btn');
  
  btn.addEventListener('click', () => {
    if (!selectedMethod || !cartData) return;
    
    if (!validatePaymentForm()) {
      return;
    }
    
    processPayment();
  });
}

function validatePaymentForm() {
  if (selectedMethod === 'card') {
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const cardName = document.getElementById('card-name').value.trim();
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      if (window.LavCafe && window.LavCafe.Toast) {
        window.LavCafe.Toast.error('Неверный номер карты');
      }
      return false;
    }
    
    if (!cardName) {
      if (window.LavCafe && window.LavCafe.Toast) {
        window.LavCafe.Toast.error('Требуется имя владельца');
      }
      return false;
    }
    
    if (cardExpiry.length !== 5) {
      if (window.LavCafe && window.LavCafe.Toast) {
        window.LavCafe.Toast.error('Неверная дата истечения');
      }
      return false;
    }
    
    if (cardCvv.length !== 3) {
      if (window.LavCafe && window.LavCafe.Toast) {
        window.LavCafe.Toast.error('Неверный CVV');
      }
      return false;
    }
  } else if (selectedMethod === 'moncash') {
    const phone = document.getElementById('moncash-phone').value;
    
    if (phone.length !== 8) {
      if (window.LavCafe && window.LavCafe.Toast) {
        window.LavCafe.Toast.error('Неверный номер телефона');
      }
      return false;
    }
  }
  
  return true;
}

function processPayment() {
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const btn = document.getElementById('confirm-btn');
  
  btn.disabled = true;
  btnText.style.display = 'none';
  btnSpinner.style.display = 'inline';
  
  const orderId = Math.floor(100000 + Math.random() * 900000);
  const instructions = document.getElementById('instructions').value.trim();
  
  let tableNumber = '';
  try {
    tableNumber = sessionStorage.getItem('tableNumber');
  } catch (e) {
    console.warn('Storage non disponible:', e);
  }
  
  const orderData = {
    orderId: orderId,
    tableNumber: tableNumber,
    items: cartData.items,
    subtotal: cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    service: Math.round(cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1),
    total: totalAmount,
    paymentMethod: selectedMethod,
    instructions: instructions,
    timestamp: new Date().toISOString(),
    status: 'confirmed'
  };
  
  setTimeout(() => {
    try {
      sessionStorage.setItem('orderData', JSON.stringify(orderData));
      sessionStorage.removeItem('cart');
    } catch (e) {
      console.warn('Storage non disponible:', e);
    }
    
    window.location.href = 'order-status.html';
  }, 2000);
}

let orderData = null;
let countdownInterval = null;
let remainingSeconds = 900;

document.addEventListener('DOMContentLoaded', () => {
  loadOrderData();
  
  if (!orderData) {
    window.location.href = 'index.html';
    return;
  }
  
  renderOrderDetails();
  startCountdown();
  startStatusProgression();
  setupCallServerButton();
});

function loadOrderData() {
  const data = sessionStorage.getItem('orderData');
  
  if (data) {
    orderData = JSON.parse(data);
  }
}

function renderOrderDetails() {
  document.getElementById('order-id').textContent = orderData.orderId;
  document.getElementById('order-table').textContent = orderData.tableNumber;
  document.getElementById('order-total').textContent = `${orderData.total} ₽`;
  document.getElementById('toast-table').textContent = orderData.tableNumber;
  
  const orderTime = new Date(orderData.timestamp);
  const now = new Date();
  const diffSeconds = Math.floor((now - orderTime) / 1000);
  
  let timeText = 'Несколько мгновений назад';
  if (diffSeconds > 60) {
    const minutes = Math.floor(diffSeconds / 60);
    const minuteWord = minutes === 1 ? 'минуту' : minutes < 5 ? 'минуты' : 'минут';
    timeText = `${minutes} ${minuteWord} назад`;
  }
  
  document.getElementById('order-time').textContent = timeText;
  
  const itemsList = document.getElementById('order-items-list');
  itemsList.innerHTML = orderData.items.map(item => `
    <div class="order-item-row">
      <div class="item-info">
        <div class="item-name-qty">${item.name} × ${item.quantity}</div>
      </div>
      <div class="item-price">${item.price * item.quantity} ₽</div>
    </div>
  `).join('');
}

function startCountdown() {
  updateCountdownDisplay();
  
  countdownInterval = setInterval(() => {
    remainingSeconds--;
    
    if (remainingSeconds <= 0) {
      clearInterval(countdownInterval);
      showCountdownComplete();
    } else {
      updateCountdownDisplay();
    }
  }, 1000);
}

function updateCountdownDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('countdown-display').textContent = display;
}

function showCountdownComplete() {
  document.getElementById('countdown-display').style.display = 'none';
  document.getElementById('time-complete').style.display = 'flex';
}

function startStatusProgression() {
  setTimeout(() => {
    advanceToStep(3);
  }, 8000);
  
  setTimeout(() => {
    advanceToStep(4);
  }, 20000);
}

function advanceToStep(stepNumber) {
  const currentStep = document.querySelector('.step.active');
  const nextStep = document.getElementById(`step-${stepNumber}`);
  
  if (currentStep) {
    currentStep.classList.remove('active');
    currentStep.classList.add('completed');
    
    const icon = currentStep.querySelector('.step-icon');
    icon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    `;
    
    const time = currentStep.querySelector('.step-time');
    time.textContent = 'Завершено';
  }
  
  if (nextStep) {
    nextStep.classList.remove('pending');
    nextStep.classList.add('active');
    
    const icon = nextStep.querySelector('.step-icon');
    icon.innerHTML = '<div class="spinner"></div>';
    
    const time = nextStep.querySelector('.step-time');
    time.textContent = 'В процессе...';
    
    if (stepNumber === 4) {
      setTimeout(() => {
        nextStep.classList.remove('active');
        nextStep.classList.add('completed');
        
        icon.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        `;
        
        time.textContent = 'Завершено';
      }, 3000);
    }
  }
}

function setupCallServerButton() {
  const btn = document.getElementById('call-server-btn');
  const toast = document.getElementById('toast');
  
  btn.addEventListener('click', () => {
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  });
}

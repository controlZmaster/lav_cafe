document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initFloatingLabels();
  initPasswordToggles();
  initPasswordStrength();
  initFormValidation();
});

function initParticles() {
  const canvas = document.getElementById('auth-particles-canvas');
  if (!canvas) return;
  
  if (typeof ParticleSystem !== 'undefined') {
    const particleSystem = new ParticleSystem(canvas);
    particleSystem.animate();
  }
}

function initFloatingLabels() {
  const inputs = document.querySelectorAll('.form-input');
  
  inputs.forEach(input => {
    if (input.value.trim() !== '') {
      input.classList.add('filled');
    }
    
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.classList.add('filled');
      } else {
        input.classList.remove('filled');
      }
    });
    
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        input.classList.add('filled');
      } else {
        input.classList.remove('filled');
      }
    });
  });
}

function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.password-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = button.querySelector('.eye-icon');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = '👁️‍🗨️';
      } else {
        input.type = 'password';
        icon.textContent = '👁️';
      }
    });
  });
}

function initPasswordStrength() {
  const passwordInput = document.getElementById('password');
  const strengthFill = document.getElementById('strength-fill');
  const strengthText = document.getElementById('strength-text');
  
  if (!passwordInput || !strengthFill || !strengthText) return;
  
  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);
    
    strengthFill.className = 'strength-fill';
    
    if (password.length === 0) {
      strengthText.textContent = 'Entrez un mot de passe';
      return;
    }
    
    if (strength.score === 1) {
      strengthFill.classList.add('weak');
      strengthText.textContent = 'Faible';
    } else if (strength.score === 2) {
      strengthFill.classList.add('medium');
      strengthText.textContent = 'Moyen';
    } else {
      strengthFill.classList.add('strong');
      strengthText.textContent = 'Fort';
    }
  });
}

function calculatePasswordStrength(password) {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 1) return { score: 1, label: 'weak' };
  if (score <= 3) return { score: 2, label: 'medium' };
  return { score: 3, label: 'strong' };
}

function initFormValidation() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const guestForm = document.getElementById('guest-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegisterSubmit);
  }
  
  if (guestForm) {
    guestForm.addEventListener('submit', handleGuestSubmit);
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  
  clearErrors();
  
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  
  let isValid = true;
  
  if (!email.value.trim()) {
    showError('email', 'Требуется электронная почта');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError('email', 'Неверный формат электронной почты');
    isValid = false;
  }
  
  if (!password.value.trim()) {
    showError('password', 'Требуется пароль');
    isValid = false;
  }
  
  if (isValid) {
    window.location.href = 'qr-scan.html';
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  
  clearErrors();
  
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const terms = document.getElementById('terms');
  
  let isValid = true;
  
  if (!firstname.value.trim()) {
    showError('firstname', 'Требуется имя');
    isValid = false;
  }
  
  if (!lastname.value.trim()) {
    showError('lastname', 'Требуется фамилия');
    isValid = false;
  }
  
  if (!email.value.trim()) {
    showError('email', 'Требуется электронная почта');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError('email', 'Неверный формат электронной почты');
    isValid = false;
  }
  
  if (!password.value.trim()) {
    showError('password', 'Требуется пароль');
    isValid = false;
  } else if (password.value.length < 8) {
    showError('password', 'Пароль должен содержать не менее 8 символов');
    isValid = false;
  }
  
  if (!confirmPassword.value.trim()) {
    showError('confirm-password', 'Пожалуйста, подтвердите пароль');
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    showError('confirm-password', 'Пароли не совпадают');
    isValid = false;
  }
  
  if (!terms.checked) {
    showError('terms', 'Вы должны принять условия использования');
    isValid = false;
  }
  
  if (isValid) {
    window.location.href = 'qr-scan.html';
  }
}

function handleGuestSubmit(e) {
  e.preventDefault();
  window.location.href = 'qr-scan.html';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}-error`);
  
  if (input) {
    input.classList.add('error');
  }
  
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  const errorInputs = document.querySelectorAll('.form-input.error');
  
  errorMessages.forEach(error => {
    error.classList.remove('show');
    error.textContent = '';
  });
  
  errorInputs.forEach(input => {
    input.classList.remove('error');
  });
}

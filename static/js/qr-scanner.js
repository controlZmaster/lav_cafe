let videoStream = null;
let scanning = false;

document.addEventListener('DOMContentLoaded', () => {
  initQRScanner();
  initManualForm();
});

async function initQRScanner() {
  const video = document.getElementById('qr-video');
  const canvas = document.getElementById('qr-canvas');
  const scannerBox = document.getElementById('scanner-box');
  const statusText = document.getElementById('scanner-status');
  
  if (!video || !canvas) return;
  
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    
    video.srcObject = videoStream;
    video.setAttribute('playsinline', true);
    
    await video.play();
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    scanning = true;
    scanQRCode(video, canvas, scannerBox, statusText);
    
  } catch (error) {
    console.error('Camera access error:', error);
    statusText.textContent = 'Невозможно получить доступ к камере. Используйте ручной ввод ниже.';
    statusText.classList.remove('scanning-dots');
  }
}

function scanQRCode(video, canvas, scannerBox, statusText) {
  if (!scanning) return;
  
  const ctx = canvas.getContext('2d');
  
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    if (typeof jsQR !== 'undefined') {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      
      if (code) {
        handleQRCodeDetected(code.data, scannerBox, statusText);
        return;
      }
    }
  }
  
  requestAnimationFrame(() => scanQRCode(video, canvas, scannerBox, statusText));
}

function handleQRCodeDetected(data, scannerBox, statusText) {
  scanning = false;
  
  const tableMatch = data.match(/table[:\s-]*(\d+)/i);
  const tableNumber = tableMatch ? tableMatch[1] : data.replace(/\D/g, '');
  
  if (tableNumber && parseInt(tableNumber) >= 1 && parseInt(tableNumber) <= 20) {
    scannerBox.classList.add('success');
    
    const successOverlay = document.getElementById('success-overlay');
    const successText = document.getElementById('success-text');
    
    successText.textContent = `Стол ${tableNumber} обнаружен!`;
    successOverlay.classList.add('show');
    
    statusText.textContent = 'Успех!';
    statusText.classList.remove('scanning-dots');
    
    try {
      sessionStorage.setItem('tableNumber', tableNumber);
    } catch (e) {
      console.warn('Storage non disponible:', e);
    }
    
    setTimeout(() => {
      stopCamera();
      window.location.href = 'menu.html';
    }, 1500);
  } else {
    scanning = true;
  }
}

function initManualForm() {
  const form = document.getElementById('manual-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const input = document.getElementById('table-number');
      const tableNumber = input.value;
      
      if (tableNumber && parseInt(tableNumber) >= 1 && parseInt(tableNumber) <= 20) {
        try {
          sessionStorage.setItem('tableNumber', tableNumber);
        } catch (e) {
          console.warn('Storage non disponible:', e);
        }
        stopCamera();
        window.location.href = 'menu.html';
      }
    });
  }
}

function stopCamera() {
  scanning = false;
  
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
  }
}

window.addEventListener('beforeunload', stopCamera);

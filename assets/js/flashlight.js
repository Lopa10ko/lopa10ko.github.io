// Flashlight effect for the background and text
const root = document.getElementById('flashlight-root');
let flashlight = document.createElement('canvas');
flashlight.className = 'flashlight';
document.body.appendChild(flashlight);

function resizeCanvas() {
  flashlight.width = window.innerWidth;
  flashlight.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let mouse = { x: window.innerWidth, y: window.innerHeight/10 };
let radius = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--flashlight-radius'));
let isTouch = false;

function drawFlashlight() {
  const ctx = flashlight.getContext('2d');
  ctx.clearRect(0, 0, flashlight.width, flashlight.height);
  ctx.save();
  ctx.globalCompositeOperation = 'difference';
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.restore();
  flashlight.style.opacity = '1';
}

drawFlashlight();

function update(e) {
  if (e.touches && e.touches.length) {
    isTouch = true;
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    drawFlashlight();
  } else if (e instanceof MouseEvent) {
    isTouch = false;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    drawFlashlight();
  }
}

window.addEventListener('mousemove', update);
window.addEventListener('touchstart', update, {passive: false});
window.addEventListener('touchmove', update, {passive: false});
window.addEventListener('touchend', e => {
  // Keep flashlight at last position, keep visible
  flashlight.style.opacity = '1';
});

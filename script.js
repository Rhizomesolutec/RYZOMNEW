/* Year in footer */
document.getElementById('year').textContent = new Date().getFullYear();

/* Typing animation */
const words = [
  "Network",
  "Branding",
  "Software",
  "Media production",
  "Digital Marketing",
  "Innovation",
  "Strategy",
  "Web Development"
];
const typingEl = document.getElementById('typing-words');
let wi = 0, ci = 0, deleting = false;

function typeLoop() {
  const current = words[wi];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ci + 1);
    ci++;
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typingEl.textContent = current.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    setTimeout(typeLoop, 60);
  }
}
typeLoop();

/* IntersectionObserver for fade-up elements */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-in');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-up, .showcase-item, .card, .about-card').forEach(el => observer.observe(el));

/* Animated network canvas */
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
let W, H, points;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initPoints();
}
window.addEventListener('resize', resize);
resize();

function rand(min, max) { return Math.random() * (max - min) + min; }

function initPoints() {
  const density = Math.min(90, Math.floor((W * H) / 18000)); // scale with viewport
  points = Array.from({ length: density }, () => ({
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.4, 0.4),
    vy: rand(-0.4, 0.4)
  }));
}

function step() {
  ctx.clearRect(0, 0, W, H);

  // update nodes
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  }

  // draw lines
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i], b = points[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 140) {
        const alpha = (1 - dist / 140) * 0.35;
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(235,87,87,${alpha})`);   // red
        grad.addColorStop(1, `rgba(47,128,236,${alpha})`);  // blue
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // draw nodes
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    ctx.fillStyle = 'rgba(242,201,77,0.6)'; // yellow accent
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(step);
}
step();

/* Mobile nav toggle */
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const opened = nav.style.display === 'flex';
  nav.style.display = opened ? 'none' : 'flex';
});

/* Natural Tree Drawing Functions */

function drawTrunk(ctx, startX, startY, height) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, startY - height);
  ctx.strokeStyle = '#5a3e1b';
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawBranch(ctx, startX, startY, length, angle, width) {
  const endX = startX + length * Math.cos(angle);
  const endY = startY - length * Math.sin(angle);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = '#5a3e1b';
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.stroke();

  return { x: endX, y: endY };
}

function drawLeaf(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.fillStyle = Math.random() > 0.5 ? '#2ecc71' : '#27ae60';
  ctx.fill();
}

function growTree() {
  const canvas = document.getElementById('treeCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = 600;

  // Draw trunk
  const trunkHeight = 200;
  const trunkTop = { x: canvas.width / 2, y: canvas.height - trunkHeight };
  drawTrunk(ctx, canvas.width / 2, canvas.height, trunkHeight);

  // Branches
  const branches = [
    { angle: Math.PI / 2 - 0.3, length: 120, width: 12 },
    { angle: Math.PI / 2 + 0.3, length: 120, width: 12 },
    { angle: Math.PI / 2 - 0.6, length: 100, width: 10 },
    { angle: Math.PI / 2 + 0.6, length: 100, width: 10 },
    { angle: Math.PI / 2 - 0.45, length: 80, width: 8 },
    { angle: Math.PI / 2 + 0.45, length: 80, width: 8 }
  ];

  // Animate sway
  let swayAngle = 0;
  function sway() {
    swayAngle += 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw trunk
    drawTrunk(ctx, canvas.width / 2, canvas.height, trunkHeight);

    // Redraw branches with sway
    branches.forEach(b => {
      const branchEnd = drawBranch(
        ctx,
        trunkTop.x,
        trunkTop.y,
        b.length,
        b.angle + Math.sin(swayAngle) * 0.05,
        b.width
      );

      // Add leaves at branch ends
      for (let i = 0; i < 5; i++) {
        const lx = branchEnd.x + Math.random() * 30 - 15;
        const ly = branchEnd.y + Math.random() * 30 - 15;
        drawLeaf(ctx, lx, ly);
      }
    });

    requestAnimationFrame(sway);
  }
  sway();
}

window.addEventListener('load', growTree);

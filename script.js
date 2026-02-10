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

/* Canvas Growth Tree with Animated Roots + Fatty Branches + Sway */
const services = [
  "Branding & Design",
  "Web Development",
  "Mobile Apps",
  "Digital Marketing",
  "Media Production",
  "Business Strategy"
];

function drawBranch(ctx, x, y, length, angle, depth, width, label, sway = 0) {
  if (depth === 0) return;

  const endX = x + length * Math.cos(angle + sway);
  const endY = y - length * Math.sin(angle + sway);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = '#4a2c0a';
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.stroke();

  // leaves
  if (depth <= 2) {
    ctx.beginPath();
    ctx.arc(endX, endY, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#2ecc71';
    ctx.fill();
  }

  // fruit + label
  if (depth === 1 && label) {
    ctx.beginPath();
    ctx.arc(endX, endY, 11, 0, Math.PI * 2);
    ctx.fillStyle = '#f2c94c';
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.font = '16px Montserrat';
    ctx.fillText(label, endX + 14, endY);
  }

  drawBranch(ctx, endX, endY, length * 0.78, angle - 0.35, depth - 1, width * 0.75, label, sway);
  drawBranch(ctx, endX, endY, length * 0.78, angle + 0.35, depth - 1, width * 0.75, label, sway);
}

function drawRoots(ctx, x, y) {
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';

  const angles = [1.1, 1.25, 0.85, 0.75].map(a => a * Math.PI);

  angles.forEach(a => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + 140 * Math.cos(a),
      y - 140 * Math.sin(a)
    );
    ctx.stroke();
  });
}

function growTree() {
  const canvas = document.getElementById('treeCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = 600;

  const baseX = canvas.width / 2;
  const baseY = canvas.height;

  let sway = 0;

  function animate() {
    sway += 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // static roots
    drawRoots(ctx, baseX, baseY);

    const swayOffset = Math.sin(sway) * 0.05;

    // trunk
    drawBranch(ctx, baseX, baseY, 200, Math.PI / 2, 8, 18, null, swayOffset);

    // main branches
    drawBranch(ctx, baseX, baseY - 120, 150, Math.PI / 2 - 0.3, 6, 12, services[0], swayOffset);
    drawBranch(ctx, baseX, baseY - 120, 150, Math.PI / 2 + 0.3, 6, 12, services[1], swayOffset);

    drawBranch(ctx, baseX, baseY - 200, 130, Math.PI / 2 - 0.6, 5, 11, services[2], swayOffset);
    drawBranch(ctx, baseX, baseY - 200, 130, Math.PI / 2 + 0.6, 5, 11, services[3], swayOffset);

    drawBranch(ctx, baseX, baseY - 260, 110, Math.PI / 2 - 0.45, 5, 10, services[4], swayOffset);
    drawBranch(ctx, baseX, baseY - 260, 110, Math.PI / 2 + 0.45, 5, 10, services[5], swayOffset);

    requestAnimationFrame(animate);
  }

  animate();
}

window.addEventListener('load', growTree);

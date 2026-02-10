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

/* Canvas Growth Tree with Animated Roots + Fatty Branches + Extra Leaves + Sway */
const services = [
  "Branding & Design",
  "Web Development",
  "Mobile Apps",
  "Digital Marketing",
  "Media Production",
  "Business Strategy"
];

function drawRoots(ctx, startX, startY) {
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(139,69,19,0.6)';
  ctx.shadowBlur = 15;

  const rootAngles = [Math.PI * 1.1, Math.PI * 1.25, Math.PI * 0.85, Math.PI * 0.75];
  rootAngles.forEach(angle => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    const endX = startX + 150 * Math.cos(angle);
    const endY = startY - 100 * Math.sin(angle);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  });
}

function drawBranch(ctx, startX, startY, length, angle, branchWidth, serviceLabel = null) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  const endX = startX + length * Math.cos(angle);
  const endY = startY - length * Math.sin(angle);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = '#4a2c0a';
  ctx.lineWidth = branchWidth;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Scatter leaves
  const leafCount = Math.floor(length / 25);
  for (let i = 1; i <= leafCount; i++) {
    const lx = startX + (length * i / leafCount) * Math.cos(angle);
    const ly = startY - (length * i / leafCount) * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(lx, ly, 6, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? '#2ecc71' : '#27ae60';
    ctx.fill();
  }

  // Fruits + labels
  if (serviceLabel) {
    ctx.beginPath();
    ctx.arc(endX, endY, 11, 0, Math.PI * 2);
    ctx.fillStyle = '#f2c94c';
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.font = '16px Montserrat';
    ctx.fillText(serviceLabel, endX + 14, endY);
  }
}

function growTree() {
  const canvas = document.getElementById('treeCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = 600;

  // Draw static roots
  drawRoots(ctx, canvas.width / 2, canvas.height);

  // Branch definitions
  const branches = [
    { length: 200, angle: Math.PI/2, width: 20 }, // trunk
    { length: 150, angle: Math.PI/2 - 0.3, width: 14, label: services[0] },
    { length: 150, angle: Math.PI/2 + 0.3, width: 14, label: services[1] },
    { length: 130, angle: Math.PI/2 - 0.6, width: 12, label: services[2] },
    { length: 130, angle: Math.PI/2 + 0.6, width: 12, label: services[3] },
    { length: 110, angle: Math.PI/2 - 0.45, width: 11, label: services[4] },
    { length: 110, angle: Math.PI/2 + 0.45, width: 11, label: services[5] }
  ];

  // Animate sway
  let swayAngle = 0;
  function sway() {
    swayAngle += 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // redraw roots
    drawRoots(ctx, canvas.width / 2, canvas.height);

    // redraw branches with sway
    branches.forEach(b => {
      drawBranch(ctx, canvas.width / 2, canvas.height, b.length, b.angle + Math.sin(swayAngle) * 0.05, b.width, b.label);
    });

    requestAnimationFrame(sway);
  }
  sway();
}

window.addEventListener('load', growTree);

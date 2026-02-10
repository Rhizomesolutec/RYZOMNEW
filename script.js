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

/* Animated Growth Tree with roots, trunk, branches, leaves, and service labels */

function drawRoots(ctx, startX, startY) {
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';

  const rootAngles = [Math.PI * 1.1, Math.PI * 1.25, Math.PI * 0.85, Math.PI * 0.75];
  rootAngles.forEach(angle => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    const endX = startX + 120 * Math.cos(angle);
    const endY = startY - 80 * Math.sin(angle);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  });

  // Root label
  ctx.fillStyle = '#333';
  ctx.font = '18px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText("Strengthening Root of Business by Branding", startX, startY + 30);
}

function growTree() {
  const canvas = document.getElementById('treeCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = 600;

  const trunkTopX = canvas.width / 2;
  const trunkBottomY = canvas.height;
  const trunkHeight = 200;

  const services = [
    "Branding & Design",
    "Web Development",
    "Mobile Apps",
    "Digital Marketing",
    "Media Production",
    "Business Strategy"
  ];

  const branches = [
    { length: 150, angle: Math.PI/2 - 0.3, width: 14, label: services[0] },
    { length: 150, angle: Math.PI/2 + 0.3, width: 14, label: services[1] },
    { length: 130, angle: Math.PI/2 - 0.6, width: 12, label: services[2] },
    { length: 130, angle: Math.PI/2 + 0.6, width: 12, label: services[3] },
    { length: 110, angle: Math.PI/2 - 0.45, width: 11, label: services[4] },
    { length: 110, angle: Math.PI/2 + 0.45, width: 11, label: services[5] }
  ];

  let progress = 0; // animation progress

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw roots
    drawRoots(ctx, trunkTopX, trunkBottomY);

    // Draw trunk gradually
    const trunkCurrentHeight = Math.min(progress, trunkHeight);
    ctx.beginPath();
    ctx.moveTo(trunkTopX, trunkBottomY);
    ctx.lineTo(trunkTopX, trunkBottomY - trunkCurrentHeight);
    ctx.strokeStyle = '#4a2c0a';
    ctx.lineWidth = 20;
    ctx.stroke();

    const trunkTopY = trunkBottomY - trunkCurrentHeight;

    // Draw branches gradually
    if (progress > trunkHeight) {
      const branchProgress = progress - trunkHeight;
      branches.forEach((b, i) => {
        if (branchProgress > i * 40) { // stagger branch growth
          const endX = trunkTopX + b.length * Math.cos(b.angle);
          const endY = trunkTopY - b.length * Math.sin(b.angle);

          ctx.beginPath();
          ctx.moveTo(trunkTopX, trunkTopY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = '#4a2c0a';
          ctx.lineWidth = b.width;
          ctx.stroke();

          // Leaves appear after branch grows
          if (branchProgress > i * 40 + 20) {
            for (let j = 0; j < 6; j++) {
              const lx = endX + Math.random() * 30 - 15;
              const ly = endY + Math.random() * 30 - 15;
              ctx.beginPath();
              ctx.arc(lx, ly, 6, 0, Math.PI * 2);
              ctx.fillStyle = j % 2 === 0 ? '#2ecc71' : '#27ae60';
              ctx.fill();
            }
          }

          // Service label appears last
          if (branchProgress > i * 40 + 40) {
            ctx.fillStyle = '#333';
            ctx.font = '16px Montserrat';
            ctx.textAlign = 'left';
            ctx.fillText(b.label, endX + 14, endY);
          }
        }
      });
    }

    progress += 2; // speed of growth
    if (progress < trunkHeight + branches.length * 80) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

window.addEventListener('load', growTree);

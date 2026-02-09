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
// ================= GROWTH TREE ANIMATION =================
const treeSvg = document.querySelector('.growth-svg');
const paths = treeSvg?.querySelectorAll('.trunk, .branch');
const labels = treeSvg?.querySelectorAll('.label');
const leaves = treeSvg?.querySelectorAll('.leaf');

window.addEventListener('scroll', () => {
  if (!treeSvg) return;
  const treePos = treeSvg.getBoundingClientRect().top;
  const winHeight = window.innerHeight;

  if (treePos < winHeight - 100) {
    paths.forEach((path, i) => {
      path.style.animation = `draw 1.5s forwards ${i * 0.5}s`;
    });
    labels.forEach((label, i) => {
      setTimeout(() => { label.style.opacity = 1; }, 1500 + i * 500);
    });
    leaves.forEach((leaf, i) => {
      setTimeout(() => {
        leaf.style.opacity = 1;
        leaf.style.transform = 'scale(1)';
      }, 2000 + i * 500);
    });
  }
});

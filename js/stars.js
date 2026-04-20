/* stars.js — Animated starfield canvas */
(function () {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const STAR_COUNT = 280;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.6 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.012 + 0.004,
    color: Math.random() < 0.08
      ? '#4DFFC4'
      : Math.random() < 0.12
      ? '#a78bfa'
      : '#ffffff',
  }));

  const shoots = [];
  function spawnShoot() {
    if (Math.random() < 0.003 && shoots.length < 2) {
      shoots.push({
        x: Math.random() * canvas.width  * 0.65,
        y: Math.random() * canvas.height * 0.35,
        vx: 4 + Math.random() * 3,
        vy: 1.5 + Math.random() * 2,
        life: 1,
        tail: [],
      });
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 0.016;

    stars.forEach(s => {
      const a = 0.25 + 0.75 * Math.abs(Math.sin(s.phase + t * s.speed));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle   = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    spawnShoot();
    for (let i = shoots.length - 1; i >= 0; i--) {
      const sh = shoots[i];
      sh.tail.push({ x: sh.x, y: sh.y });
      if (sh.tail.length > 18) sh.tail.shift();
      sh.x    += sh.vx;
      sh.y    += sh.vy;
      sh.life -= 0.02;

      for (let j = 1; j < sh.tail.length; j++) {
        const prog = j / sh.tail.length;
        ctx.save();
        ctx.globalAlpha = prog * sh.life * 0.65;
        ctx.strokeStyle = '#4DFFC4';
        ctx.lineWidth   = prog * 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.tail[j - 1].x, sh.tail[j - 1].y);
        ctx.lineTo(sh.tail[j].x,     sh.tail[j].y);
        ctx.stroke();
        ctx.restore();
      }

      if (sh.life <= 0 || sh.x > canvas.width || sh.y > canvas.height) {
        shoots.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

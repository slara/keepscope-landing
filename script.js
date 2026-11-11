const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  mobileMenu.hidden = true;
};
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileMenu.hidden = !open;
});
mobileMenu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuButton.focus(); }
});

const approvalDemo = document.querySelector('[data-approval-demo]');
const resetButton = document.querySelector('[data-reset-button]');
const policyChecks = [...document.querySelectorAll('[data-check]')];
const setApproval = approved => {
  approvalDemo.classList.toggle('is-approved', approved);
  document.querySelector('[data-approval-status]').textContent = approved ? 'Envío autorizado' : 'Comprobando la política';
  if (!approved) policyChecks.forEach(item => item.classList.remove('done'));
};

const revealButton = document.querySelector('[data-reveal-button]');
const revealDemo = document.querySelector('[data-reveal-demo]');
revealButton.addEventListener('click', () => {
  const revealed = revealButton.getAttribute('aria-pressed') !== 'true';
  revealDemo.classList.toggle('is-revealed', revealed);
  revealButton.setAttribute('aria-pressed', String(revealed));
  document.querySelector('[data-person]').textContent = revealed ? 'Ana Prueba' : '[KS_…_A]';
  document.querySelector('[data-rut]').textContent = revealed ? '12.345.678-9' : '[KS_…_B]';
  document.querySelector('[data-reveal-label]').textContent = revealed ? 'Volver al texto protegido' : 'Ver datos del ejemplo';
  document.querySelector('[data-protected-status]').textContent = revealed ? 'Datos restituidos' : 'Datos protegidos';
  document.querySelector('[data-reveal-feedback]').textContent = revealed
    ? 'En este ejemplo vuelven el nombre y el RUT. La restitución real exige permisos vigentes y queda registrada.'
    : 'Simulación local. No utiliza datos reales.';
});

// Dot models: 3D point clouds on <canvas data-dots>. The dot colour is the canvas's CSS `color`.
const TAU = Math.PI * 2;
const sphere = (n, r) => Array.from({ length: n }, (_, i) => {
  const y = 1 - 2 * (i + .5) / n, q = Math.sqrt(1 - y * y), a = i * 2.39996; // golden angle spreads the dots evenly
  return [Math.cos(a) * q * r, y * r, Math.sin(a) * q * r];
});
console.assert(Math.abs(Math.hypot(...sphere(9, 1)[4]) - 1) < 1e-9, 'sphere points sit on the unit sphere');
const models = {
  globe: { pts: [...sphere(1500, 1), ...sphere(220, 1.22)], scale: .4, pitch: .3, roll: -.2, spin: .1, dot: 1.05, plasma: true },
  ring: { pts: Array.from({ length: 1500 }, (_, i) => {
    const u = TAU * i / 1500, v = TAU * (i * .618034 % 1), q = 1 + .2 * Math.cos(v);
    return [q * Math.cos(u), .2 * Math.sin(v), q * Math.sin(u)];
  }), scale: .39, pitch: .5, roll: -.28, spin: .16, dot: 1.4 },
  wave: { pts: Array.from({ length: 96 * 30 }, (_, i) => [(i % 96 / 95 - .5) * 4.4, 0, ((i / 96 | 0) / 29 - .5) * 2.4]), scale: .5, pitch: .36, roll: 0, spin: 0, dot: 1.5, wave: true },
};
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let paused = reduceMotion, clock = 0, last = 0, px = 0, py = 0, tx = 0, ty = 0;
const stages = [...document.querySelectorAll('canvas[data-dots]')].map(canvas => {
  const m = models[canvas.dataset.dots], ctx = canvas.getContext('2d'), ink = getComputedStyle(canvas).color;
  const tint = alpha => ink.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  const stage = { canvas, seen: true };
  let energy = 0; // 0 while the send waits, 1 once it is approved: the model lights up
  let lastClock = 0;
  const sprite = document.createElement('canvas'); // one soft blob, reused for every puff of smoke and speck of dust
  sprite.width = sprite.height = 64;
  const blob = sprite.getContext('2d'), fade = blob.createRadialGradient(32, 32, 0, 32, 32, 32);
  fade.addColorStop(0, tint(1)); fade.addColorStop(.4, tint(.3)); fade.addColorStop(1, tint(0));
  blob.fillStyle = fade;
  blob.fillRect(0, 0, 64, 64);
  const dust = m.plasma ? Array.from({ length: 340 }, (_, i) => {
    const angle = Math.random() * TAU, reach = Math.sqrt(Math.random()), smoke = i < 120;
    return { x: Math.cos(angle) * reach * .7, y: Math.sin(angle) * reach * .7, phase: Math.random() * TAU, edge: smoke ? .68 : .95,
      size: smoke ? .14 + Math.random() * .16 : .008 + Math.random() * .02, alpha: smoke ? .1 : .3 + Math.random() * .6 };
  }) : [];
  const flow = (x, y, t) => Math.sin(x * 3 + t * .3) * Math.cos(y * 2.7 - t * .2) + .5 * Math.sin(x * 6.1 + y * 5.3 + t * .4);
  stage.draw = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight, r = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * r)) { canvas.width = Math.round(w * r); canvas.height = Math.round(h * r); }
    ctx.setTransform(r, 0, 0, r, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const target = m.plasma && approvalDemo.classList.contains('is-approved') ? 1 : 0;
    energy = paused ? target : energy + (target - energy) * .025;
    const pitch = m.pitch + py * .25, k = w * m.scale;
    const cb = Math.cos(pitch), sb = Math.sin(pitch), cc = Math.cos(m.roll), sc = Math.sin(m.roll);
    const dot = (x0, y, z0, yaw, size, gain) => {
      const ca = Math.cos(yaw), sa = Math.sin(yaw);
      const x = x0 * ca + z0 * sa, z1 = z0 * ca - x0 * sa, y1 = y * cb - z1 * sb, z = y * sb + z1 * cb;
      const p = 3 / (3 + z); // perspective: far dots shrink and fade
      ctx.globalAlpha = Math.max(.1, Math.min(1, (.5 - z * .42) * gain));
      ctx.beginPath();
      ctx.arc(w / 2 + (x * cc - y1 * sc) * k * p, h / 2 + (x * sc + y1 * cc) * k * p, size * p, 0, TAU);
      ctx.fill();
    };
    ctx.fillStyle = ink;
    const yaw = clock * m.spin * (1 + energy) + px * .5;
    for (const [x0, y0, z0] of m.pts) {
      dot(x0, m.wave ? Math.sin(x0 * 2.4 + clock * .7) * Math.cos(z0 * 3 + clock * .5) * .16 : y0, z0, yaw, m.dot * (1 + .2 * energy), 1 + .5 * energy);
    }
    if (energy > .01) { // plasma: smoke and cosmic dust carried by a swirling flow, added light on light
      const step = Math.min(Math.max(clock - lastClock, 0), .05), nudge = .01;
      lastClock = clock;
      ctx.globalCompositeOperation = 'lighter';
      for (const mote of dust) {
        // the flow is the curl of a slow wave field, so it swirls without bunching up, like smoke
        const vx = (flow(mote.x, mote.y + nudge, clock) - flow(mote.x, mote.y - nudge, clock)) / (2 * nudge);
        const vy = (flow(mote.x - nudge, mote.y, clock) - flow(mote.x + nudge, mote.y, clock)) / (2 * nudge);
        const reach = Math.hypot(mote.x, mote.y), pull = reach > mote.edge ? (reach - mote.edge) * 6 : 0; // stay inside the globe
        mote.x += (vx * .05 - mote.x * pull) * step;
        mote.y += (vy * .05 - mote.y * pull) * step;
        const size = mote.size * k * 2;
        ctx.globalAlpha = mote.alpha * energy * (.7 + .3 * Math.sin(clock * 1.2 + mote.phase));
        ctx.drawImage(sprite, w / 2 + mote.x * k - size / 2, h / 2 + mote.y * k - size / 2, size, size);
      }
      ctx.globalCompositeOperation = 'source-over';
    }
  };
  return stage;
});
const drawAll = () => stages.forEach(stage => stage.seen && stage.draw());
const frame = now => {
  if (paused) return;
  clock += Math.min((now - last) / 1000, .05); last = now;
  px += (tx - px) * .06; py += (ty - py) * .06;
  drawAll();
  requestAnimationFrame(frame);
};
drawAll();
window.addEventListener('resize', drawAll);
if (!reduceMotion) {
  const watcher = new IntersectionObserver(entries => entries.forEach(entry => {
    stages.find(stage => stage.canvas === entry.target).seen = entry.isIntersecting;
  }));
  stages.forEach(stage => watcher.observe(stage.canvas));
  window.addEventListener('pointermove', event => { tx = event.clientX / innerWidth - .5; ty = event.clientY / innerHeight - .5; });
  const motionToggle = document.querySelector('[data-motion-toggle]');
  motionToggle.hidden = false;
  motionToggle.addEventListener('click', () => {
    paused = !paused;
    document.documentElement.classList.toggle('motion-paused', paused);
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? 'Reanudar animación' : 'Pausar animación';
    if (!paused) requestAnimationFrame(frame);
  });
  requestAnimationFrame(frame);
}

// The hero flow: the example text types itself, its personal data is detected, the protected text appears,
// and the policy approves the send by itself. Without motion the markup already shows the finished flow.
const typed = document.querySelector('[data-typed]');
const typedHtml = typed.innerHTML, typedText = typed.textContent;
const rawValues = [...typed.querySelectorAll('mark')].map(mark => mark.textContent);
const tokenMarks = [...document.querySelectorAll('.demo-protected mark')];
const tokenValues = tokenMarks.map(mark => mark.textContent);
const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789_#';
let flowTimer, flowRun = 0;
// Protection, shown: each personal value scrambles and settles into its code.
const protect = (mark, token, delay, run) => setTimeout(() => {
  let ticks = 0;
  const scramble = setInterval(() => {
    if (run !== flowRun) { clearInterval(scramble); return; } // the example was restarted
    if (++ticks > 22) { clearInterval(scramble); mark.textContent = token; return; }
    if (ticks === 8) mark.classList.remove('raw'); // the colour eases from exposed to protected mid-way
    const settled = Math.max(0, (ticks - 6) / 16 * token.length | 0); // the code settles left to right
    mark.textContent = token.slice(0, settled) + Array.from(token.slice(settled), () => glyphs[Math.random() * glyphs.length | 0]).join('');
  }, 60);
}, delay);
const playFlow = () => {
  clearTimeout(flowTimer);
  const run = ++flowRun;
  setApproval(false);
  tokenMarks.forEach((mark, i) => { mark.textContent = rawValues[i]; mark.classList.add('raw'); });
  const protectedText = tokenMarks[0].parentElement; // hold the tallest height so the card never jumps while values change
  protectedText.style.minHeight = '';
  protectedText.style.minHeight = protectedText.offsetHeight + 'px';
  approvalDemo.classList.remove('step-1', 'step-2');
  approvalDemo.classList.add('flow-live');
  typed.textContent = '';
  typed.classList.add('typing');
  let shown = 0;
  const type = () => {
    typed.textContent = typedText.slice(0, ++shown);
    if (shown < typedText.length) { flowTimer = setTimeout(type, 38 + Math.random() * 40); return; }
    typed.innerHTML = typedHtml;
    typed.classList.remove('typing');
    approvalDemo.classList.add('step-1');
    flowTimer = setTimeout(() => {
      approvalDemo.classList.add('step-2');
      tokenMarks.forEach((mark, i) => protect(mark, tokenValues[i], 700 + i * 500, run));
      let checked = 0;
      const check = () => { // the policy checks tick one by one, then the send is approved
        if (checked === policyChecks.length) { setApproval(true); return; }
        policyChecks[checked++].classList.add('done');
        flowTimer = setTimeout(check, 750);
      };
      flowTimer = setTimeout(check, 3000);
    }, 900);
  };
  flowTimer = setTimeout(type, 600);
};
if (!reduceMotion) {
  typed.style.minHeight = typed.offsetHeight + 'px';
  resetButton.hidden = false;
  resetButton.addEventListener('click', playFlow);
  playFlow();
}

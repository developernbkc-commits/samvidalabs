
(() => {
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 921px)').matches;

  const yearNode = document.querySelector('[data-year]');
  if (yearNode) yearNode.textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const progress = document.querySelector('[data-progress]');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    if (progress) progress.style.width = `${ratio * 100}%`;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const cursorHalo = document.querySelector('.cursor-halo');
  const updatePointer = (event) => {
    root.style.setProperty('--mx', `${event.clientX}px`);
    root.style.setProperty('--my', `${event.clientY}px`);
    document.body.classList.add('pointer-active');
    if (cursorHalo && !prefersReduced) {
      cursorHalo.style.left = `${event.clientX}px`;
      cursorHalo.style.top = `${event.clientY}px`;
    }
  };
  window.addEventListener('pointermove', updatePointer, { passive: true });
  window.addEventListener('pointerdown', updatePointer, { passive: true });

  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealNodes = [...document.querySelectorAll('.reveal-on-scroll')];
  revealNodes.forEach((node, i) => {
    node.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  });
  if (prefersReduced) {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealNodes.forEach((node) => observer.observe(node));
  }

  if (!prefersReduced) {
    document.querySelectorAll('[data-magnetic]').forEach((node) => {
      const strength = Number(node.getAttribute('data-magnetic') || 18);
      let frame = null;
      const reset = () => {
        if (frame) cancelAnimationFrame(frame);
        node.style.transform = '';
      };
      node.addEventListener('pointermove', (event) => {
        const rect = node.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          node.style.transform = `translate(${dx / strength}px, ${dy / strength}px)`;
        });
      });
      node.addEventListener('pointerleave', reset);
      node.addEventListener('pointercancel', reset);
    });
  }

  if (!prefersReduced && isDesktop) {
    document.querySelectorAll('[data-tilt]').forEach((node) => {
      const maxTilt = Number(node.getAttribute('data-tilt-max') || 6);
      let raf = null;
      const reset = () => {
        if (raf) cancelAnimationFrame(raf);
        node.style.setProperty('--rx', '0deg');
        node.style.setProperty('--ry', '0deg');
        node.style.setProperty('--lift', '0px');
        node.style.setProperty('--px', '24%');
        node.style.setProperty('--py', '18%');
      };
      node.addEventListener('pointermove', (event) => {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rx = ((0.5 - py) * maxTilt * 1.8).toFixed(2);
        const ry = ((px - 0.5) * maxTilt * 1.8).toFixed(2);
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          node.style.setProperty('--rx', `${rx}deg`);
          node.style.setProperty('--ry', `${ry}deg`);
          node.style.setProperty('--lift', '-2px');
          node.style.setProperty('--px', `${(px * 100).toFixed(2)}%`);
          node.style.setProperty('--py', `${(py * 100).toFixed(2)}%`);
        });
      });
      node.addEventListener('pointerleave', reset);
      node.addEventListener('pointercancel', reset);
      reset();
    });

    document.querySelectorAll('[data-scene]').forEach((node) => {
      const reset = () => {
        node.style.setProperty('--scene-rx', '0deg');
        node.style.setProperty('--scene-ry', '0deg');
      };
      node.addEventListener('pointermove', (event) => {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rx = ((0.5 - py) * 8).toFixed(2);
        const ry = ((px - 0.5) * 10).toFixed(2);
        node.style.setProperty('--scene-rx', `${rx}deg`);
        node.style.setProperty('--scene-ry', `${ry}deg`);
      });
      node.addEventListener('pointerleave', reset);
      node.addEventListener('pointercancel', reset);
      reset();
    });
  }

  const canvas = document.querySelector('[data-force-graph]');
  if (canvas && !prefersReduced) {
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const nodes = [];
    const palette = [
      ['rgba(136, 242, 255, 0.95)', 'rgba(136, 242, 255, 0.18)'],
      ['rgba(157, 136, 255, 0.92)', 'rgba(157, 136, 255, 0.18)'],
      ['rgba(255, 99, 199, 0.82)', 'rgba(255, 99, 199, 0.16)'],
      ['rgba(255, 255, 255, 0.94)', 'rgba(255, 255, 255, 0.22)'],
    ];
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let raf = null;
    const pointer = { x: 0, y: 0, active: false };
    const nodeCount = window.innerWidth < 760 ? 26 : 42;

    const seedNodes = () => {
      nodes.length = 0;
      const base = Math.min(width, height) * 0.25;
      for (let i = 0; i < nodeCount; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = base * (0.65 + Math.random() * 1.3);
        const hue = palette[i % palette.length];
        nodes.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius * (0.68 + Math.random() * 0.32),
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size: 1.3 + Math.random() * 3.2,
          orbit: 0.0006 + Math.random() * 0.0016,
          angle,
          anchor: 0.00085 + Math.random() * 0.0022,
          hue,
          depth: 0.7 + Math.random() * 0.8,
          lane: (i % 7) + 1,
        });
      }
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cx = width * 0.5;
      cy = height * 0.56;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const updateNodes = (time) => {
      const orbitBase = Math.min(width, height) * 0.24;
      nodes.forEach((node, i) => {
        node.angle += node.orbit;
        const targetRadius = orbitBase * (0.58 + node.lane * 0.072 + (i / nodes.length) * 0.28);
        const targetX = cx + Math.cos(node.angle + i * 0.09) * targetRadius;
        const targetY = cy + Math.sin(node.angle + i * 0.1) * targetRadius * 0.66;
        node.vx += (targetX - node.x) * node.anchor;
        node.vy += (targetY - node.y) * node.anchor;

        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 140) {
            const push = (140 - dist) / 140;
            node.vx -= (dx / dist) * push * 0.52;
            node.vy -= (dy / dist) * push * 0.52;
          } else if (dist < 260) {
            const pull = (260 - dist) / 260;
            node.vx += (dx / dist) * pull * 0.028;
            node.vy += (dy / dist) * pull * 0.028;
          }
        }
        node.vx *= 0.964;
        node.vy *= 0.964;
        node.x += node.vx * node.depth;
        node.y += node.vy * node.depth;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // atmosphere
      const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.45);
      ambient.addColorStop(0, 'rgba(136,242,255,0.06)');
      ambient.addColorStop(0.5, 'rgba(157,136,255,0.05)');
      ambient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      const maxLink = Math.min(width, height) * 0.22;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxLink) continue;
          const alpha = (1 - dist / maxLink) ** 1.9;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(136,242,255,${0.02 + alpha * 0.22})`);
          grad.addColorStop(0.45, `rgba(157,136,255,${0.02 + alpha * 0.16})`);
          grad.addColorStop(1, `rgba(255,99,199,${0.01 + alpha * 0.12})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      nodes.forEach((node) => {
        const [solid, soft] = node.hue;
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 6.4);
        glow.addColorStop(0, solid);
        glow.addColorStop(0.24, soft);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 6.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = solid;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // orbit strokes
      ctx.save();
      ctx.translate(cx, cy);
      const t = performance.now() * 0.00008;
      for (const [w, h, angle, color] of [
        [width * 0.42, height * 0.20, t * 2.6, 'rgba(136,242,255,0.18)'],
        [width * 0.34, height * 0.34, 0.6 + t * 2.0, 'rgba(157,136,255,0.16)'],
        [width * 0.48, height * 0.26, -0.44 + t * 1.7, 'rgba(255,99,199,0.12)'],
      ]) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(0, 0, w * 0.5, h * 0.5, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    };

    const loop = () => {
      updateNodes(performance.now());
      draw();
      raf = requestAnimationFrame(loop);
    };

    parent.addEventListener('pointermove', (event) => {
      const rect = parent.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    });
    parent.addEventListener('pointerleave', () => {
      pointer.active = false;
    });
    parent.addEventListener('pointercancel', () => {
      pointer.active = false;
    });

    resize();
    window.addEventListener('resize', () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      resize();
    });
    raf = requestAnimationFrame(loop);
  }
})();

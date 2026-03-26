
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
        node.style.setProperty('--scene-x', '50%');
        node.style.setProperty('--scene-y', '56%');
      };
      node.addEventListener('pointermove', (event) => {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const sx = 46 + px * 12;
        const sy = 50 + py * 12;
        node.style.setProperty('--scene-x', `${sx.toFixed(2)}%`);
        node.style.setProperty('--scene-y', `${sy.toFixed(2)}%`);
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
    ['rgba(136, 242, 255, 0.96)', 'rgba(136, 242, 255, 0.18)'],
    ['rgba(166, 140, 255, 0.94)', 'rgba(166, 140, 255, 0.18)'],
    ['rgba(255, 99, 199, 0.82)', 'rgba(255, 99, 199, 0.15)'],
    ['rgba(255, 255, 255, 0.94)', 'rgba(255, 255, 255, 0.18)'],
  ];
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let safeRadius = 0;
  let raf = null;
  const pointer = { x: 0, y: 0, active: false };
  const nodeCount = window.innerWidth < 760 ? 24 : 36;

  const seedNodes = () => {
    nodes.length = 0;
    const base = Math.min(width, height) * 0.32;
    for (let i = 0; i < nodeCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = base * (0.92 + Math.random() * 0.38);
      const hue = palette[i % palette.length];
      nodes.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius * (0.70 + Math.random() * 0.22),
        vx: (Math.random() - 0.5) * 0.52,
        vy: (Math.random() - 0.5) * 0.52,
        size: 1.4 + Math.random() * 2.8,
        orbit: 0.00055 + Math.random() * 0.0012,
        angle,
        anchor: 0.0010 + Math.random() * 0.0017,
        hue,
        depth: 0.78 + Math.random() * 0.55,
        lane: (i % 6) + 1,
      });
    }
  };

  const resize = () => {
    const rect = parent.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    cx = width * 0.5;
    cy = height * 0.58;
    safeRadius = Math.min(width, height) * (window.innerWidth < 760 ? 0.18 : 0.21);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedNodes();
  };

  const updateNodes = () => {
    const orbitBase = Math.min(width, height) * 0.32;
    nodes.forEach((node, i) => {
      node.angle += node.orbit;
      const targetRadius = orbitBase * (0.90 + node.lane * 0.05 + (i / nodes.length) * 0.12);
      const targetX = cx + Math.cos(node.angle + i * 0.11) * targetRadius;
      const targetY = cy + Math.sin(node.angle + i * 0.09) * targetRadius * 0.68;
      node.vx += (targetX - node.x) * node.anchor;
      node.vy += (targetY - node.y) * node.anchor;

      const centerDx = node.x - cx;
      const centerDy = node.y - cy;
      const centerDist = Math.hypot(centerDx, centerDy) || 1;
      if (centerDist < safeRadius) {
        const push = (safeRadius - centerDist) / safeRadius;
        node.vx += (centerDx / centerDist) * push * 0.8;
        node.vy += (centerDy / centerDist) * push * 0.8;
      }

      if (pointer.active) {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 120) {
          const push = (120 - dist) / 120;
          node.vx -= (dx / dist) * push * 0.42;
          node.vy -= (dy / dist) * push * 0.42;
        } else if (dist < 240) {
          const pull = (240 - dist) / 240;
          node.vx += (dx / dist) * pull * 0.024;
          node.vy += (dy / dist) * pull * 0.024;
        }
      }

      node.vx *= 0.966;
      node.vy *= 0.966;
      node.x += node.vx * node.depth;
      node.y += node.vy * node.depth;
    });
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    const ambient = ctx.createRadialGradient(cx, cy, safeRadius * 0.08, cx, cy, Math.min(width, height) * 0.52);
    ambient.addColorStop(0, 'rgba(136,242,255,0.09)');
    ambient.addColorStop(0.45, 'rgba(166,140,255,0.06)');
    ambient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ambient;
    ctx.fillRect(0, 0, width, height);

    const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, safeRadius * 1.55);
    coreGlow.addColorStop(0, 'rgba(255,255,255,0.06)');
    coreGlow.addColorStop(0.36, 'rgba(136,242,255,0.08)');
    coreGlow.addColorStop(0.74, 'rgba(166,140,255,0.04)');
    coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coreGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, safeRadius * 1.55, 0, Math.PI * 2);
    ctx.fill();

    const maxLink = Math.min(width, height) * 0.20;
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        if (dist > maxLink) continue;
        const alpha = (1 - dist / maxLink) ** 2.0;
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, `rgba(136,242,255,${0.015 + alpha * 0.18})`);
        grad.addColorStop(0.48, `rgba(166,140,255,${0.015 + alpha * 0.16})`);
        grad.addColorStop(1, `rgba(255,99,199,${0.012 + alpha * 0.10})`);
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
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 6.2);
      glow.addColorStop(0, solid);
      glow.addColorStop(0.24, soft);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size * 6.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = solid;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.save();
    ctx.translate(cx, cy);
    const t = performance.now() * 0.00008;
    for (const [w, h, angle, color] of [
      [width * 0.44, height * 0.22, t * 2.4, 'rgba(136,242,255,0.14)'],
      [width * 0.36, height * 0.34, 0.6 + t * 1.9, 'rgba(166,140,255,0.13)'],
      [width * 0.50, height * 0.27, -0.44 + t * 1.5, 'rgba(255,99,199,0.08)'],
    ]) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.ellipse(0, 0, w * 0.5, h * 0.5, angle, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  };

  const loop = () => {
    updateNodes();
    draw();
    raf = requestAnimationFrame(loop);
  };

  parent.addEventListener('pointermove', (event) => {
    const rect = parent.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
    parent.style.setProperty('--scene-x', `${(pointer.x / width * 100).toFixed(2)}%`);
    parent.style.setProperty('--scene-y', `${(pointer.y / height * 100).toFixed(2)}%`);
  });
  parent.addEventListener('pointerleave', () => {
    pointer.active = false;
    parent.style.setProperty('--scene-x', '50%');
    parent.style.setProperty('--scene-y', '56%');
  });
  parent.addEventListener('pointercancel', () => {
    pointer.active = false;
    parent.style.setProperty('--scene-x', '50%');
    parent.style.setProperty('--scene-y', '56%');
  });

  resize();
  window.addEventListener('resize', () => {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    resize();
  });
  raf = requestAnimationFrame(loop);
}
})();


(() => {
  const topicCopy = {
    'new-product': 'We help scope product strategy, UX, architecture, engineering, and launch readiness for AI-ready products.',
    'enhancement': 'Samvida Labs can add intelligence, workflow automation, guidance, search, and operational uplift to products already in market.',
    'industries': 'Current priority industries include EdTech, schools, medical, hospitals, marketing companies, ERP, and operations-focused businesses.',
    'start': 'The fastest route is Monica intake: tell us whether this is a new product or an enhancement, share industry and timeline, and the right Samvida path can begin.'
  };

  const widget = document.querySelector('[data-monica-widget]');
  if (widget) {
    const toggle = widget.querySelector('[data-monica-toggle]');
    const panel = widget.querySelector('[data-monica-panel]');
    const close = widget.querySelector('[data-monica-close]');
    const answer = widget.querySelector('[data-monica-answer]');
    const topicButtons = [...widget.querySelectorAll('[data-monica-topic]')];

    const openPanel = () => {
      if (!panel || !toggle) return;
      panel.hidden = false;
      widget.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };
    const closePanel = () => {
      if (!panel || !toggle) return;
      panel.hidden = true;
      widget.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    if (toggle) {
      toggle.addEventListener('click', () => {
        if (panel.hidden) openPanel();
        else closePanel();
      });
    }
    if (close) close.addEventListener('click', closePanel);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePanel();
    });
    document.addEventListener('click', (event) => {
      if (!widget.contains(event.target) && !panel.hidden) closePanel();
    });
    topicButtons.forEach((button) => {
      button.addEventListener('click', () => {
        topicButtons.forEach((node) => node.classList.remove('active'));
        button.classList.add('active');
        const key = button.getAttribute('data-monica-topic');
        if (answer && topicCopy[key]) answer.textContent = topicCopy[key];
      });
    });
  }

  const serviceMap = {
    'new-product': 'Product development with AI',
    'enhancement': 'AI enhancements for existing products',
    'website': 'Websites for business',
    'general': 'General inquiry'
  };
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service');
  if (serviceParam) {
    document.querySelectorAll('[data-service-select]').forEach((select) => {
      const mapped = serviceMap[serviceParam] || serviceParam;
      const match = [...select.options].find((option) => option.value === mapped || option.text === mapped);
      if (match) select.value = match.value;
    });
  }
})();

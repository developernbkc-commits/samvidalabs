
(() => {
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 921px)').matches;

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute('content', '#f7f9fc');

  const productsNavLabel = document.querySelector('[data-nav-link="products"] span');
  if (productsNavLabel) productsNavLabel.textContent = 'Products';

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
if (canvas) {
  const parent = canvas.parentElement;
  const ctx = canvas.getContext('2d');
  const nodes = [];
  const links = [];
  const palette = [
    { rgb: '10, 145, 181', solid: 'rgba(10, 145, 181, 0.98)', soft: 'rgba(10, 145, 181, 0.20)' },
    { rgb: '92, 74, 222', solid: 'rgba(92, 74, 222, 0.96)', soft: 'rgba(92, 74, 222, 0.18)' },
    { rgb: '202, 58, 164', solid: 'rgba(202, 58, 164, 0.92)', soft: 'rgba(202, 58, 164, 0.17)' },
    { rgb: '17, 53, 91', solid: 'rgba(17, 53, 91, 0.96)', soft: 'rgba(17, 53, 91, 0.16)' },
    { rgb: '23, 180, 172', solid: 'rgba(23, 180, 172, 0.96)', soft: 'rgba(23, 180, 172, 0.18)' },
  ];
  const clusterAngles = [-2.62, -1.38, -0.18, 1.04, 2.28];
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let safeRadius = 0;
  let raf = null;
  const pointer = { x: 0, y: 0, active: false };

  const createRandom = (seed) => () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let value = Math.imul(seed ^ seed >>> 15, 1 | seed);
    value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };

  const seedNodes = () => {
    nodes.length = 0;
    links.length = 0;
    const compact = width < 560;
    const nodeCount = compact ? 18 : 28;
    const base = Math.min(width, height) * (compact ? 0.34 : 0.35);
    const random = createRandom(compact ? 2407 : 8173);

    for (let i = 0; i < nodeCount; i += 1) {
      const primary = i < 5;
      const cluster = primary ? i : (i - 5) % 5;
      const rank = primary ? 0 : Math.floor((i - 5) / 5) + 1;
      const angle = clusterAngles[cluster] + rank * 0.08 + (random() - 0.5) * (primary ? 0.10 : 0.42);
      const radius = base * (primary ? 0.86 : 0.94 + rank * 0.11 + random() * 0.08);
      const hue = palette[cluster];
      nodes.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius * 0.70,
        vx: 0,
        vy: 0,
        size: primary ? 4.6 : 1.9 + random() * 2.1,
        orbit: (0.00012 + random() * 0.00022) * (cluster % 2 ? -1 : 1),
        angle,
        targetRadius: radius,
        anchor: primary ? 0.0026 : 0.0018 + random() * 0.0008,
        hue,
        depth: 0.86 + random() * 0.28,
        cluster,
        primary,
      });
    }

    for (let i = 0; i < 5; i += 1) {
      links.push({ from: i, to: (i + 1) % 5, weight: 1, kind: 'hub' });
    }
    links.push(
      { from: 0, to: 2, weight: 0.76, kind: 'cross' },
      { from: 1, to: 3, weight: 0.72, kind: 'cross' },
      { from: 2, to: 4, weight: 0.68, kind: 'cross' },
    );
    for (let i = 5; i < nodes.length; i += 1) {
      const cluster = nodes[i].cluster;
      links.push({ from: cluster, to: i, weight: 0.82, kind: 'branch' });
      const previous = i - 5;
      if (previous >= 5) links.push({ from: previous, to: i, weight: 0.52, kind: 'branch' });
    }

    canvas.dataset.graphNodes = String(nodes.length);
    canvas.dataset.graphLinks = String(links.length);
    canvas.classList.add('is-ready');
  };

  const resize = () => {
    const rect = parent.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    cx = width * 0.5;
    cy = height * 0.56;
    safeRadius = Math.min(width, height) * (width < 560 ? 0.16 : 0.18);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedNodes();
  };

  const updateNodes = () => {
    nodes.forEach((node) => {
      node.angle += node.orbit;
      const targetX = cx + Math.cos(node.angle) * node.targetRadius;
      const targetY = cy + Math.sin(node.angle) * node.targetRadius * 0.70;
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

      const chatBoundaryX = width * 0.78;
      const chatBoundaryY = height * 0.73;
      if (node.x > chatBoundaryX && node.y > chatBoundaryY) {
        node.vx -= (node.x - chatBoundaryX) * 0.006;
        node.vy -= (node.y - chatBoundaryY) * 0.004;
      }

      const padding = 22 + node.size * 2;
      if (node.x < padding) node.vx += (padding - node.x) * 0.018;
      if (node.x > width - padding) node.vx -= (node.x - width + padding) * 0.018;
      if (node.y < padding) node.vy += (padding - node.y) * 0.018;
      if (node.y > height - padding) node.vy -= (node.y - height + padding) * 0.018;
    });

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const minGap = 22 + a.size + b.size;
        if (dist >= minGap) continue;
        const push = (minGap - dist) / minGap * 0.035;
        const px = dx / dist * push;
        const py = dy / dist * push;
        a.vx -= px;
        a.vy -= py;
        b.vx += px;
        b.vy += py;
      }
    }

    nodes.forEach((node) => {
      node.vx *= 0.966;
      node.vy *= 0.966;
      node.x += node.vx * node.depth;
      node.y += node.vy * node.depth;
    });
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    const ambient = ctx.createRadialGradient(cx, cy, safeRadius * 0.08, cx, cy, Math.min(width, height) * 0.54);
    ambient.addColorStop(0, 'rgba(8,174,202,0.08)');
    ambient.addColorStop(0.48, 'rgba(112,92,245,0.055)');
    ambient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ambient;
    ctx.fillRect(0, 0, width, height);

    const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, safeRadius * 1.55);
    coreGlow.addColorStop(0, 'rgba(255,255,255,0.11)');
    coreGlow.addColorStop(0.36, 'rgba(8,174,202,0.075)');
    coreGlow.addColorStop(0.74, 'rgba(112,92,245,0.04)');
    coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coreGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, safeRadius * 1.55, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.lineCap = 'round';
    nodes.slice(0, 5).forEach((node) => {
      const dx = node.x - cx;
      const dy = node.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const startX = cx + dx / dist * (safeRadius + 8);
      const startY = cy + dy / dist * (safeRadius + 8);
      const spoke = ctx.createLinearGradient(startX, startY, node.x, node.y);
      spoke.addColorStop(0, 'rgba(17,53,91,0.025)');
      spoke.addColorStop(1, `rgba(${node.hue.rgb},0.24)`);
      ctx.strokeStyle = spoke;
      ctx.lineWidth = 1.05;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(node.x, node.y);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    links.forEach((link) => {
      const a = nodes[link.from];
      const b = nodes[link.to];
      if (!a || !b) return;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const curve = ((link.from + link.to) % 2 ? 1 : -1) * Math.min(18, dist * 0.05);
      const controlX = (a.x + b.x) * 0.5 - dy / dist * curve;
      const controlY = (a.y + b.y) * 0.5 + dx / dist * curve;
      const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      const alpha = link.kind === 'hub' ? 0.30 : link.kind === 'cross' ? 0.20 : 0.18;
      grad.addColorStop(0, `rgba(${a.hue.rgb},${alpha * link.weight})`);
      grad.addColorStop(1, `rgba(${b.hue.rgb},${alpha * link.weight})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = link.kind === 'hub' ? 1.45 : 1.05;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(controlX, controlY, b.x, b.y);
      ctx.stroke();
    });
    ctx.restore();

    nodes.forEach((node) => {
      const glowRadius = node.size * (node.primary ? 4.2 : 3.3);
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
      glow.addColorStop(0, node.hue.solid);
      glow.addColorStop(0.30, node.hue.soft);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = node.hue.solid;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();
      if (node.primary) {
        const pulse = prefersReduced ? 0 : Math.sin(performance.now() * 0.0015 + node.cluster) * 0.7;
        ctx.strokeStyle = `rgba(${node.hue.rgb},0.26)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + 4 + pulse, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
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
    if (prefersReduced) draw();
  });
  if (prefersReduced) {
    draw();
  } else {
    raf = requestAnimationFrame(loop);
  }
}
})();

(() => {
  const assignTrack = (selector, conversionName) => {
    document.querySelectorAll(selector).forEach((node) => {
      if (!node.hasAttribute('data-track')) node.setAttribute('data-track', conversionName);
    });
  };
  assignTrack('.main-nav .btn[href*="#monica"]', 'header_product_brief');
  assignTrack('.footer-cta-row .btn-primary[href*="#monica"]', 'footer_product_brief');
  assignTrack('.monica-actions .btn-primary[href*="#monica"]', 'monica_product_brief');

  const publishConversion = (conversionName, metadata = {}) => {
    if (!conversionName) return;
    const detail = {
      event: 'samvida_conversion',
      conversion_name: conversionName,
      page_path: window.location.pathname,
      ...metadata
    };
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent('samvida:conversion', { detail }));
  };

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('[data-track]');
    if (!target) return;
    publishConversion(target.getAttribute('data-track'), {
      destination: target.getAttribute('href') || undefined
    });
  });

  document.querySelectorAll('form[data-track-form]').forEach((form) => {
    form.addEventListener('submit', () => {
      publishConversion(form.getAttribute('data-track-form'), {
        form_name: form.getAttribute('name') || undefined
      });
    });
  });

  if (document.body.dataset.page === 'thank-you') {
    publishConversion('contact_brief_received', {
      form_name: 'contact-inquiry'
    });
  }
})();


(() => {
  const topicCopy = {
    'new-product': 'We help scope product strategy, UX, architecture, engineering, and launch readiness for AI-ready products.',
    'enhancement': 'Samvida Labs can add intelligence, workflow automation, guidance, search, and operational uplift to products already in market.',
    'industries': 'Current priority industries include EdTech, schools, medical, hospitals, marketing companies, ERP, and operations-focused businesses.',
    'start': 'Start with the users, the current product or workflow problem, and the outcome you want. Timeline, budget, industry, and project stage are optional context.'
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
  const routeMap = {
    'product-direction': {
      value: 'product-direction',
      label: 'Product direction',
      copy: 'Frame the users, operating outcome, first credible workflow, dependencies, and what should wait.'
    },
    'modernisation-review': {
      value: 'modernisation-review',
      label: 'Modernisation review',
      copy: 'Surface the highest-friction path, technical constraints, operating risk, and viable uplift options.'
    },
    'workflow-slice': {
      value: 'workflow-slice',
      label: 'Controlled workflow slice',
      copy: 'Trace one end-to-end workflow through actors, decisions, denied paths, recovery, evidence, and completion.'
    },
    'website-signal': {
      value: 'website-signal',
      label: 'Website signal upgrade',
      copy: 'Clarify positioning, proof, trust boundaries, inquiry routing, content ownership, and launch dependencies.'
    }
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
  const routeParam = params.get('route');
  if (routeParam) {
    const route = routeMap[routeParam];
    document.querySelectorAll('[data-route-select]').forEach((select) => {
      const mapped = route?.value || routeParam;
      const match = [...select.options].find((option) => option.value === mapped);
      if (match) select.value = match.value;
    });
    const context = document.querySelector('[data-route-context]');
    if (context && route) {
      const title = context.querySelector('[data-route-context-title]');
      const copy = context.querySelector('[data-route-context-copy]');
      if (title) title.textContent = route.label;
      if (copy) copy.textContent = route.copy;
      context.hidden = false;
    }
  }
})();

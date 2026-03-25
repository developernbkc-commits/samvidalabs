document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const current = document.body.dataset.page || "";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.getAttribute("data-nav-link") === current) {
      link.classList.add("active");
    }
  });

  const updateGlow = (event) => {
    root.style.setProperty("--mx", `${event.clientX}px`);
    root.style.setProperty("--my", `${event.clientY}px`);
  };
  window.addEventListener("pointermove", updateGlow, { passive: true });

  const progressBar = document.querySelector("[data-progress]");
  const updateProgress = () => {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, value))}%`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  const revealNodes = document.querySelectorAll(
    ".section-head, .card, .panel, .callout, .page-hero-panel, .hero-copy, .hero-scene, .timeline-card, .form-shell, .info-card, .showcase-card, .story-card, .tall-card, .metric-card, .footer-card, .faq-item"
  );
  revealNodes.forEach((node, index) => {
    node.classList.add("reveal");
    node.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    });
    revealNodes.forEach((node) => observer.observe(node));
  }

  const allowTilt = window.matchMedia("(min-width: 961px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (allowTilt) {
    document.querySelectorAll("[data-tilt]").forEach((node) => {
      node.classList.add("tilt-card");
      const maxTilt = Number(node.getAttribute("data-tilt-max") || 6);
      let frame = 0;

      const reset = () => {
        cancelAnimationFrame(frame);
        node.style.setProperty("--rx", "0deg");
        node.style.setProperty("--ry", "0deg");
        node.style.setProperty("--lift", "0px");
        node.style.setProperty("--px", "50%");
        node.style.setProperty("--py", "22%");
      };

      const move = (event) => {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rx = ((0.5 - py) * maxTilt * 2).toFixed(2);
        const ry = ((px - 0.5) * maxTilt * 2).toFixed(2);

        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          node.style.setProperty("--rx", `${rx}deg`);
          node.style.setProperty("--ry", `${ry}deg`);
          node.style.setProperty("--lift", "-4px");
          node.style.setProperty("--px", `${(px * 100).toFixed(1)}%`);
          node.style.setProperty("--py", `${(py * 100).toFixed(1)}%`);
        });
      };

      node.addEventListener("pointermove", move);
      node.addEventListener("pointerleave", reset);
      node.addEventListener("pointercancel", reset);
      reset();
    });
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach((node) => {
      let frame = 0;
      const strength = Number(node.getAttribute("data-magnetic") || 16);

      const reset = () => {
        cancelAnimationFrame(frame);
        node.style.transform = "";
      };

      node.addEventListener("pointermove", (event) => {
        const rect = node.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        frame = requestAnimationFrame(() => {
          node.style.transform = `translate(${dx / strength}px, ${dy / strength}px)`;
        });
      });

      node.addEventListener("pointerleave", reset);
      node.addEventListener("pointercancel", reset);
    });

    document.querySelectorAll("[data-scene]").forEach((node) => {
      const reset = () => {
        node.style.setProperty("--scene-x", "0deg");
        node.style.setProperty("--scene-y", "0deg");
      };

      node.addEventListener("pointermove", (event) => {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rx = ((0.5 - py) * 10).toFixed(2);
        const ry = ((px - 0.5) * 12).toFixed(2);
        node.style.setProperty("--scene-x", `${rx}deg`);
        node.style.setProperty("--scene-y", `${ry}deg`);
      });

      node.addEventListener("pointerleave", reset);
      node.addEventListener("pointercancel", reset);
      reset();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      navToggle.setAttribute("aria-expanded", String(expanded));
    });
  }

  const yearNodes = document.querySelectorAll("[data-year]");
  yearNodes.forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });

  const current = document.body.dataset.page || "";
  document.querySelectorAll("[data-nav-link]").forEach(link => {
    if (link.getAttribute("data-nav-link") === current) {
      link.classList.add("active");
    }
  });
});

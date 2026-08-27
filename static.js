document.documentElement.classList.add("motion-ready");

const revealItems = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: "0px 0px -6%" });
revealItems.forEach((item) => revealObserver.observe(item));

const hero = document.querySelector(".hero");
window.addEventListener("pointermove", (event) => {
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 18;
  const y = (event.clientY / window.innerHeight - 0.5) * 18;
  hero.style.setProperty("--mx", `${x}px`);
  hero.style.setProperty("--my", `${y}px`);
}, { passive: true });

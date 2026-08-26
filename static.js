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

const inquiryForm = document.querySelector(".inquiry-form");
inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const name = String(data.get("name") || "");
  const email = String(data.get("email") || "");
  const category = String(data.get("category") || "");
  const details = String(data.get("details") || "");
  const subject = encodeURIComponent(`專案合作詢問｜${category}｜${name}`);
  const body = encodeURIComponent(`姓名：${name}\nEmail：${email}\n想合作的類型：${category}\n\n需求描述：\n${details}`);
  window.location.href = `mailto:mivane.design@gmail.com?subject=${subject}&body=${body}`;
});

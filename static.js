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
const inquiryButton = inquiryForm?.querySelector('button[type="submit"]');
const inquiryStatus = inquiryForm?.querySelector(".form-status");

inquiryForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!inquiryButton || !inquiryStatus) return;

  inquiryButton.disabled = true;
  inquiryButton.textContent = "正在送出…";
  inquiryStatus.textContent = "";
  inquiryStatus.className = "form-status sending";

  try {
    const response = await fetch(inquiryForm.action, {
      method: "POST",
      body: new FormData(inquiryForm),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Form submission failed");
    inquiryForm.reset();
    inquiryStatus.textContent = "已成功送出！謝謝你的來信，我們會盡快回覆。";
    inquiryStatus.className = "form-status success";
  } catch {
    inquiryStatus.textContent = "目前無法送出，請稍後再試，或直接來信 mivane.design@gmail.com。";
    inquiryStatus.className = "form-status error";
  } finally {
    inquiryButton.disabled = false;
    inquiryButton.innerHTML = "送出合作詢問 <span>↗</span>";
  }
});

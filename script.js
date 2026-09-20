const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.matches("a")) closeMenu();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu && !mobileMenu.hidden) closeMenu();
});

const animatedSections = document.querySelectorAll("[data-observe]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 },
  );

  animatedSections.forEach((section) => observer.observe(section));
} else {
  animatedSections.forEach((section) => section.classList.add("in-view"));
}

const revealDemo = document.querySelector("[data-reveal-demo]");
const revealButton = document.querySelector("[data-reveal-button]");
const revealLabel = document.querySelector("[data-reveal-label]");
const revealFeedback = document.querySelector("[data-reveal-feedback]");
const protectedStatus = document.querySelector("[data-protected-status]");
const personToken = document.querySelector("[data-person]");
const rutToken = document.querySelector("[data-rut]");

const setRevealState = (isRevealed) => {
  revealDemo?.classList.toggle("is-revealed", isRevealed);

  if (personToken) personToken.textContent = isRevealed ? "Ana Prueba" : "[KS_…_A]";
  if (rutToken) rutToken.textContent = isRevealed ? "12.345.678-9" : "[KS_…_B]";
  if (revealLabel) revealLabel.textContent = isRevealed ? "Ver resultado protegido" : "Simular restitución";
  if (protectedStatus) {
    protectedStatus.lastChild.textContent = isRevealed ? " Resultado restituido" : " Resultado protegido";
  }
  if (revealFeedback) {
    revealFeedback.textContent = isRevealed
      ? "Simulación completada. La restitución real exige permisos vigentes y queda registrada."
      : "Ejemplo local con datos ficticios y tokens abreviados.";
  }
  revealButton?.setAttribute("aria-pressed", String(isRevealed));
};

revealButton?.addEventListener("click", () => {
  setRevealState(!revealDemo.classList.contains("is-revealed"));
});

setRevealState(false);

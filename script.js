const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) {
    closeMenu();
  }
});

const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  mobileMenu.hidden = true;
};
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileMenu.hidden = !open;
});
mobileMenu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuButton.focus(); }
});

const approvalDemo = document.querySelector('[data-approval-demo]');
const approveButton = document.querySelector('[data-approve-button]');
const resetButton = document.querySelector('[data-reset-button]');
const setApproval = approved => {
  approvalDemo.classList.toggle('is-approved', approved);
  document.querySelector('[data-approval-status]').textContent = approved ? 'Envío autorizado' : 'Pendiente de tu aprobación';
  document.querySelector('[data-approval-feedback]').textContent = approved
    ? 'Aprobación simulada. No se ha realizado ningún envío.'
    : 'El envío requiere revisar el texto y su destino.';
  approveButton.hidden = approved;
  resetButton.hidden = !approved;
  (approved ? resetButton : approveButton).focus({ preventScroll: true });
};
approveButton.addEventListener('click', () => setApproval(true));
resetButton.addEventListener('click', () => setApproval(false));

const revealButton = document.querySelector('[data-reveal-button]');
const revealDemo = document.querySelector('[data-reveal-demo]');
revealButton.addEventListener('click', () => {
  const revealed = revealButton.getAttribute('aria-pressed') !== 'true';
  revealDemo.classList.toggle('is-revealed', revealed);
  revealButton.setAttribute('aria-pressed', String(revealed));
  document.querySelector('[data-person]').textContent = revealed ? 'Ana Prueba' : '[KS_…_A]';
  document.querySelector('[data-rut]').textContent = revealed ? '12.345.678-9' : '[KS_…_B]';
  document.querySelector('[data-reveal-label]').textContent = revealed ? 'Volver al texto protegido' : 'Ver datos del ejemplo';
  document.querySelector('[data-protected-status]').textContent = revealed ? 'Datos restituidos' : 'Datos protegidos';
  document.querySelector('[data-reveal-feedback]').textContent = revealed
    ? 'En este ejemplo vuelven el nombre y el RUT. La restitución real exige permisos vigentes y queda registrada.'
    : 'Simulación local. No utiliza datos reales.';
});

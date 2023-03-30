export function openContactFormModal() {
  const modal = document.querySelector('.contact-form__modal');
  modal.classList.add('show');
}

export function closeModal() {
  const modal = document.querySelector('.contact-form__modal');
  modal.classList.remove('show');
}

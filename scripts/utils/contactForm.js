export function openContactFormModal() {
  const modal = document.querySelector('.contact-form__modal');
  modal.classList.add('show');
}

export function closeContactFormModal() {
  const modal = document.querySelector('.contact-form__modal');
  modal.classList.remove('show');
}

export function handleContactFormSubmit(e) {
  const contactForm = document.querySelector('.contact-form__form');

  if (contactForm.reportValidity()) {
    // Get and print inputs in console
    contactForm.querySelectorAll('input:not([type="submit"]), textarea')
      .forEach((input) => console.log(`${input.name}: ${input.value}`));

    e.preventDefault(); // Prevent default submit behavior
    closeContactFormModal(); // Close modal after submitting
  }
}

import { closeContactFormModal, handleContactFormSubmit } from '../utils/contactForm.js';

export default class PhotographerContactFormModal {
  constructor(photographer) {
    this.photographer = photographer;
  }

  create() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('contact-form__container');

    wrapper.innerHTML = `
      <header class="contact-form__header">
          <h2 class="contact-form__header-title">
              Contactez-moi<br>${this.photographer.getName()}</span>
          </h2>
          <img class="close-modal-btn" src="/assets/images/icons/close.svg">
      </header>
      <form class="contact-form__form">
          <label class="contact-form__form-label">Prénom
              <input name="firstname" type="text" autocomplete required>
          </label>
          <label class="contact-form__form-label">Nom
              <input name="lastname" type="text" autocomplete required>
          </label>
          <label class="contact-form__form-label">Email
              <input name="email" type="email" pattern=".+@.+\\..+" autocomplete required>
          </label>
          <label class="contact-form__form-label">Votre message
              <textarea name="message" required></textarea>
          </label>
          <input type="submit" value="Envoyer" class="contact_button cta-btn">
      </form>
    `;

    // Handle close contact form button click
    wrapper.querySelector('.close-modal-btn')
      .addEventListener('click', closeContactFormModal);

    // Handle contact form submit
    wrapper.querySelector('input[type="submit"]')
      .addEventListener('click', handleContactFormSubmit);

    return wrapper;
  }
}

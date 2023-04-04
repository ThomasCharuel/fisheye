export default class PhotographerContactForm {
  constructor(photographer) {
    this.photographer = photographer;
    this.wrapper = document.createElement('dialog');
    this.wrapper.classList.add('contact-form');
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <div 
        class="contact-form__container"
        role="document"
        aria-describedby="contact-form__title"
        aria-labelledby="contact-form__title">
        <header class="contact-form__header">
            <h2 class="contact-form__header-title" id="contact-form__title">
                Contactez-moi<br>${this.photographer.getName()}</span>
            </h2>
            <button
              aria-label="Close Contact form"
              class="close-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
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
      </div>
    `;

    // Events handling
    this.wrapper.querySelector('.close-btn')
      .addEventListener('click', this.photographer.closeContactFormModal);

    // Close form on escape key pressed
    this.wrapper.addEventListener('close', this.photographer.closeContactFormModal);

    // Handle contact form submit
    this.wrapper.querySelector('input[type="submit"]')
      .addEventListener('click', this.photographer.handleContactFormSubmit);

    return this.wrapper;
  }
}

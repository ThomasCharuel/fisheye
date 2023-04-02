export default class PhotographerContactForm {
  constructor(photographer) {
    this.photographer = photographer;
  }

  create() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('contact-form');
    wrapper.setAttribute('tabindex', -1);

    wrapper.innerHTML = `
      <div 
        class="contact-form__container"
        role="dialog"
        aria-describedby="contact-form__title"
        aria-labelledby="contact-form__title">
        <header class="contact-form__header">
            <h2 class="contact-form__header-title" id="contact-form__title">
                Contactez-moi<br>${this.photographer.getName()}</span>
            </h2>
            <img 
              alt="Close Button"
              aria-label="Close Contact form" 
              class="close-btn" 
              src="/assets/images/icons/close.svg">
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

    // Close contact form on close button click
    wrapper.querySelector('.close-btn')
      .addEventListener('click', this.photographer.closeContactFormModal);

    // Close form on escape key pressed
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.photographer.closeContactFormModal();
      }
    });

    // Handle contact form submit
    wrapper.querySelector('input[type="submit"]')
      .addEventListener('click', this.photographer.handleContactFormSubmit);

    return wrapper;
  }
}

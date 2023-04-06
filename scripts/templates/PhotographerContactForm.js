export default class PhotographerContactForm {
  constructor(photographer) {
    this.photographer = photographer;
    this.wrapper = document.createElement('dialog');
    this.wrapper.classList.add('contact-form');
  }

  handleSubmit(e) {
    const inputs = [...this.wrapper.querySelectorAll('.contact-form__form-input')];

    const inputsValues = inputs.map((input) => {
      const hintId = `contact-form__input-${input.name}-hint`;
      const hint = document.getElementById(hintId);

      if (!input.reportValidity()) {
        hint.setAttribute('aria-hidden', 'false');
        hint.classList.remove('hidden');

        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', hintId);

        return null;
      }
      hint.setAttribute('aria-hidden', 'true');
      hint.classList.add('hidden');

      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');

      return `${input.name}: ${input.value}`;
    });

    if (!inputsValues.includes(null)) {
      inputsValues.forEach((inputValue) => console.log(inputValue));

      e.preventDefault(); // Prevent default submit behavior
      this.photographer.closeContactFormModal(); // Close modal after submitting
    }
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <div 
        class="contact-form__container"
        role="document"
        aria-labelledby="contact-form__title">
        <header class="contact-form__header">
            <h2 class="contact-form__header-title" id="contact-form__title">
                Contactez-moi<br>${this.photographer.getName()}</span>
            </h2>
            <button
              aria-label="Fermer le formulaire de contact"
              class="close-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
        </header>
        <form class="contact-form__form">
            <label for="contact-form__input-firstname" class="contact-form__form-label">Prénom</label>
            <input id="contact-form__input-firstname" class="contact-form__form-input" name="firstname" type="text" autocomplete required>
            <p aria-hidden="true" class="contact-form__form-hint hidden" id="contact-form__input-firstname-hint">Vous devez renseigner votre prénom !</p>
            
            <label for="contact-form__input-lastname" class="contact-form__form-label">Nom</label>
            <input id="contact-form__input-lastname" class="contact-form__form-input" name="lastname" type="text" autocomplete required>
            <p aria-hidden="true" class="contact-form__form-hint hidden" id="contact-form__input-lastname-hint">Vous devez renseigner votre nom !</p>

            <label for="contact-form__input-email" class="contact-form__form-label">Email</label>
            <input id="contact-form__input-email" class="contact-form__form-input" name="email" type="email" pattern=".+@.+\\..+" autocomplete required>
            <p aria-hidden="true" class="contact-form__form-hint hidden" id="contact-form__input-email-hint">Vous devez renseigner une adresse mail valide !</p>

            <label for="contact-form__input-message" class="contact-form__form-label">Votre message</label>
            <textarea id="contact-form__input-message" class="contact-form__form-input" name="message" required></textarea>
            <p aria-hidden="true" class="contact-form__form-hint hidden" id="contact-form__input-message-hint">Vous écrire un message !</p>

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
      .addEventListener('click', (e) => this.handleSubmit(e));

    return this.wrapper;
  }
}

export default class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer;
    this.wrapper = document.createElement('header');
    this.wrapper.classList.add('photographer-header');
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <div class="photographer-header__info-wrapper">
        <h1 class="photographer-header__name">${this.photographer.getName()}</h1>
        <p class="photographer-header__location">${this.photographer.getCity()}, ${this.photographer.getCountry()}</p>
        <p class="photographer-header__tagline">${this.photographer.getTagline()}</p>
      </div>
      <div class="photographer-header__cta-wrapper">
        <button 
          aria-label="Ouvrir le formulaire de contact"
          class="photographer-header__contact-btn cta-btn">Contactez-moi</button>
      </div>
      <div class="photographer-header__img-wrapper">
        <img 
          alt="${this.photographer.getName()}"
          src="${this.photographer.getPortrait()}" 
          class="photographer-header__image">
      </div>
    `;

    // Events handling
    this.wrapper.querySelector('.photographer-header__contact-btn')
      .addEventListener('click', this.photographer.openContactFormModal);

    return this.wrapper;
  }
}

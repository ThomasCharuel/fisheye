export default class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer;
    this.wrapper = document.createElement('header');
    this.wrapper.classList.add('photographer-header');
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <div>
        <h1 class="photographer-header__name">${this.photographer.getName()}</h1>
        <p class="photographer-header__location">${this.photographer.getCity()}, ${this.photographer.getCountry()}</p>
        <p class="photographer-header__tagline">${this.photographer.getTagline()}</p>
      </div>
      <button 
        aria-label="Contactez-moi"
        class="photographer-header__contact-btn cta-btn">Contactez-moi</button>
      <img 
        alt="Photo de profil de ${this.photographer.getName()}"
        src="${this.photographer.getPortrait()}" 
        class="photographer-header__image">
    `;

    // Events handling
    this.wrapper.querySelector('.photographer-header__contact-btn')
      .addEventListener('click', this.photographer.openContactFormModal);

    return this.wrapper;
  }
}

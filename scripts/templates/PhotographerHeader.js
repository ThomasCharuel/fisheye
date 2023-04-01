export default class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer;
  }

  create() {
    const wrapper = document.createElement('header');
    wrapper.classList.add('photographer-header');

    wrapper.innerHTML = `
      <div>
        <h1 class="photographer-header__name">${this.photographer.getName()}</h1>
        <p class="photographer-header__location">${this.photographer.getCity()}, ${this.photographer.getCountry()}</p>
        <p class="photographer-header__tagline">${this.photographer.getTagline()}</p>
      </div>
      <button 
        aria-label="Contact Me"
        class="photographer-header__contact-btn cta-btn">Contactez-moi</button>
      <img 
        alt="${this.photographer.getName()}"
        src="${this.photographer.getPortrait()}" 
        class="photographer-header__image">
    `;

    // Handle open contact button click
    wrapper.querySelector('.photographer-header__contact-btn')
      .addEventListener('click', this.photographer.openContactFormModal);

    return wrapper;
  }
}

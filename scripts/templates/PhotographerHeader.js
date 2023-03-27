export default class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer;
  }

  getHTML() {
    return `
      <div>
        <h1 class="photographer-header__name">${this.photographer.getName()}</h1>
        <p class="photographer-header__location">${this.photographer.getCity()}, ${this.photographer.getCountry()}</p>
        <p class="photographer-header__tagline">${this.photographer.getTagline()}</p>
      </div>
      <button class="photographer-header__contact-btn" onclick="displayModal()">Contactez-moi</button>
      <img src="${this.photographer.getPortrait()}" class="photographer-header__image">
    `;
  }
}

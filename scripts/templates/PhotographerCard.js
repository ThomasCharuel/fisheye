export default class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
  }

  getHTML() {
    return `
      <li>
        <article class="photographer-card">
          <a href="/pages/photographer.html?id=${this.photographer.getId()}" class="photographer-card__link">
            <img src="${this.photographer.getPortrait()}" class="photographer-card__image">
            <h2 class="photographer-card__name">${this.photographer.getName()}</h2>
            <p class="photographer-card__location">${this.photographer.getCity()}, ${this.photographer.getCountry()}</p>
            <p class="photographer-card__tagline">${this.photographer.getTagline()}</p>
            <p class="photographer-card__price">${this.photographer.getPrice()}€/jour</p>
          </a>
        </article>
      </li>
    `;
  }
}

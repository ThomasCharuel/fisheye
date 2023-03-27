export default class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
  }

  create() {
    const wrapper = document.createElement('article');

    const photographerCard = `
      <a href="/pages/photographer.html?id${this.photographer.getId()}">
        <img src="${this.photographer.getPortrait()}">
        <h2>${this.photographer.getName()}</h2>
        <p>${this.photographer.getCity()}, ${this.photographer.getCountry()}</p>
        <p>${this.photographer.getTagline()}</p>
        <p>${this.photographer.getPrice()}/jour</p>
      </a>
    `;

    wrapper.innerHTML = photographerCard;
    return wrapper;
  }
}

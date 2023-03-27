class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
  }

  createPhotographerCard() {
    const wrapper = document.createElement('article');

    const photographerCard = `
      <a href="/pages/photographer.html?id${this.photographer.getId()}">
        <img src="${this.photographer.getPortrait()}">
        <h2>${this.photographer.getName()}</h2>
      </a>
    `;

    wrapper.innerHTML = photographerCard;
    return wrapper;
  }
}

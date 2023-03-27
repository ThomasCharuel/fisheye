export default class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer;
  }

  getHTML() {
    // Format number based on default locale. E.g. 200000 -> 200 000
    const formattedLikeCount = this.photographer.getLikeCount().toLocaleString();
    return `
      <p class="photographer-info-section__likes-counter">${formattedLikeCount}<i class="fa-solid fa-heart"></i></p>
      <p class="photographer-info-section__price">${this.photographer.getPrice()}€ / jour</p>
    `;
  }
}

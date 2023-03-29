export default class PhotographerInfoSection {
  constructor(photographer) {
    this.photographer = photographer;
  }

  updateLikesCount() {
    const formattedLikesCount = this.photographer.getLikesCount().toLocaleString();
    document.querySelector('.photographer-info-section__likes-counter').textContent = formattedLikesCount;
  }

  getHTML() {
    // Format number based on default locale. E.g. 200000 -> 200 000
    const formattedLikesCount = this.photographer.getLikesCount().toLocaleString();
    return `
      <p class="photographer-info-section__likes-counter">${formattedLikesCount}<i class="fa-solid fa-heart"></i></p>
      <p class="photographer-info-section__price">${this.photographer.getPrice()}€ / jour</p>
    `;
  }
}

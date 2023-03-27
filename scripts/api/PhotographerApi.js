import Api from "./Api.js";

export default class PhotographerApi extends Api {
  constructor() {
    super('/data/photographers.json');
  }

  async getPhotographers() {
    return this.get()
      .then((res) => res.photographers);
  }

  async getPhotographer(photographerId) {
    const photographers = await this.getPhotographers();
    const photographer = photographers
      .filter((data) => String(data.id) === String(photographerId))[0];

    return photographer;
  }
}

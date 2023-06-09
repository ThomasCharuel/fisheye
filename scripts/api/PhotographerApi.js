import Api from "./Api.js";

export default class PhotographerApi extends Api {
  constructor() {
    super('/fisheye/data/photographers.json');
  }

  async getPhotographers() {
    return this.get()
      .then((res) => res.photographers);
  }

  async getPhotographer(photographerId) {
    const photographers = await this.getPhotographers();
    const photographer = photographers
      .filter((data) => data.id === photographerId)[0];

    return photographer;
  }
}

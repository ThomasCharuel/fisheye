import Api from "./Api.js";

export default class MediasApi extends Api {
  constructor() {
    super('/data/photographers.json');
  }

  async getMedias(photographerId) {
    return this.get()
      .then((res) => res.media)
      .then((medias) => medias.filter((media) => media.photographerId === photographerId));
  }
}

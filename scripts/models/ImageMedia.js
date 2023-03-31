import Media from './Media.js';

export default class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }

  getMiniImageUrl() {
    return `/assets/images/photographers/${this.photographerId}/medias/min-${this.image}`;
  }

  getImageUrl() {
    return `/assets/images/photographers/${this.photographerId}/medias/${this.image}`;
  }
}

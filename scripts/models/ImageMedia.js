import Media from './Media.js';

export default class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }

  getImage() {
    return `/assets/images/photographers/${this.photographerId}/medias/min-${this.image}`;
  }
}

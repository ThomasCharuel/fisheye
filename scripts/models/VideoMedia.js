import Media from './Media.js';

export default class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
  }

  getVideo() {
    return `/assets/images/photographers/${this.photographerId}/medias/${this.video}`;
  }
}

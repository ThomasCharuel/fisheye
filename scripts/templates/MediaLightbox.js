import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

export default class MediaLightbox {
  constructor(media) {
    this.media = media;
  }

  setMedia(media) {
    this.media = media;
  }

  create() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('media-lightbox__container');

    let mediaHTML;

    if (this.media instanceof ImageMedia) {
      mediaHTML = `
        <img src="${this.media.getImage()}" class="media-lightbox__media">
      `;
    } else if (this.media instanceof VideoMedia) {
      mediaHTML = `
        <video class="media-lightbox__media">
          <source src="${this.media.getVideo()}" type="video/mp4">
        </video>
      `;
    }

    wrapper.innerHTML = `
      ${mediaHTML}
      <p class="media-lightbox__title">${this.media.getTitle()}</p>
      <img class="close-btn" src="/assets/images/icons/close.svg">
    `;

    return wrapper;
  }
}

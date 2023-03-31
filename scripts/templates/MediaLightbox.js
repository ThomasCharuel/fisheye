import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

export default class MediaLightbox {
  constructor(media, photographer) {
    this.media = media;
    this.photographer = photographer;
  }

  create() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('media-lightbox');

    let mediaHTML;

    if (this.media instanceof ImageMedia) {
      mediaHTML = `
        <img src="${this.media.getImageUrl()}" class="media-lightbox__media">
      `;
    } else if (this.media instanceof VideoMedia) {
      mediaHTML = `
        <video class="media-lightbox__media" controls>
          <source src="${this.media.getVideo()}" type="video/mp4">
        </video>
      `;
    }

    wrapper.innerHTML = `
      <div class="media-lightbox__container">
          <i class="control-left-btn fa-solid fa-angle-left"></i>
          ${mediaHTML}
          <i class="control-close-btn fa-solid fa-xmark"></i>
          <i class="control-right-btn fa-solid fa-angle-right"></i>
          <p class="media-lightbox__title">${this.media.getTitle()}</p>
        </div>
      </div>
    `;

    // Handle close lightbox button click
    wrapper.querySelector('.control-close-btn')
      .addEventListener('click', this.photographer.closeMediaLightboxModal);

    return wrapper;
  }
}

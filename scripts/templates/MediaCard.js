import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

export default class MediaCard {
  constructor(media) {
    this.media = media;
  }

  getHTML() {
    let thumbnailHTML;

    if (this.media instanceof ImageMedia) {
      thumbnailHTML = `
        <img src="${this.media.getImage()}" class="media-card__thumbnail">
      `;
    } else if (this.media instanceof VideoMedia) {
      thumbnailHTML = `
        <div class="media-card__thumbnail-wrapper">
          <i class="media-card__film-icon fa-regular fa-circle-play"></i>
          <video class="media-card__thumbnail">
            <i class="fa-solid fa-film"></i>
            <source src="${this.media.getVideo()}" type="video/mp4">
          </video>
        </div>
      `;
    } else {
      throw 'Unknown Media Type';
    }

    return `
      <li>
        <article class="media-card">
          ${thumbnailHTML}
          <div class="media-card__info-wrapper">
            <p class="media-card__title">${this.media.getTitle()}</p>
            <p class="media-card__likes">${this.media.getLikes()}<i class="fa-solid fa-heart"></i></p>
          </div>
        </article>
      </li>
    `;
  }
}

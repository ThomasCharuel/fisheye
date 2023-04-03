import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

export default class MediaCard {
  constructor(media, openLightboxModal, updateLikesCount) {
    this.media = media;
    this.updateLikesCount = updateLikesCount;
    this.openLightboxModal = openLightboxModal;

    this.wrapper = document.createElement('li');
  }

  handleLikeButton() {
    this.wrapper.querySelector('.like-btn')
      .addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('btn-liked');

        this.media.toggleHasUserLiked();

        // Update this component likes count
        this.wrapper.querySelector('.media-card__likes-counter').textContent = this.media.getLikes();

        // Update photographer info: likes count
        this.updateLikesCount();
      });
  }

  create() {
    let thumbnailHTML;

    if (this.media instanceof ImageMedia) {
      thumbnailHTML = `
        <img 
          alt="${this.media.getTitle()}" 
          src="${this.media.getMiniImageUrl()}" 
          class="media-card__thumbnail">
      `;
    } else if (this.media instanceof VideoMedia) {
      thumbnailHTML = `
        <i aria-label="Play Video" class="media-card__film-icon fa-regular fa-circle-play"></i>
        <video 
          title="${this.media.getTitle()}" 
          class="media-card__thumbnail">
          <source
            src="${this.media.getVideo()}" 
            type="video/mp4">
        </video>
      `;
    } else {
      throw 'Unknown Media Type';
    }

    this.wrapper.innerHTML = `
      <li id="media-card-${this.media.getId()}">
        <article class="media-card">
          <a aria-label="Open media" href="#mediaId=${this.media.getId()}" class="media-card__thumbnail-wrapper">
            ${thumbnailHTML}
          </a>
          <div class="media-card__info-wrapper">
            <p class="media-card__title">${this.media.getTitle()}</p>
            <p class="media-card__likes">
              <span class="media-card__likes-counter">${this.media.getLikes()}</span>
              <button aria-label="likes" class="media-card__likes-btn like-btn${this.media.getHasUserLiked() ? ' btn-liked' : ''}">
                <i class="outline-heart fa-regular fa-heart"></i>
                <i class="filled-heart fa-solid fa-heart"></i>
              </button>
            </p>
          </div>
        </article>
      </li>
    `;
    this.handleLikeButton();

    // Open lightbox if click on media card
    this.wrapper.querySelector('.media-card__thumbnail-wrapper')
      .addEventListener('click', () => this.openLightboxModal(this.media));

    return this.wrapper;
  }
}

import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

export default class MediaCard {
  constructor(media, updateLikesCount) {
    this.media = media;
    this.updateLikesCount = updateLikesCount;

    this.wrapper = document.createElement('li');
  }

  handleLikeButton() {
    this.wrapper.querySelector('.like-btn')
      .addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('btn-liked')) {
          e.currentTarget.classList.remove('btn-liked');
          this.media.setLikes(this.media.getLikes() - 1);
        } else {
          e.currentTarget.classList.add('btn-liked');
          this.media.setLikes(this.media.getLikes() + 1);
        }
        this.wrapper.querySelector('.media-card__likes-counter').textContent = this.media.getLikes();
        // Notify event listeners on like button click
        this.updateLikesCount();
      });
  }

  createMediaCard() {
    let thumbnailHTML;

    if (this.media instanceof ImageMedia) {
      thumbnailHTML = `
        <img src="${this.media.getImage()}" class="media-card__thumbnail">
      `;
      thumbnailHTML = '<img class="media-card__thumbnail">';
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

    this.wrapper.innerHTML = `
      <li id="media-card-${this.media.getId()}">
        <article class="media-card">
          ${thumbnailHTML}
          <div class="media-card__info-wrapper">
            <p class="media-card__title">${this.media.getTitle()}</p>
            <p class="media-card__likes">
              <span class="media-card__likes-counter">${this.media.getLikes()}</span>
              <span class="media-card__likes-btn like-btn">
                <i class="outline-heart fa-regular fa-heart"></i>
                <i class="filled-heart fa-solid fa-heart"></i>
              </span>
            </p>
          </div>
        </article>
      </li>
    `;
    this.handleLikeButton();

    return this.wrapper;
  }
}

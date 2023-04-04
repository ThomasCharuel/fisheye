import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';

export default class MediaLightbox {
  constructor(media, photographer) {
    this.media = media;
    this.photographer = photographer;

    this.wrapper = document.createElement('dialog');
    this.wrapper.classList.add('media-lightbox');
  }

  getHTML() {
    let mediaHTML; // HTML for image or video

    if (this.media instanceof ImageMedia) {
      mediaHTML = `
        <img 
          alt="${this.media.getTitle()}"
          src="${this.media.getImageUrl()}"
          class="media-lightbox__media">
      `;
    } else if (this.media instanceof VideoMedia) {
      mediaHTML = `
        <video 
          title="${this.media.getTitle()}"
          class="media-lightbox__media" 
          controls>
          <source src="${this.media.getVideo()}" type="video/mp4">
          <p>
            Votre navigateur ne permet pas de lire les vidéos.
            Voici le lien de téléchargement: <a href="${this.media.getVideo()}">${this.media.getTitle()}</a>
          </p>
        </video>
      `;
    }

    const isFirstMediaInMedias = this.photographer.isMediaFirstInMedias(this.media);
    const isLastMediaInMedias = this.photographer.isMediaLastInMedias(this.media);

    this.wrapper.innerHTML = `
      <div
        tabindex="-1"
        aria-label="Média ${this.media.getTitle()} en plein écran"
        class="media-lightbox__container">
        <button aria-label="Ferme le média" class="control-close-btn"><i class="fa-solid fa-xmark"></i></button>
        ${isFirstMediaInMedias ? '' : '<a href="#" aria-label="Media précédent" class="control-left-btn"><i class="fa-solid fa-angle-left"></i></a>'}
        ${mediaHTML}
        ${isLastMediaInMedias ? '' : '<a href="#" aria-label="Media suivant" class="control-right-btn"><i class="fa-solid fa-angle-right"></i></a>'}
        <p class="media-lightbox__title">${this.media.getTitle()}</p>
      </div>
    `;

    // Events Handling
    this.wrapper.querySelector('.control-close-btn')
      .addEventListener('click', () => this.photographer.closeMediaLightboxModal(this.media));

    this.wrapper.addEventListener('close', () => this.photographer.closeMediaLightboxModal(this.media));

    // Handle left button / key pressed events
    if (!isFirstMediaInMedias) {
      this.wrapper.querySelector('.control-left-btn')
        .addEventListener('click', () => this.photographer.slideLeftMediaLightbox(this.media));

      this.wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.photographer.slideLeftMediaLightbox(this.media);
        }
      });
    }
    // Handle right button / key pressed events
    if (!isLastMediaInMedias) {
      this.wrapper.querySelector('.control-right-btn')
        .addEventListener('click', () => this.photographer.slideRightMediaLightbox(this.media));

      this.wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          this.photographer.slideRightMediaLightbox(this.media);
        }
      });
    }

    return this.wrapper;
  }
}

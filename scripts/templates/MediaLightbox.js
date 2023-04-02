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
    wrapper.setAttribute('role', 'dialog');

    let mediaHTML;

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

    wrapper.innerHTML = `
      <div 
        role="document"
        tabindex="0"
        aria-label="image closeup view"
        aria-describedby="media-lightbox__title"
        class="media-lightbox__container">
        ${isFirstMediaInMedias ? '' : '<i aria-label="Previous image" class="control-left-btn fa-solid fa-angle-left"></i>'}
        ${mediaHTML}
        <i aria-label="Close dialog" class="control-close-btn fa-solid fa-xmark"></i>
        ${isLastMediaInMedias ? '' : '<i aria-label="Next image" class="control-right-btn fa-solid fa-angle-right"></i>'}
        <p class="media-lightbox__title" id="media-lightbox__title">${this.media.getTitle()}</p>
      </div>
    `;

    // Handle close lightbox button click
    wrapper.querySelector('.control-close-btn')
      .addEventListener('click', () => this.photographer.closeMediaLightboxModal(this.media));

    // Close form on escape key pressed
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.photographer.closeMediaLightboxModal(this.media);
      }
    });

    // Handle left button / key pressed events
    if (!isFirstMediaInMedias) {
      wrapper.querySelector('.control-left-btn')
        .addEventListener('click', () => this.photographer.slideLeftMediaLightbox(this.media));

      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.photographer.slideLeftMediaLightbox(this.media);
        }
      });
    }
    // Handle right button / key pressed events
    if (!isLastMediaInMedias) {
      wrapper.querySelector('.control-right-btn')
        .addEventListener('click', () => this.photographer.slideRightMediaLightbox(this.media));

      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          this.photographer.slideRightMediaLightbox(this.media);
        }
      });
    }

    return wrapper;
  }
}

import MediaLightbox from '../templates/MediaLightbox.js';
import Photographer from '../models/Photographer.js';
import PhotographerCard from '../templates/PhotographerCard.js';
import PhotographerHeader from '../templates/PhotographerHeader.js';
import PhotographerInfoSection from '../templates/PhotographerInfoSection.js';
import PhotographerContactForm from '../templates/PhotographerContactForm.js';

export default function createPhotographer(data) {
  const photographer = new Photographer(data);

  photographer.getCardHTML = () => new PhotographerCard(photographer).getHTML();
  photographer.createHeader = () => new PhotographerHeader(photographer).create();
  photographer.getInfoSectionHTML = () => {
    photographer.infoSectionTemplate = new PhotographerInfoSection(photographer);
    return photographer.infoSectionTemplate.getHTML();
  };
  photographer.updateInfoSection = () => photographer.infoSectionTemplate.updateLikesCount();
  photographer.createContactForm = () => new PhotographerContactForm(photographer).create();

  photographer.closeMediaLightboxModal = (media) => {
    const mainElement = document.querySelector('main');
    // Show main to screen readers
    mainElement.setAttribute('aria-hidden', 'false');

    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    // Hide lightbox from screen readers
    mediaLightbox.setAttribute('aria-hidden', 'true');
    mediaLightbox.replaceChildren();

    // Set focus on the media card
    const mediaCardLink = document.querySelector(`#media-card__link-${media.getId()}`);
    mediaCardLink.focus();
  };

  photographer.openMediaLightboxModal = (media) => {
    const mainElement = document.querySelector('main');
    // Hide main from screen readers
    mainElement.setAttribute('aria-hidden', 'true');

    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    const mediaLightboxElement = new MediaLightbox(media, photographer).create();
    mediaLightbox.appendChild(mediaLightboxElement);
    // Show lightbox to screen readers
    mediaLightbox.setAttribute('aria-hidden', 'false');
    mediaLightboxElement.showModal();

    // Set focus on close lightbox
    mediaLightboxElement.querySelector('.control-close-btn').focus();
  };

  photographer.slideLeftMediaLightbox = (media) => {
    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.replaceChildren();

    photographer.openMediaLightboxModal(photographer.getPreviousMedia(media));

    // Set focus on slide left or close button
    const controlLeftButton = mediaLightbox.querySelector('.control-left-btn');
    if (controlLeftButton) {
      controlLeftButton.focus();
    }
  };

  photographer.slideRightMediaLightbox = (media) => {
    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.replaceChildren();

    photographer.openMediaLightboxModal(photographer.getNextMedia(media));

    // Set focus on slide right or close button
    const controlRightButton = mediaLightbox.querySelector('.control-right-btn');
    if (controlRightButton) {
      controlRightButton.focus();
    }
  };

  photographer.openContactFormModal = () => {
    const mainElement = document.querySelector('main');
    // Hide main from screen readers
    mainElement.setAttribute('aria-hidden', 'true');

    const photographerContactForm = document.querySelector('.contact-form-placeholder');
    const photographerContactFormModal = new PhotographerContactForm(photographer).create();
    photographerContactForm.appendChild(photographerContactFormModal);
    // Show modal to screen readers
    photographerContactForm.setAttribute('aria-hidden', 'false');
    photographerContactFormModal.showModal();

    // Set focus on first form field
    const firstFormInput = photographerContactForm.querySelector('input');
    firstFormInput.focus();
  };

  photographer.closeContactFormModal = () => {
    const mainElement = document.querySelector('main');
    // Show main to screen readers
    mainElement.setAttribute('aria-hidden', 'false');

    const photographerContactForm = document.querySelector('.contact-form-placeholder');
    // Hide modal from screen readers
    photographerContactForm.setAttribute('aria-hidden', 'true');
    photographerContactForm.replaceChildren();

    // Set focus on open modal button
    const openModalButton = document.querySelector('.photographer-header__contact-btn');
    openModalButton.focus();
  };

  photographer.handleContactFormSubmit = (e) => {
    const contactForm = document.querySelector('.contact-form__form');

    if (contactForm.reportValidity()) {
      // Get and print inputs in console
      contactForm.querySelectorAll('input:not([type="submit"]), textarea')
        .forEach((input) => console.log(`${input.name}: ${input.value}`));

      e.preventDefault(); // Prevent default submit behavior
      photographer.closeContactFormModal(); // Close modal after submitting
    }
  };

  return photographer;
}

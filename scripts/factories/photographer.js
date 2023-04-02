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

  photographer.openMediaLightboxModal = (media) => {
    const mainElement = document.querySelector('main');
    // Hide main from screen readers
    mainElement.setAttribute('aria-hidden', 'true');

    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.appendChild(new MediaLightbox(media, photographer).create());
    // Show lightbox to screen readers
    mediaLightbox.setAttribute('aria-hidden', 'false');

    // Set focus on close lightbox button
    const closeLightboxButton = mediaLightbox.querySelector('.control-close-btn');
    closeLightboxButton.focus();
  };

  photographer.closeMediaLightboxModal = (media) => {
    const mainElement = document.querySelector('main');
    // Show main to screen readers
    mainElement.setAttribute('aria-hidden', 'false');

    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    // Hide lightbox from screen readers
    mediaLightbox.setAttribute('aria-hidden', 'true');
    mediaLightbox.replaceChildren();

    // Set focus on the media card
    const mediaCardLink = document.querySelector(`#media-card-${media.getId()} a`);
    mediaCardLink.focus();
  };

  photographer.slideLeftMediaLightbox = (media) => {
    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.replaceChildren();
    mediaLightbox.appendChild(
      new MediaLightbox(photographer.getPreviousMedia(media), photographer).create(),
    );
    // Set focus on previous lightbox button or close button
    const previousLightboxButton = mediaLightbox.querySelector('.control-left-btn, .control-close-btn');
    previousLightboxButton.focus();
  };

  photographer.slideRightMediaLightbox = (media) => {
    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.replaceChildren();
    mediaLightbox.appendChild(
      new MediaLightbox(photographer.getNextMedia(media), photographer).create(),
    );
    // Set focus on next lightbox button or close button
    const nextLightboxButton = mediaLightbox.querySelector('.control-right-btn, .control-close-btn');
    nextLightboxButton.focus();
  };

  photographer.openContactFormModal = () => {
    const mainElement = document.querySelector('main');
    // Hide main from screen readers
    mainElement.setAttribute('aria-hidden', 'true');

    const photographerContactForm = document.querySelector('.contact-form-placeholder');
    photographerContactForm.appendChild(new PhotographerContactForm(photographer).create());
    // Show modal to screen readers
    photographerContactForm.setAttribute('aria-hidden', 'false');

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

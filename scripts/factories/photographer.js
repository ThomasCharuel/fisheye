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
    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.appendChild(new MediaLightbox(media, photographer).create());
  };

  photographer.closeMediaLightboxModal = () => {
    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.replaceChildren();
  };

  photographer.slideLeftMediaLightbox = (media) => {
    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.replaceChildren();
    mediaLightbox.appendChild(
      new MediaLightbox(photographer.getPreviousMedia(media), photographer).create(),
    );
  };

  photographer.slideRightMediaLightbox = (media) => {
    const mediaLightbox = document.querySelector('.media-lightbox-placeholder');
    mediaLightbox.replaceChildren();
    mediaLightbox.appendChild(
      new MediaLightbox(photographer.getNextMedia(media), photographer).create(),
    );
  };

  photographer.openContactFormModal = () => {
    const photographerContactForm = document.querySelector('.contact-form-placeholder');
    photographerContactForm.appendChild(new PhotographerContactForm(photographer).create());
  };

  photographer.closeContactFormModal = () => {
    const photographerContactForm = document.querySelector('.contact-form-placeholder');
    photographerContactForm.replaceChildren();
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

import Photographer from '../models/Photographer.js';
import PhotographerCard from '../templates/PhotographerCard.js';
import PhotographerHeader from '../templates/PhotographerHeader.js';
import PhotographerInfoSection from '../templates/PhotographerInfoSection.js';

export default function createPhotographer(data) {
  const photographer = new Photographer(data);

  photographer.getCardHTML = () => new PhotographerCard(photographer).getHTML();
  photographer.getHeaderHTML = () => new PhotographerHeader(photographer).getHTML();
  photographer.getInfoSectionHTML = () => new PhotographerInfoSection(photographer).getHTML();

  return photographer;
}

import PhotographerApi from '../api/PhotographerApi.js';
import Photographer from '../models/Photographer.js';
import PhotographerCard from '../templates/PhotographerCard.js';

function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographerData) => {
    const photographer = new Photographer(photographerData);
    const photographerTemplate = new PhotographerCard(photographer);
    photographersSection.appendChild(photographerTemplate.create());
  });
}

async function init() {
  // Get photographers data
  const photographerApi = new PhotographerApi();
  const photographers = await photographerApi.get();
  displayData(photographers);
}

init();

import PhotographerApi from '../api/PhotographerApi.js';
import createPhotographer from '../factories/photographer.js';

function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographerData) => {
    const photographer = createPhotographer(photographerData);
    photographersSection.appendChild(photographer.getCardHTML());
  });
}

async function init() {
  // Get photographers data
  const photographerApi = new PhotographerApi();
  const photographers = await photographerApi.get();
  displayData(photographers);
}

init();

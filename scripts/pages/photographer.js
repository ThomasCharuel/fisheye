import PhotographerApi from "../api/PhotographerApi.js";
import createPhotographer from "../factories/photographer.js";

async function getPhotographerData() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');

  const photographerApi = new PhotographerApi();
  const photographerData = await photographerApi.getPhotographer(photographerId);
  const photographer = createPhotographer(photographerData);

  return photographer;
}

function displayData(photographer) {
  const photographerHeader = document.querySelector('.photographer-header');
  photographerHeader.innerHTML = photographer.getHeaderHTML();

  const photographerInfoSection = document.querySelector('.photographer-info-section');
  photographerInfoSection.innerHTML = photographer.getInfoSectionHTML();
}

async function main() {
  const photographer = await getPhotographerData();

  displayData(photographer);
}

main();

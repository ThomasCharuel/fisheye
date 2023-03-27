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
}

async function main() {
  const photographer = await getPhotographerData();

  displayData(photographer);
}

main();

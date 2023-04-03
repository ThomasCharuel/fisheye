import PhotographerApi from "../api/PhotographerApi.js";
import MediasApi from "../api/MediasApi.js";
import createPhotographer from "../factories/photographer.js";
import createMedia from "../factories/media.js";

async function getPhotographerData() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = Number(urlParams.get('id'));

  const photographerApi = new PhotographerApi();
  const photographerData = await photographerApi.getPhotographer(photographerId);
  const photographer = createPhotographer(photographerData);

  const mediasApi = new MediasApi();
  const mediasData = await mediasApi.getMedias(photographerId);
  const medias = mediasData.map((data) => createMedia(data));
  photographer.setMedias(medias);

  return photographer;
}

function displayData(photographer) {
  // Change page title
  document.title = `FishEye - ${photographer.getName()}`;

  const photographerHeader = document.querySelector('.photographer-header-wrapper');
  photographerHeader.appendChild(photographer.createHeader());

  const photographerInfoSection = document.querySelector('.photographer-info-section');
  photographerInfoSection.innerHTML = photographer.getInfoSectionHTML();

  photographer.createMediasSortSelect();
  photographer.renderMedias();
}

async function main() {
  const photographer = await getPhotographerData();
  displayData(photographer);
}

main();

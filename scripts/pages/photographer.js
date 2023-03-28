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

function changePageTitle(photographer) {
  document.title = `FishEye - ${photographer.getName()}`;
}

function displayData(photographer) {
  const photographerHeader = document.querySelector('.photographer-header');
  photographerHeader.innerHTML = photographer.getHeaderHTML();

  const mediasSection = document.querySelector('.medias-section');
  photographer.getMedias().forEach((media) => {
    mediasSection.insertAdjacentHTML('beforeend', media.getCardHTML());
  });

  const photographerInfoSection = document.querySelector('.photographer-info-section');
  photographerInfoSection.innerHTML = photographer.getInfoSectionHTML();
}

async function main() {
  const photographer = await getPhotographerData();

  changePageTitle(photographer);
  displayData(photographer);
}

//main();

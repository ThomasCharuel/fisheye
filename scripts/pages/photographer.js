import PhotographerApi from "../api/PhotographerApi.js";
import MediasApi from "../api/MediasApi.js";
import createPhotographer from "../factories/photographer.js";
import createMedia from "../factories/media.js";

// Load Photographer data and medias associated
async function loadPhotographer() {
  // Get photographer ID based on URL
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = Number(urlParams.get('id'));

  // Get photographer Data
  const photographerApi = new PhotographerApi();
  const photographerData = await photographerApi.getPhotographer(photographerId);
  const photographer = createPhotographer(photographerData);

  // Get photographer medias
  const mediasApi = new MediasApi();
  const mediasData = await mediasApi.getMedias(photographerId);
  const medias = mediasData.map((data) => createMedia(data));
  photographer.setMedias(medias);

  return photographer;
}

// Display photographer page sections
function displayData(photographer) {
  photographer.updatePageTitle();
  photographer.renderHeader();
  photographer.renderInfoSection();
  photographer.renderMediasSortSelect();
  photographer.renderMedias();
}

async function main() {
  const photographer = await loadPhotographer();
  displayData(photographer);
}

main();

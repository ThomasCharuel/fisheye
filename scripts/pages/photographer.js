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

function displayMedias(photographer) {
  const mediasSection = document.querySelector('.medias-section');
  // Empty medias
  mediasSection.replaceChildren();

  // Add medias to HTML one by one
  photographer.getMedias()
    .forEach(
      (media) => mediasSection.appendChild(
        media.createCard(photographer.openMediaLightboxModal, photographer.updateInfoSection),
      ),
    );
}

function displayData(photographer) {
  const photographerHeader = document.querySelector('.photographer-header-wrapper');
  photographerHeader.appendChild(photographer.createHeader());

  const photographerInfoSection = document.querySelector('.photographer-info-section');
  photographerInfoSection.innerHTML = photographer.getInfoSectionHTML();

  displayMedias(photographer);
}

async function main() {
  const photographer = await getPhotographerData();

  document.querySelectorAll('.dropdown-btn__menu-item')
    .forEach((sortItem) => sortItem.addEventListener('click', () => {
      photographer.setSortMediasBy(sortItem.getAttribute('value'));
      displayMedias(photographer);
    }));

  changePageTitle(photographer);

  displayData(photographer);
}

main();

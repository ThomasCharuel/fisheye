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

function changeModalTitle(photographer) {
  document.querySelector('.contact-form__header-title-photographer-name')
    .textContent = photographer.getName();
}

function displayMedias(photographer, sortby) {
  const mediasSection = document.querySelector('.medias-section');
  // Empty medias
  mediasSection.replaceChildren();

  // Add medias to HTML one by one
  [...photographer.getMedias()] // Create new array to avoid in-place sorting
    // Apply sort
    .sort((a, b) => {
      let sortValue;
      if (sortby === 'likes') {
        sortValue = a.getLikes() - b.getLikes();
      } else if (sortby === 'date') {
        sortValue = a.getDate() > b.getDate();
      } else if (sortby === 'title') {
        sortValue = a.getTitle().localeCompare(b.getTitle());
      } else {
        throw 'Unkown sort type';
      }
      return sortValue;
    })
    .forEach(
      (media) => mediasSection.appendChild(media.createCard(photographer.updateInfoSection)),
    );
}

function displayData(photographer, sortby) {
  const photographerHeader = document.querySelector('.photographer-header-wrapper');
  photographerHeader.appendChild(photographer.createHeader());

  const photographerInfoSection = document.querySelector('.photographer-info-section');
  photographerInfoSection.innerHTML = photographer.getInfoSectionHTML();

  displayMedias(photographer, sortby);
}

async function main() {
  const defaultSortBy = 'likes';
  const photographer = await getPhotographerData();

  document.querySelectorAll('.dropdown-btn__menu-item')
    .forEach((sortItem) => sortItem.addEventListener('click', () => {
      displayMedias(photographer, sortItem.getAttribute('value'));
    }));

  changePageTitle(photographer);
  changeModalTitle(photographer);

  displayData(photographer, defaultSortBy);
}

main();

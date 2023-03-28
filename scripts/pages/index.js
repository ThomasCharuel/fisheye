import PhotographerApi from '../api/PhotographerApi.js';
import createPhotographer from '../factories/photographer.js';

async function getPhotographersData() {
  const photographerApi = new PhotographerApi();
  const photographers = await photographerApi.getPhotographers()
    .then((photographerDatas) => photographerDatas.map(createPhotographer));

  return photographers;
}

function displayData(photographers) {
  const photographersSection = document.querySelector('.photographers-section');

  photographers.forEach((photographer) => {
    photographersSection.insertAdjacentHTML('beforeend', photographer.getCardHTML());
  });
}

async function main() {
  const photographers = await getPhotographersData();
  displayData(photographers);
}

main();

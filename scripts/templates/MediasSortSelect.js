const SORT_TYPES = ['likes', 'date', 'title'];

export default class MediasSortSelect {
  constructor(photographer) {
    this.photographer = photographer;
    [this.sortBy] = SORT_TYPES;
  }

  create() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('medias-sort-section');

    const sortItems = SORT_TYPES.map((sortType) => `
      <li ${sortType === this.sortBy ? 'aria-hidden="true" aria-selected="true"' : 'aria-selected="false"'}>
        <button class="dropdown__cta" id="sort-by-likes-${sortType}">
          <span class="dropdown__cta-text">${sortType}</span>
          <i class="dropdown__cta-icon fa-solid fa-chevron-up"></i>
        </button>
      </li>
    `);

    wrapper.innerHTML = `
      <span class="medias-sort-section__label">Trier par</span>
      <div id="medias-sort-select" class="dropdown">
        <button
            aria-expanded="false"
            role="listbox"
            aria-labelledby="dropdown-selected-choice"
            aria-controls="medias-sort-types"
            class="dropdown__cta"
            id="medias-sort-choice"
        >
            <span id="dropdown-selected-choice" class="dropdown__cta-text">${this.sortBy}</span>
            <i class="dropdown__cta-icon fa-solid fa-chevron-down"></i>
        </button>
        <ul 
            aria-hidden="true"
            id="medias-sort-choices" 
            class="dropdown__menu">
            ${sortItems}
        </ul>
      </div>
    `;

    wrapper.querySelectorAll('.dropdown__menu .dropdown__cta')
      .forEach((sortItem) => sortItem.addEventListener('click', () => {
        console.log(sortItem);
        // this.photographer.setSortMediasBy(sortItem.getAttribute('value'));
        // this.photographer.displayMedias();
      }));

      // const toggleChoices = () => {
      //   const dropdownMenu = document.querySelector('#medias-sort-choices');
      //   const dropdownButton = document.querySelector('#medias-sort-choice');
      
      //   if (dropdownButton.getAttribute('aria-expanded') === 'false') {
      //     dropdownMenu.setAttribute('aria-hidden', 'false');
      //     dropdownButton.setAttribute('aria-expanded', 'true');
      //   } else {
      //     dropdownMenu.setAttribute('aria-hidden', 'true');
      //     dropdownButton.setAttribute('aria-expanded', 'false');
      //   }
      // }
      
      // const closeChoices = () => {
      //   const dropdownMenu = document.querySelector('#medias-sort-choices');
      //   const dropdownButton = document.querySelector('#medias-sort-choice');
        
      //   dropdownMenu.setAttribute('aria-hidden', 'true');
      //   dropdownButton.setAttribute('aria-expanded', 'false');
      // }

    return wrapper;
  }
}

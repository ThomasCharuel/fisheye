const SORT_TYPES = [
  {
    key: 'likes',
    name: 'Popularité',
  },
  {
    key: 'date',
    name: 'Date',
  },
  {
    key: 'title',
    name: 'Titre',
  },
];

export default class MediasSortSelect {
  constructor(photographer) {
    this.photographer = photographer;
    [this.sortBy] = SORT_TYPES;
  }

  toggleDropdown() {
    const dropdownMenu = document.querySelector('#medias-sort-choices');
    const dropdownButton = document.querySelector('#medias-sort-choice');

    if (dropdownButton.getAttribute('aria-expanded') === 'false') {
      dropdownMenu.setAttribute('aria-hidden', 'false');
      dropdownButton.setAttribute('aria-expanded', 'true');
    } else {
      dropdownMenu.setAttribute('aria-hidden', 'true');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }

    // Set focus on dropdownButton
    dropdownButton.focus();
  }

  create() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('medias-sort-section');

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
          <span id="dropdown-selected-choice" class="dropdown__cta-text">${this.sortBy.name}</span>
          <i class="dropdown__cta-icon fa-solid fa-chevron-down"></i>
        </button>
        <ul 
          aria-hidden="true"
          id="medias-sort-choices" 
          class="dropdown__menu"
        >
        ${SORT_TYPES.map((sortType) => `
          <li ${sortType === this.sortBy ? 'aria-hidden="true" aria-selected="true"' : 'aria-selected="false"'}>
            <button class="dropdown__cta" id="sort-by-likes-${sortType.key}">${sortType.name}</button>
          </li>`).join('')}
        </ul>
      </div>
    `;

    // Click on dropdown button
    wrapper.querySelector('#medias-sort-choice')
      .addEventListener('click', this.toggleDropdown);

    wrapper.querySelectorAll('.dropdown__menu .dropdown__cta')
      .forEach((sortItem) => sortItem.addEventListener('click', () => {
        // Get new sort key
        this.sortBy = SORT_TYPES.find((s) => s.key === sortItem.id.split('-').at(-1));

        // Update display of sort select
        wrapper.querySelector('#dropdown-selected-choice').innerHTML = this.sortBy.name;

        // Change state for old and new selected choice
        const oldSortItem = wrapper.querySelector('#medias-sort-choices li[aria-selected="true"]');
        oldSortItem.removeAttribute('aria-hidden');
        oldSortItem.setAttribute('aria-selected', 'false');

        sortItem.parentElement.setAttribute('aria-hidden', 'true');
        sortItem.parentElement.setAttribute('aria-selected', 'true');

        this.toggleDropdown();
        //this.photographer.changeMediasOrder(this.sortBy.key);
      }));

    return wrapper;
  }
}

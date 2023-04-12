import { setFocus } from '../utils/utils.js';

const SORT_TYPES = [
  { key: 'likes', name: 'Popularité' },
  { key: 'date', name: 'Date' },
  { key: 'title', name: 'Titre' },
];

export default class MediasSortSelect {
  constructor(photographer) {
    this.photographer = photographer;
    [this.sortBy] = SORT_TYPES;

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('medias-sort-section');
  }

  openDropdown() {
    const dropdownMenu = document.querySelector('#medias-sort-choices');
    const dropdownButton = document.querySelector('#medias-sort-choice');

    dropdownMenu.setAttribute('aria-hidden', 'false');
    dropdownButton.setAttribute('aria-expanded', 'true');
  }

  closeDropdown() {
    const dropdownMenu = document.querySelector('#medias-sort-choices');
    const dropdownButton = document.querySelector('#medias-sort-choice');

    dropdownMenu.setAttribute('aria-hidden', 'true');
    dropdownButton.setAttribute('aria-expanded', 'false');
  }

  toggleDropdown() {
    const dropdownButton = document.querySelector('#medias-sort-choice');

    if (dropdownButton.getAttribute('aria-expanded') === 'false') {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }

    // Set focus on dropdownButton
    setFocus(dropdownButton);
  }

  handleFocusout(e) {
    // If focus ouside dropdown
    const menuButtons = [...this.wrapper.querySelectorAll('.dropdown__cta')];

    if (!menuButtons.includes(e.relatedTarget)) {
      this.closeDropdown();
    }
  }

  handleKeydown(e) {
    const dropDownButton = this.wrapper.querySelector('#medias-sort-choice');

    const menuButtons = [
      dropDownButton,
      ...this.wrapper.querySelectorAll('#medias-sort-choices li[aria-selected="false"] .dropdown__cta')];

    // Test if menu is showing (aria-expanded)
    const isMenuExpanded = dropDownButton.getAttribute('aria-expanded') === 'true';

    if (isMenuExpanded) {
      // Shift focus to previous item (if exist)
      if (e.key === 'ArrowUp' && e.target !== menuButtons[0]) {
        const previousItem = menuButtons.at(menuButtons.indexOf(e.target) - 1);
        setFocus(previousItem);
      } else if (e.key === 'ArrowDown' && e.target !== menuButtons.at(-1)) {
        // Shift focus to next item (if exist)
        const nextItem = menuButtons.at(menuButtons.indexOf(e.target) + 1);
        setFocus(nextItem);
      } else if (e.key === 'Escape') {
        this.closeDropdown();
        setFocus(dropDownButton);
      }
    }
  }

  handleMenuItemClick(sortItem) {
    // Get new sort key
    this.sortBy = SORT_TYPES.find((s) => s.key === sortItem.id.split('-').at(-1));

    // Update display of sort select
    this.wrapper.querySelector('#dropdown-selected-choice').innerHTML = this.sortBy.name;

    this.wrapper.querySelector('#medias-sort-select').setAttribute('aria-activedescendant', `sort-by-${this.sortBy.key}`);

    // Change state for old and new selected choice
    const oldSortItem = this.wrapper.querySelector('#medias-sort-choices li[aria-selected="true"]');
    oldSortItem.removeAttribute('aria-hidden');
    oldSortItem.setAttribute('aria-selected', 'false');
    oldSortItem.setAttribute('aria-checked', 'false');

    sortItem.parentElement.setAttribute('aria-hidden', 'true');
    sortItem.parentElement.setAttribute('aria-selected', 'true');
    sortItem.parentElement.setAttribute('aria-checked', 'true');

    this.toggleDropdown();
    this.photographer.changeMediasOrder(this.sortBy.key);
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <span id="medias-sort-section__label" class="medias-sort-section__label">Trier par</span>
      <div 
        role="radiogroup" 
        aria-labelledby="medias-sort-section__label"
        aria-activedescendant="sort-by-${this.sortBy.key}"
        id="medias-sort-select" 
        class="dropdown">
        <button
          aria-expanded="false"
          aria-labelledby="dropdown-selected-choice"
          aria-controls="medias-sort-choices"
          class="dropdown__cta"
          id="medias-sort-choice"
          type="button"
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
          <li 
            role="radio"
            id="sort-by-${sortType.key}"
            ${sortType === this.sortBy ? 'aria-hidden="true" aria-selected="true" aria-checked="true"' : 'aria-selected="false" aria-checked="false"'}>
            <button class="dropdown__cta" id="btn-sort-by-${sortType.key}">${sortType.name}</button>
          </li>`).join('')}
        </ul>
      </div>
    `;

    // Events handling
    this.wrapper.querySelector('#medias-sort-choice') // Dropdown button
      .addEventListener('click', () => this.toggleDropdown());

    this.wrapper.addEventListener('focusout', (e) => this.handleFocusout(e));

    this.wrapper.addEventListener('keydown', (e) => this.handleKeydown(e));

    this.wrapper.querySelectorAll('.dropdown__menu .dropdown__cta') // Menu item
      .forEach((sortItem) => sortItem.addEventListener('click', () => this.handleMenuItemClick(sortItem)));

    return this.wrapper;
  }
}

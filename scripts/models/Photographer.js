export default class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
    this.medias = [];
    this.sortMediasBy = 'likes';
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getCity() {
    return this.city;
  }

  getCountry() {
    return this.country;
  }

  getTagline() {
    return this.tagline;
  }

  getPrice() {
    return this.price;
  }

  getPortrait() {
    return `/fisheye/assets/images/photographers/${this.id}/min-${this.portrait}`;
  }

  getLikesCount() {
    return this.medias.map((media) => media.getLikes()).reduce((a, b) => a + b);
  }

  getMedias() {
    const mediaSorted = [...this.medias]
      .sort((a, b) => {
        let sortValue;
        if (this.sortMediasBy === 'likes') {
          sortValue = a.getLikes() - b.getLikes();
        } else if (this.sortMediasBy === 'date') {
          sortValue = a.getDate() > b.getDate();
        } else if (this.sortMediasBy === 'title') {
          sortValue = a.getTitle().localeCompare(b.getTitle());
        } else {
          throw 'Unkown sort type';
        }
        return sortValue;
      });
    return mediaSorted;
  }

  getNextMedia(media) {
    const medias = this.getMedias();
    const currentMediaIndex = medias.indexOf(media);
    return medias[currentMediaIndex + 1];
  }

  getPreviousMedia(media) {
    const medias = this.getMedias();
    const currentMediaIndex = medias.indexOf(media);
    return medias[currentMediaIndex - 1];
  }

  isMediaFirstInMedias(media) {
    return this.getMedias().indexOf(media) === 0;
  }

  isMediaLastInMedias(media) {
    const medias = this.getMedias();
    return medias.indexOf(media) === medias.length - 1;
  }

  setMedias(medias) {
    this.medias = medias;
  }

  setSortMediasBy(sortby) {
    this.sortMediasBy = sortby;
  }
}

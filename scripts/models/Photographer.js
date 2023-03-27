export default class Photographer {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
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
    return `/assets/images/photographers/${this.id}/${this.portrait}`;
  }

  getLikeCount() {
    return 200000; // To dev
  }
}

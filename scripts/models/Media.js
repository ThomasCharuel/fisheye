export default class Media {
  constructor(data) {
    this.date = data.date;
    this.id = data.id;
    this.likes = data.likes;
    this.photographerId = data.photographerId;
    this.price = data.price;
    this.title = data.title;
  }

  getDate() {
    return this.date;
  }

  getId() {
    return this.id;
  }

  getLikes() {
    return this.likes;
  }

  getPhotographerId() {
    return this.photographerId;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.title;
  }
}

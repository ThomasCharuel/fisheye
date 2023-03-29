export default class Media {
  constructor(data) {
    this.date = data.date;
    this.id = data.id;
    this.likes = data.likes;
    this.photographerId = data.photographerId;
    this.price = data.price;
    this.title = data.title;
    this.hasUserLiked = false;
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

  setLikes(likes) {
    this.likes = likes;
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

  getHasUserLiked() {
    return this.hasUserLiked;
  }

  toggleHasUserLiked() {
    if (this.hasUserLiked) {
      this.setLikes(this.getLikes() - 1);
    } else {
      this.setLikes(this.getLikes() + 1);
    }
    this.hasUserLiked = !this.hasUserLiked;
  }
}

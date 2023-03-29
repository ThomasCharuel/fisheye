import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';
import MediaCard from '../templates/MediaCard.js';

export default function createMedia(data) {
  let media;

  if (Object.prototype.hasOwnProperty.call(data, 'image')) {
    media = new ImageMedia(data);
  } else if (Object.prototype.hasOwnProperty.call(data, 'video')) {
    media = new VideoMedia(data);
  } else {
    throw 'Unknown type format';
  }

  media.getCardHTML = () => new MediaCard(media).getHTML();

  media.setLikeButtonCSSClass = () => {
    const likeButton = document.querySelector(`#media-card-${media.getId()} .like-btn`);
    if (media.getHasUserLike()) {
      likeButton.classList.add('btn-liked');
    } else {
      likeButton.classList.remove('btn-liked');
    }
  };

  media.handleClickLikeButton = () => {
    media.toggleUserLike();
    media.setLikeButtonCSSClass();
  };

  return media;
}

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

  media.createCard = (updateLikesCount) => new MediaCard(media, updateLikesCount).create();

  return media;
}

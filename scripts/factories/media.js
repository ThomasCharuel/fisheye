import ImageMedia from '../models/ImageMedia.js';
import VideoMedia from '../models/VideoMedia.js';
import MediaCard from '../templates/MediaCard.js';

export default function createMedia(data) {
  let media;

  if (data.image) {
    media = new ImageMedia(data);
  } else if (data.video) {
    media = new VideoMedia(data);
  } else {
    throw 'Unknown type format';
  }

  media.createCard = (openLightboxModal, updateLikesCount) => (
    new MediaCard(media, openLightboxModal, updateLikesCount).create());

  return media;
}

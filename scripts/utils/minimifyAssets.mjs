import fs from 'fs';
import path from 'path';

import Jimp from 'jimp';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';

import JPEG from 'jpeg-js';

Jimp.decoders['image/jpeg'] = (data) => JPEG.decode(data, { maxMemoryUsageInMB: 1024 });

const JIMP_QUALITY = 70;
const RESIZE_WIDTH = 600;

const imagesFolder = './assets/images/photographers';
const tempFolder = './temp';

// Backup compression with Jimp if Imagemin is unable to compress
function JimpCompress(filepath, destination) {
  Jimp.read(filepath, (err, image) => {
    if (err) throw err;
    image.quality(JIMP_QUALITY).write(destination);
  });
}

// Main compression with imagemin
async function compress(filepath, altDest) {
  try {
    await imagemin([filepath], {
      destination: path.dirname(altDest),
      plugins: [imageminJpegtran()],
    });
  } catch (e) {
    if (e.exitCode === 99) {
      console.log(`Reprocessing image with JIMP instead ${filepath}`);
      JimpCompress(filepath, altDest);
    }
  }
}

async function minimifyImage(filepath) {
  const fileName = path.basename(filepath);
  const filePath = path.dirname(filepath);

  const tempPath = `${tempFolder}/min-${fileName}`;
  const outputPath = `${filePath}/min-${fileName}`;

  // Resize then compress image
  await Jimp.read(filepath, (err, image) => {
    if (err) throw err;
    image.resize(RESIZE_WIDTH, Jimp.AUTO)
      .writeAsync(tempPath)
      .then(async () => compress(tempPath, outputPath));
  });
}

[82, 195, 243, 527, 925, 930].forEach((photographerId) => {
  fs.readdirSync(`${imagesFolder}/${photographerId}`)
    .forEach((f) => {
      if (f.endsWith('.jpg')) {
        minimifyImage(`${imagesFolder}/${photographerId}/${f}`);
      }
      if (f === 'medias') {
        fs.readdirSync(`${imagesFolder}/${photographerId}/medias`)
          .forEach((f2) => {
            if (f2.endsWith('.jpg')) {
              minimifyImage(`${imagesFolder}/${photographerId}/medias/${f2}`);
            }
          });
      }
    });
});

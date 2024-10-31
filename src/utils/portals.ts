async function calculateImageDimensions(media: { id: string; url: string }) {
  const key = media.id;

  const img = new Image();
  img.src = media.url;

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const ratio = img.width / img.height;

  let width = Math.max(Math.min(img.width, window.innerHeight - 64), window.innerHeight / 1.5, 256);
  let height = width / ratio;

  if (ratio < 1) {
    height = Math.max(Math.min(img.width, window.innerHeight - 64), window.innerHeight / 1.5, 256);
    width = height * ratio;
  }

  return { media, key, width, height };
}

/**
 * Could be usefull but not used in the current codebase
 */
// async function calculateVideoDimensions(media: { id: string; url: string }) {
//   const key = media.id;

//   const video = document.createElement('video');

//   video.src = media.url;

//   const promise = new Promise((resolve) => {
//     video.onloadedmetadata = resolve;
//   });

//   video.load();

//   await promise;

//   const ratio = video.videoWidth / video.videoHeight;

//   let width = Math.max(
//     Math.min(video.videoWidth, window.innerHeight - 64),
//     window.innerHeight / 1.5,
//     256
//   );
//   let height = width / ratio;

//   if (ratio < 1) {
//     height = Math.max(
//       Math.min(video.videoWidth, window.innerHeight - 64),
//       window.innerHeight / 1.5,
//       256
//     );
//     width = height * ratio;
//   }

//   return { media, key, width, height };
// }

export { calculateImageDimensions };

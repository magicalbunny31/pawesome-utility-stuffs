import createStreamFromUrl from "./createStreamFromUrl.js";


/**
 * @param {string[]} urls
 * @param {string} userAgent
 * @returns {Promise<(import("file-type").AnyWebReadableByteStreamWithFileType | undefined)[]>}
 */
export default async (urls, userAgent) => {
   // stream each url in the urls list
   const mediaToStream = urls.map(async url =>
      await createStreamFromUrl(url, userAgent)
   );


   // wait for these streams to start
   const streamedMedia = await Promise.allSettled(mediaToStream);


   // return the streams of the urls, or `undefined` if a stream failed for some reason (media.value itself may also be `undefined`)
   return streamedMedia.map(media =>
      media.status === `fulfilled`
         ? media.value
         : undefined
   );
};
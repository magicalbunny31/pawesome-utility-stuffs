import { fileTypeStream } from "file-type";


/**
 * @param {string} url
 * @param {string} userAgent
 * @returns {Promise<import("file-type").AnyWebReadableByteStreamWithFileType | undefined>}
 */
export default async (url, userAgent) => {
   // start streaming this url, awaiting the first chunk of data so it an be passed to fileTypeStream
   const request = await fetch(url, {
      headers: {
         "User-Agent": userAgent
      }
   });


   // the request wasn't ok
   if (!request.ok)
      return;


   // pass the body (containing the first chunk of data) for fileTypeStream to determine the file type
   const streamWithFileType = await fileTypeStream(request.body);


   // return the stream containing the file type (if it was able to determine it)
   return streamWithFileType;
};
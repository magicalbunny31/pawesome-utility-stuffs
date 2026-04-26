import uploadFile from "./uploadFile.js";


/**
 * @param {import("@aws-sdk/client-s3").S3Client} client
 * @param {string} bucket
 * @param {{ key: string; data: import("@aws-sdk/lib-storage").BodyDataTypes; contentType: string; }[]} data
 * @returns {Promise<({ bucket: string; key: string; } | undefined)[]>}
 */
export default async (client, bucket, data) => {
   // start uploading these files
   const dataToUpload = data.map(async data =>
      await uploadFile(client, bucket, data.key, data.data, data.contentType)
   );


   // wait for these uploads to finish
   const uploadedData = await Promise.allSettled(dataToUpload);


   // return the keys of the uploaded data, or `undefined` if an upload failed for some reason
   return uploadedData.map(data =>
      data.status === `fulfilled`
         ? data.value
         : undefined
   );
};
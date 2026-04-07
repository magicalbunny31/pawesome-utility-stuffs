import { Upload } from "@aws-sdk/lib-storage";


/**
 * @param {import("@aws-sdk/client-s3").S3Client} client
 * @param {string} bucket
 * @param {string} key
 * @param {import("@aws-sdk/lib-storage").BodyDataTypes} data
 * @param {string} contentType
 * @returns {Promise<{ bucket: string; key: string; }>}
 */
export default async (client, bucket, key, data, contentType) => {
   // configure and start uploading this data
   const upload = new Upload({
      client,
      params: {
         Bucket: bucket,
         Key: key,
         Body: data,
         ContentType: contentType
      }
   });


   // wait for the upload to finish
   const uploadedData = await upload.done();


   // return the bucket and key of the uploaded data
   return {
      bucket: uploadedData.Bucket,
      key: uploadedData.Key
   };
};
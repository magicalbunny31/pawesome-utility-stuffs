import { ListObjectsV2Command } from "@aws-sdk/client-s3";


/**
 * @param {import("@aws-sdk/client-s3").S3Client} client
 * @param {string} bucket
 * @param {string} prefix
 * @returns {Promise<string[]>}
 */
export default async (client, bucket, prefix) => {
   // list objects that start with this prefix
   const listedObjects = await client.send(
      new ListObjectsV2Command({
         Bucket: bucket,
         Prefix: prefix
      })
   );


   // return the keys of the listed objects
   return listedObjects.Contents?.map(object => object.Key) ?? [];
};
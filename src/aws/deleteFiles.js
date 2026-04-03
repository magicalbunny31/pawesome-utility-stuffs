import { DeleteObjectsCommand } from "@aws-sdk/client-s3";


/**
 * @param {import("@aws-sdk/client-s3").S3Client} client
 * @param {string} bucket
 * @param {string[]} keys
 * @returns {Promise<string[]>}
 */
export default async (client, bucket, keys) => {
   // delete objects that are included within the lit of keys
   const deletedObjects = await client.send(
      new DeleteObjectsCommand({
         Bucket: bucket,
         Delete: {
            Objects: keys.map(keys => ({ Key: keys }))
         }
      })
   );


   // return the keys of the deleted objects
   return deletedObjects.Deleted.map(object => object.Key);
};
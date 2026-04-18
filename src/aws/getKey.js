import getKeys from "./getKeys.js";


/**
 * @param {import("@aws-sdk/client-s3").S3Client} client
 * @param {string} bucket
 * @param {string} prefix
 * @returns {Promise<string?>}
 */
export default async (client, bucket, prefix) => {
   // get keys
   const keys = await getKeys(client, bucket, prefix);


   // return the first key of the keys
   return keys[0];
};
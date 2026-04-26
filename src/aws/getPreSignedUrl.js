import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


/**
 * @param {import("@aws-sdk/client-s3").S3Client} client
 * @param {string} bucket
 * @param {string} key
 * @param {number} expiresIn
 * @returns {Promise<string>}
 */
export default async (client, bucket, key, expiresIn) => {
   // get a pre-signed url
   const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key
   });

   const preSignedUrl = await getSignedUrl(client, command, { expiresIn });


   // return the pre-signed url
   return preSignedUrl;
};
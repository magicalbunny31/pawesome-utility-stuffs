import { S3Client } from "@aws-sdk/client-s3";
import { BodyDataTypes } from "@aws-sdk/lib-storage";


/**
 * 🗑️ delete files from a bucket
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 which bucket to delete keys from
 * @param prefix 📝 the prefix that these keys should start with
 * @returns the keys of the files that were deleted
 */
export async function deleteFiles(client: S3Client, bucket: string, keys: string[]): Promise<string[]>;


/**
 * 🔗 format the public url of an uploaded file
 * @param subdomain 🌐 the public subdomain that this bucket points to
 * @param key 🏷️ the key of this file
 */
export function formatPublicUrl(subdomain: string, key: string): string;


/**
 * 📋 list keys from a bucket starting with this prefix
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 which bucket to check for these keys
 * @param prefix 📝 the prefix that these keys should start with
 */
export async function getKeys(client: S3Client, bucket: string, prefix: string): Promise<string[]>;


/**
 * 📤 upload a file
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 which bucket this file will be uploaded
 * @param key 🏷️ the key that this file will have
 * @param data 📦 data to upload; the mime type for this `data` will be set if the passed parameter is the stream returned from [`file-type`](https://github.com/sindresorhus/file-type)'s `fileTypeStream`
 * @returns 📄 the key of the file that was uploaded
 */
export async function uploadFile(client: S3Client, bucket: string, key: string, data: BodyDataTypes | import("file-type").AnyWebReadableByteStreamWithFileType): Promise<string>;


interface UploadFilesConfig {
   /**
    * 🏷️ the key that this file will have
    */
   key: string;

   /**
    * 📄 data to upload; the mime type for this `data` will be set if the passed parameter is the stream returned from [`file-type`](https://github.com/sindresorhus/file-type)'s `fileTypeStream`
    */
   data: BodyDataTypes | import("file-type").AnyWebReadableByteStreamWithFileType;
};

/**
 * 📤 upload files
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 which bucket this file will be uploaded
 * @param data 🗃️ list of data to upload
 * @returns 📄 the keys of the files that were uploaded, or `undefined` if it failed to upload
 */
export async function uploadFiles(client: S3Client, bucket: string, data: UploadFilesConfig[]): Promise<(string | undefined)[]>;
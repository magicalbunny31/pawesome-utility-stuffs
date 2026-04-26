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
 * 📋 get the first key from a bucket starting with this prefix
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 which bucket that this key is in
 * @param prefix 📝 the prefix that this key should start with, or `undefined` if no key was found
 */
export async function getKey(client: S3Client, bucket: string, prefix: string): Promise<string?>;


/**
 * 🔏 get a pre-signed url for an object in a private bucket
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 which bucket that this key is in
 * @param key 🏷️ the key of this file
 * @param expiresIn ⌚ number of seconds that this pre-signed url will be valid for
 */
export async function getPreSignedUrl(client: S3Client, bucket: string, key: string, expiresIn: number): Promise<string>;


/**
 * 📋 list keys from a bucket starting with this prefix
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 which bucket that this key is in
 * @param prefix 📝 the prefix that these keys should start with
 */
export async function getKeys(client: S3Client, bucket: string, prefix: string): Promise<string[]>;


interface UploadedFile {
   /**
    * 🪣 the bucket that this file was uploaded to
    */
   bucket: string;

   /**
    * 🏷️ the key that this file has
    */
   key: string;
};

/**
 * 📤 upload a file
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 the bucket to upload this file to
 * @param key 🏷️ the key that this file will have
 * @param data 📦 data to upload
 * @param contentType ❔ content type for this data
 * @returns 📄 the bucket and key of this uploaded file
 */
export async function uploadFile(client: S3Client, bucket: string, key: string, data: BodyDataTypes, contentType: string): Promise<UploadedFile>;


interface UploadFilesConfig {
   /**
    * 🏷️ the key that this file will have
    */
   key: string;

   /**
    * 📄 data to upload
    */
   data: BodyDataTypes;


   /**
    * ❔ content type for this data
    */
   contentType: string;
};

/**
 * 📤 upload multiple files
 * @param client 🗝️ s3 client to use
 * @param bucket 🪣 the bucket to upload these files to
 * @param data 🗃️ list of data to upload
 * @returns 📄 the bucket and keys of these uploaded files, or `undefined` if it failed to upload
 */
export async function uploadFiles(client: S3Client, bucket: string, data: UploadFilesConfig[]): Promise<(UploadedFile | undefined)[]>;
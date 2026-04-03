import { AnyWebReadableByteStreamWithFileType } from "file-type";


/**
 * 🌐 create a stream from a url that optionally contains the file type of the stream's file
 * @param url 🔗 url to stream
 * @param userAgent 👤 user agent to set for this request
 * @returns ‼️ the `fileType` property may be `undefined` if the library was unable to determine the file type of the stream
 */
export async function createStreamFromUrl(url: string, userAgent: string): Promise<AnyWebReadableByteStreamWithFileType>;
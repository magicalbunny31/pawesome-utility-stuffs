import { AnyWebReadableByteStreamWithFileType } from "file-type";


/**
 * 🌐 create a stream from a url that optionally contains the file type of the stream's file
 * @param url 🔗 url to stream
 * @param userAgent 👤 user agent to set for this request
 * @returns
 * 🧵 the stream of this url, or `undefined` if the response wasn't ok
 *
 * ‼️ the `fileType` property may be `undefined` if the library was unable to determine the file type of the stream
 */
export async function createStreamFromUrl(url: string, userAgent: string): Promise<AnyWebReadableByteStreamWithFileType?>;


/**
 * 🌐 create streams from urls that each optionally contains the file type of the stream's file
 * @param urls 🔗 urls to stream
 * @param userAgent 👤 user agent to set for this request
 * @returns
 * 🧵 the streams of these urls, or `undefined` if the response wasn't ok
 *
 * ‼️ the `fileType` property may be `undefined` if the library was unable to determine the file type of the stream
 */
export async function createStreamsFromUrls(urls: string[], userAgent: string): Promise<(AnyWebReadableByteStreamWithFileType | undefined)[]>;
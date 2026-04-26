/**
 * @template T
 * @param {T} func
 * @returns {Promise<T>?}
 */
export default async func => {
   try {
      return await func;
   } catch {
      return undefined;
   };
};
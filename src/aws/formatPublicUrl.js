/**
 * @param {string} subdomain
 * @param {string} key
 * @returns {string}
 */
export default (subdomain, key) => {
   return `https://${subdomain}.cdn.nuzzles.dev/${key}`;
};
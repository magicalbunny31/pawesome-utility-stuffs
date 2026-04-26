/**
 * @param {string} name
 * @param {string} version
 * @param {string} homepage
 * @param {string} email
 * @returns {string}
 */
export default (name, version, homepage, email) =>
   `${name}/${version} (Node.js/${process.version}; ${process.platform}; ${process.arch}; +${homepage}; contact:${email})`;
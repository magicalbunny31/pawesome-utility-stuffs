/**
 * @param {string} name
 * @param {string} version
 * @param {string} homepage
 * @param {string} email
 * @returns {string}
 */
export default (name, version, homepage, email) =>
   `${name}/${version} (Cloudflare-Workers; workerd/${globalThis.navigator?.userAgentData?.brands?.[0]?.version ?? `latest`}; +${homepage}; contact:${email})`;
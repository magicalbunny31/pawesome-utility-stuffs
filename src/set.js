/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export default array => [ ...new Set(array) ];
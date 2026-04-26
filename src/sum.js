/**
 * @template T
 * @param {T[]} array
 * @param {any} [initialValue=0]
 * @returns {T}
 */
export default (array, initialValue = 0) => array.reduce((accumulator, current) => accumulator + current, initialValue);
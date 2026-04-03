/**
 * @template T
 * @param {number} length
 * @param {(value?: T, index?: number) => T} func
 * @returns {T[]}
 */
export default (length, func) => Array.from({ length }, func);
/**
 * @param {TemplateStringsArray | string[]} strings
 * @param {any[]} values
 * @returns {string}
 */
export default (strings, ...values) =>
   strings
      .reduce((acc, str, i) => `${acc}${values[i - 1]}${str}`)
      .trim()
      .split(`\n`)
      .map(string => string.trim())
      .join(`\n`);
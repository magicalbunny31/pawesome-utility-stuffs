/**
 * @param {number} delay
 * @returns {Promise<void>}
 */
export default delay => new Promise(resolve => {
   setTimeout(resolve, delay);
});
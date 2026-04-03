import shuffle from "./shuffle.js";


/**
 * @template T
 * @param {T[]} array
 * @param {number} [choices=1]
 * @returns {T | T[]}
 */
export default (array, choices = 1) => {
   // randomise array element order
   const shuffledArray = shuffle(array);

   // return elements
   if (choices === 1)
      return shuffledArray[0];
   else
      return shuffledArray.slice(0, choices);
};
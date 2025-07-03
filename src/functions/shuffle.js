/**
 * the previous shuffle() function actually sorted the array in-place and returned a reference, so here we'll also do the same
 */


module.exports = array => {
   // imports
   const { number } = require("../../");


   // use a count-based loop to decrease from the array's length to 0
   for (let i = array.length - 1; i > 0; i --) {
      const randomIndex = number(0, i);
      [ array[i], array[randomIndex] ] = [ array[randomIndex], array[i] ]; // swap the elements in-place
   };


   // return a reference to the modified array
   return array;
};
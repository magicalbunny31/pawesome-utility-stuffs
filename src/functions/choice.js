module.exports = (array, choices = 1) => {
   // imports
   const { shuffle } = require("../../");

   // shuffle and return!
   return shuffle(array).slice(0, choices);
};
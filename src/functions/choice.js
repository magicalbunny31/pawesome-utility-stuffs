module.exports = (array, choices = 1) => {
   // imports
   const { shuffle } = require("../../");

   // randomise array element order
   const shuffledArray = shuffle(array);

   // return elements
   if (choices === 1)
      return shuffledArray[0];
   else
      return shuffledArray.slice(0, choices);
};
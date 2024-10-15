module.exports = (query, targets, settings = {}) => {
   // function to compare two strings
   const compareStrings = (query, target) => {
      // get rid of whitespace characters
      query  = query .replace(/\s+/g, ``);
      target = target.replace(/\s+/g, ``);

      // strings are identical
      if (query === target)
         return 1;

      // one of the strings are empty or one character long
      if (query.length <= 1 || target.length <= 1)
         return 0;

      // so i don't know what actually happens after this point
      // but i rewrote it to make it look nice ✨
      const bigrams = new Map();

      for (let i = 0; i < query.length - 1; i ++) {
         const bigram = query.slice(i, i + 2);

         const count = bigrams.has(bigram)
            ? bigrams.get(bigram) + 1
            : 1;

         bigrams.set(bigram, count);
      };

      let intersectionSize = 0;

      for (let i = 0; i < target.length - 1; i ++) {
         const bigram = target.slice(i, i + 2);

         const count = bigrams.has(bigram)
            ? bigrams.get(bigram)
            : 0;

         if (count > 0) {
            bigrams.set(bigram, count - 1);
            intersectionSize ++;
         };
      };

      return (2 * intersectionSize) / (query.length + target.length - 2);
   };


   // results array
   const results = targets
      .filter(element => {
         // the target to use
         const target = settings.key
            ? element[settings.key]
            : element;

         // check if this target is included in the query
         return target.toLowerCase().includes(query.toLowerCase());
      })
      .map(element => {
         // the target to use
         const target = settings.key
            ? element[settings.key]
            : element;

         // get a score of those matches
         const score = compareStrings(query, target);

         // map these scores
         return {
            score,
            [settings.key ? `object` : `target`]: element
         };
      })
      .sort((resultA, resultB) => resultB.score - resultA.score);


   // return these results
   return settings.limit
      ? results.slice(0, settings.limit) // if a limit was specified, slice the results array
      : results;
};
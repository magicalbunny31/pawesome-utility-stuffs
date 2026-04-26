/**
 * 📄 portions of this script are used under the "MIT License" ~
 * 🔗 https://github.com/aceakash/string-similarity
 * --------------------------------------------------------------
 * MIT License
 *
 * Copyright (c) 2018 Akash Kurdekar
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


/**
 * @template T
 * @param {string} query
 * @param {(string | T)[]} targets
 * @param {{ key?: T; limit?: number; minScore?: number; }} [settings={}]
 * @returns {{ score: number; target?: string; object?: T; }[]}
 */
export default (query, targets, settings = {}) => {
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
module.exports = async path => {
   // imports
   const { readFile } = require("node:fs/promises");


   // read this file and parse it as json
   const file = await readFile(path);
   const contents = file.toString();
   return JSON.parse(contents);


   /**
    * TODO
    * i want to maintain this package's backwards-compatible up to Node.js v20
    * since json modules are *only* supported for Node.js >=v22, i will keep the below until i decide to update~
    * https://nodejs.org/api/esm.html#json-modules
    */


   // try {
   //    // assume cjs, require the json as usual
   //    return require(path);

   // } catch (error) {
   //    // assume esm, import assertions are stable so the below is fine to use~
   //    const { default: json } = await import(path, {
   //       with: {
   //          type: `json`
   //       }
   //    });

   //    return json;
   // };
};
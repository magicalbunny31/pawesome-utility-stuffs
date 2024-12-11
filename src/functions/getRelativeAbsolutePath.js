module.exports = (...paths) => {
   /**
    * TODO
    * i want to maintain this package's backwards-compatible up to Node.js v20
    * since "node:util.getCallsites()" is *only* supported for Node.js >=v23, i will use the npm package "callsite" (https://www.npmjs.com/package/callsite) until i decide to update~
    * also, the mentioned method is still experimental, so it's best not to touch it until it becomes stable
    * https://nodejs.org/api/util.html#utilgetcallsitesframecountoroptions-options
    */


   // imports
   const { join } = require("node:path");
   const getCallSites = require("callsite");


   // get the directory of where this function was called and return the path from the arguments
   const callsites = getCallSites();
   const filename = callsites[1].getFileName();

   return join(filename, `..`, ...paths);
};
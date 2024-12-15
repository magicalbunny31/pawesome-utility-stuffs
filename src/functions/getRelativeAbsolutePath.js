module.exports = (...paths) => {
   /**
    * TODO
    * i want to maintain this package's backwards-compatible to Node.js v20
    * since "node:util.getCallsites()" is *only* supported for Node.js >=v23, i will use the npm package "callsite" (https://www.npmjs.com/package/callsite) until i decide to update~
    * also, the mentioned method is still experimental, so it's best not to touch it until it becomes stable
    * https://nodejs.org/api/util.html#utilgetcallsitesframecountoroptions-options
    */


   // imports
   const { join, sep } = require("node:path");
   const getCallSites = require("callsite");


   // get the directory of where this function was called and return the path from the arguments
   const callsites = getCallSites();
   const filename = callsites[1].getFileName();

   let joinedPath = join(filename, `..`, ...paths);

   if (process.platform !== `win32` && !joinedPath.startsWith(sep)) // (not windows) add the starting `/` if it doesn't already exist
      joinedPath = `/${joinedPath}`;

   if (!require.main || joinedPath.startsWith(`file:${sep}`)) // (esm) remove the `file:/` prefix from this uri
      joinedPath = decodeURIComponent(joinedPath.slice(6));

   return joinedPath;
};
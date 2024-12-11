module.exports = (...paths) => {
   // imports
   const { join } = require("node:path");
   const getCallSites = require("callsite"); // TODO: watch https://nodejs.org/api/util.html#utilgetcallsitesframecountoroptions-options - when it is released to stable, use this instead of the `callsite` dependency


   // get the directory of where this function was called and return the path from the arguments
   const callsites = getCallSites();
   const filename = callsites[1].getFileName();

   return join(filename, `..`, ...paths);
};
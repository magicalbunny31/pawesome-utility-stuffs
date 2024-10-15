module.exports = async promise => {
   try {
      return await promise;
   } catch {
      return undefined;
   };
};
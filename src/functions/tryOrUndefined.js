module.exports = async func => {
   try {
      return await func;
   } catch {
      return undefined;
   };
};
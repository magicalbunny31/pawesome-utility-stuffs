/**
 * @param {import("@google-cloud/firestore").DocumentReference} docRef
 * @returns {Promise<any>}
 */
export default async docRef => {
   // fetch this document
   const docSnap = await docRef.get();

   if (!docSnap.exists) // this document doesn't exist
      return {};


   // get and return the data
   const data = {
      id: docSnap.id,
      data: docSnap.data()
   };

   return data;
};
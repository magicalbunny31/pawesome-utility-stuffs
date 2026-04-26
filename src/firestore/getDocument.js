/**
 * @param {import("@google-cloud/firestore").DocumentReference} docRef
 * @returns {Promise<import("@google-cloud/firestore").DocumentSnapshot>}
 */
export default async docRef => {
   // fetch this document
   const docSnap = await docRef.get();

   if (!docSnap.exists) // this document doesn't exist
      return;


   // get and return the data
   return docSnap;
};
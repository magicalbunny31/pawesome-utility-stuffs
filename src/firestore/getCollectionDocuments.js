/**
 * @param {import("@google-cloud/firestore").CollectionReference | import("@google-cloud/firestore").Query} collectionRef
 * @returns {Promise<import("@google-cloud/firestore").QueryDocumentSnapshot[]>}
 */
export default async collectionRef => {
   // fetch this collection or collection query
   const snapshot = await collectionRef.get();

   if (snapshot.empty) // there's no documents in this collection
      return [];


   // get and return the data
   return snapshot.docs;
};
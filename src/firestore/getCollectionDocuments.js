/**
 * @param {import("@google-cloud/firestore").CollectionReference | import("@google-cloud/firestore").Query} collectionRef
 */
export default async collectionRef => {
   // fetch this collection or collection query
   const snapshot = await collectionRef.get();

   if (snapshot.empty) // there's no documents in this collection
      return [];


   // get and return the data
   const data = snapshot.docs.map(docSnap =>
      ({
         id: docSnap.id,
         data: docSnap.data()
      })
   );

   return data;
};
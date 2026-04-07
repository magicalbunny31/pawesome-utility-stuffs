import { CollectionReference, DocumentReference, DocumentSnapshot, Query, QueryDocumentSnapshot } from "@google-cloud/firestore";



/**
 * 📄 get a document's data
 * @param docRef 🏷️ document reference to get
 * @returns 📦 the document data and its id - will be an empty object if this document doesn't exist
 */
export async function getDocument(docRef: DocumentReference): Promise<DocumentSnapshot?>;


/**
 * 🗃️ get a collection's document's data
 * @param collectionRef 🏷️ collection reference (or query) to get
 * @returns 📦 a list of the documents with their ids - will be empty if there's no documents that fit the query
 */
export async function getCollectionDocuments(collectionRef: CollectionReference | Query): Promise<QueryDocumentSnapshot[]>;
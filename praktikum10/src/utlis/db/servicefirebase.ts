import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { app } from "./firebase";


const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
    try {
        const snapshot = await getDocs(collection(db, collectionName));
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(`Successfully retrieved ${data.length} products from ${collectionName}`);
        return data;
    } catch (error) {
        console.error(`Error retrieving products from ${collectionName}:`, error);
        throw error;
    }
}

export async function retrieveDataByID(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    
    if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
    } else {
        throw new Error(`Document with ID ${id} not found in collection ${collectionName}`);
    }
}
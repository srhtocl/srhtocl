import { postCollectionRef } from "./firebase";

import { doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs} from "firebase/firestore/lite";




async function getAllDocuments() {

    let docs = [];

    try {

        const querySnapshot = await getDocs(postCollectionRef);

        querySnapshot.forEach((doc) => { docs.push(doc.data()); });
    
    } 
    
    catch (error) { console.error("hata: ", error); }
    
    finally { return docs; }

}
async function getAllDocumentsIds() {

    let docIds = [];

    try {

        const querySnapshot = await getDocs(postCollectionRef);

        querySnapshot.forEach((doc) => {

            docIds.push(doc.id);

        });

    } catch (error) {

        console.error("hata: ", error);

    } finally {

        return docIds;

    }

}


// insert a document to message collection

async function insertDocument(data) {

    let docId = null;

    try {

        const docRef = await addDoc(postCollectionRef, data);

        docId = docRef.id;

    } catch (error) {

        return error.message;

    } finally { return docId; }
}


async function updateDocument(docId, data) {

    var response = false;

    try {

        const docRef = doc(postCollectionRef, docId);

        response = await updateDoc(docRef, data);

    } catch (error) {

        response = error.message;

    } finally { return response; }
}


async function deleteDocument(docId) {

    var response = null;

    try {

        const docRef = doc(postCollectionRef, docId);

        response = await deleteDoc(docRef);

    } catch (error) {

        response = error.message;

    } finally { return response; }
}


async function getDocumentById(docId) {

    var response = null;

    try {

        const docRef = doc(postCollectionRef, docId);

        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) { response = docSnapshot.data(); }

        else { response = null; }

    } catch (error) {

        response = error.message;

    } finally { return response; }
}

export {

    getDocumentById, // get a document from post collection

    getAllDocuments, // get all documents from post collection

    getAllDocumentsIds, // get all documents ids from post collection

    insertDocument, // insert a document to post collection

    updateDocument, // update a document in post collection

    deleteDocument, // delete a document from post collection

};
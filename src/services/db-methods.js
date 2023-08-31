import { collectionRef } from "./firebase";

import { doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, setDoc, query, where } from "firebase/firestore/lite";

// Get all documents ids from message collection

async function getAllDocumentsIds() {

    let docIds = [];

    try {

        const querySnapshot = await getDocs(collectionRef);

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

        const docRef = await addDoc(collectionRef, data);

        docId = docRef.id;

    } catch (error) {

        return error.message;

    } finally { return docId; }
}


async function updateDocument(docId, data) {

    var response = false;

    try {

        const docRef = doc(collectionRef, docId);

        response = await updateDoc(docRef, data);

    } catch (error) {

        response = error.message;

    } finally { return response; }
}


async function deleteDocument(docId) {

    var response = null;

    try {

        const docRef = doc(collectionRef, docId);

        response = await deleteDoc(docRef);

    } catch (error) {

        response = error.message;

    } finally { return response; }
}


async function getDocumentById(docId) {

    var response = null;

    try {

        const docRef = doc(collectionRef, docId);

        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) { response = docSnapshot.data(); }

        else { response = null; }

    } catch (error) {

        response = error.message;

    } finally { return response; }
}


async function getDocumentsByUsername(user) {

    try {

        var documents = [];

        if (!user) throw new Error("user is undefined");

        const querySnapshot = await getDocs(query(collectionRef, where("user", "==", user)));

        querySnapshot.forEach((doc) => { documents.push(doc); });

        if (documents.length === 0) throw new Error("user not foundddd");

        return documents[0];

    } catch (error) { return error; }
}


async function setDocument(user, payload) {

    await getDocumentsByUsername(user)

        .then(async (documents) => {

            await setDoc(doc(collectionRef, documents.id), payload)
            
            .catch(error => error);

        }).catch(error => error);
}



export {

    getDocumentById, // get a document from message collection

    getDocumentsByUsername, // get documents by username from message collection

    getAllDocumentsIds, // get all documents ids from message collection

    setDocument, // replace a document in message collection

    insertDocument, // insert a document to message collection

    updateDocument, // update a document in message collection

    deleteDocument, // delete a document from message collection

};
import {collectionRef} from "./model"

import { getDocs } from "firebase/firestore/lite";

async function getAllDocumentsIds() {

    console.log(collectionRef)

    const documentIds = [];

    // Koleksiyondaki tüm belgeleri sorguluyoruz
    collectionRef.get()

        .then((querySnapshot) => {

            // QuerySnapshot içindeki belgeleri dolaşıyoruz
            querySnapshot.forEach((doc) => {

                // Belgenin ID'sine erişiyoruz
                documentIds.push(doc.id);

                console.log("Belge ID:", documentIds);

            });

        }).catch((error) => {

            console.error("Belge ID'leri alınırken hata oluştu:", error);

        }).finally(() => { return documentIds; });

}

export { getAllDocumentsIds };




------ 17.07.2023 2045 -----

import { collectionRef } from "./model";

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



async function getDocumentsByUsername(user, isdata) {

    const documents = [];

    try {

        const querySnapshot = await getDocs(query(collectionRef, where("user", "==", user)));

        if (!isdata) {

            querySnapshot.forEach((doc) => { documents.push(doc.data()); });

        } else {

            querySnapshot.forEach((doc) => { documents.push(doc); });

        }

        if (documents.length === 0) { throw new Error("dosya bulunamadı"); }

    } catch (error) {

        return error;

    } finally {

        return documents;

    }

}


async function setDocument(user, payload) {
    
    try {

        // get documents by username for document reference
        const documents = await getDocumentsByUsername(user, true);

        if (documents.length === 0) { throw new Error("Kullanıcıya ait belge bulunamadı"); }

        // document reference
        const docRef = doc(collectionRef, documents[0].id);

        console.group();
        console.log("payload:", payload);
        console.log("docRef:", docRef);
        console.log("docId:", documents[0].id);
        console.groupEnd();

        await setDoc(docRef, payload);

    } catch (error) {

        console.error("Hata:", error.message);

        throw error;
    }
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



----------------------


/*
    // componentDidMount metodu
    componentDidMount = async () => {
        
        try {

            const user = document.cookie.split('=')[1];

            const resDoc = await getDocumentsByUsername(user);

            console.log("resDoc from getDocumentsByUsername(): ", resDoc);

            this.setState({ user: resDoc.data().user, messages: [...resDoc.data().messages] });

            console.log("state from getDocumentsByUsername(): ", this.state);

        } catch (error) {

            console.log("Hata:", error.message);



            // Yeni bir kullanıcı oluştur

            try {

                const response = await insertDocument({ user: this.state.user, messages: this.state.messages });

                console.log("response from insertDocument(): ", response);

                // Yeni kullanıcı için bir cookie oluştur

                let date = (new Date((new Date().setDate((new Date()).getDate() + 7)))).toUTCString();

                document.cookie = `user=${this.state.user}; Expires=Thu, ${date}`;

            } catch (error) {

                console.log("Hata:", error.message);

            }

        }

    };


    *************************************

    HANDLESUBMİT


        handleSubmit = async (event) => {

        event.preventDefault();

        if (this.state.draft !== "") {

            this.state.messages.push({ user: this.state.user, time: (new Date()).getTime(), data: this.state.draft });

            this.setState({ draft: "" });

            await setDocument(this.state.user, { messages: this.state.messages })

                .catch(error => console.log(console.error(error)))
        }
    }



    ssssssssssssssssssssssssssssssssssssssssssssssss


    

    componentDidMount = async () => {

        try {

            const cookie = document.cookie.split('=')[1];

            const userDoc = await getDocumentsByUsername(cookie);

            if (userDoc.exists) { this.setState({ user: userDoc.data().user, messages: [...userDoc.data().messages] }); }
            

            if (cookie === undefined) {

                let date = (new Date((new Date().setDate((new Date()).getDate() + 7)))).toUTCString();

                document.cookie = `user=${this.state.user}; Expires=Thu, ${date}`;

                await insertDocument({ user: this.state.user, messages: this.state.messages })

                    .then((response) => {

                        console.log("response from insertDocument(): ", response);

                    }).catch(error => { console.log(error.messages) })
            }

            await this.getMessages();

        } catch (error) {

            console.log(error);
        }




/*
        
        const cookie = document.cookie.split('=')[1];

        await getDocumentsByUsername(cookie)

            .then((resDoc) => {

                console.log(cookie);
                
                this.setState({ user: resDoc.data().user, messages: [...resDoc.data()[0].messages] });

                console.log("resDoc from getDocumentsByUsername(): ", resDoc);

                console.log("state from getDocumentsByUsername(): ", this.state);
            
            })

            .catch(async () => {
                
                await insertDocument({ user: this.state.user, messages: this.state.messages })
                
                .then((response) => {
                    
                    let date = (new Date((new Date().setDate((new Date()).getDate() + 7)))).toUTCString();

                    document.cookie = `user=${this.state.user}; Expires=Thu, ${date}`;

                    console.log("response from insertDocument(): ", response);

                }).catch(error => { console.log(error.messages) })
            })
*/
    }



    /////////////////


    
async function getDocumentsByUsername(user) {

    console.log("user from getDocumentsByUsername: ", user)
    
    var documents = [];
    
    try {
    
        const querySnapshot = await getDocs(query(collectionRef, where("user", "==", user)));
    
        querySnapshot.forEach((doc) => { documents.push(doc); });
    
        console.log("documents from getDocumentsByUsername:", documents[0]);
    
        return documents[0];
    
    } catch (error) { throw error; }
}





///// handleSubmit

    handleSubmit = async (event) => {

        event.preventDefault();

        if (this.state.draft !== "") {

            this.state.messages.push({ user: this.state.user, time: (new Date()).getTime(), data: this.state.draft });

            this.setState({ draft: "" });

            await setDocument(this.state.user, { messages: this.state.messages });
        }
    }


        handleSubmit = async (event) => {

        event.preventDefault();

        if (this.state.draft !== "") {

            this.setState({
                
                messages: [...this.state.messages].push({ user: this.state.user, time: (new Date()).getTime(), data: this.state.draft }),

                draft: ""
            });

            console.log(this.state);

            await setDocument(this.state.user, { messages: this.state.messages });
        }
    }




    ---------------------------------------------


    import React from "react";
import Cookies from "js-cookie";
import MessageField from "../components/message-field";
import { withRouter } from 'react-router-dom';
import { getDocumentsByUsername, insertDocument, setDocument } from "../services/methods";

class Response extends React.Component {

    constructor(props) {

        super(props);

        this.state = { draft: "", messages: [], user: (new Date()).getTime().toString(16) }

    }

    componentDidMount = async () => {
        
        this.setState({ user: this.props.user });

        Cookies.set('user', this.props.user, { expires: 7 })

        // Hali hazırda bir çerez yok ise

        if (!Cookies.get('user')) {

            Cookies.set('user', this.state.user, { expires: 7 })
            
            await insertDocument({ user: this.state.user, messages: this.state.messages })

        } else {

            this.setState({ user: Cookies.get('user') });

            await getDocumentsByUsername(Cookies.get('user'))

                .then((resDoc) => {

                    console.log(Cookies.get('user'), resDoc.data());

                    this.setState({ user: resDoc.data().user, messages: [...resDoc.data().messages] });

                })

        }

    }


    handleChange = (event) => { this.setState({ draft: event.target.value }); }

    handleSubmit = async (event) => {

        event.preventDefault();

        if (this.state.draft !== "") {

            this.state.messages.push({ user: "admin", time: (new Date()).getTime(), data: this.state.draft });

            this.setState({ draft: "" });

            await setDocument(this.state.user, { user: this.state.user,  messages: this.state.messages });
        }
    }

    render() {
        return (
            <div className="form-card">
                <MessageField messages={this.state.messages} />
                <form id="visitor" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.draft} placeholder="Birşeyler yaz ve gönder..." onChange={this.handleChange} ></input>
                    <div id="send-button" className="fas fa-paper-plane" onClick={this.handleSubmit}></div>
                </form>
            </div>
        );
    }
}


export default Response;




export default function Root() {

	return (
		<React.Fragment>

			<header id="header" className="flex justify-center bg-gray-100 border-b-2 00 fixed top-0 w-full">

				<nav className="flex justify-center w-full">

					<div className="flex justify-around w-full">

						<NavLink to="/" className="navlink"><FiHome className="react-fi-navlink" /></NavLink>


						<NavLink className="navlink" onClick={handleLogout}><FiLogOut className="react-fi-navlink" /></NavLink>

					</div>

				</nav>

			</header>


			{/* container mx-auto h-full flex flex-grow overflow-auto */}
			<main className="flex container h-full overflow-auto justify-center">
				<Outlet />
			</main>


			{/* flex justify-center bg-gray-100 border-t-2 00 fixed bottom-0 w-full */}

			<footer id="footer" className="flex justify-center bg-gray-100 border-t-2 00 fixed bottom-0 w-full">

				<nav className="flex justify-center w-full">

					<div className="flex justify-around w-full">

						<NavLink to="/" className="navlink"><FiHome className="react-fi-navlink" /></NavLink>
						{/*
						<NavLink to="/" className="navlink"><FiUser className="react-fi-navlink" /></NavLink>

						<NavLink to="/message" className="navlink"><FiSearch className="react-fi-navlink" /></NavLink>
					*/}
						<NavLink to="/message" className="navlink"><FiEdit className="react-fi-navlink" /></NavLink>

					</div>

				</nav>

			</footer>

		</React.Fragment>
	);
}


-------------------


import React from "react";
import { getAllDocumentsIds, getDocumentById } from "../services/db-methods";
import { Link } from "react-router-dom";

export default class AllMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount = async () => {
        getAllDocumentsIds("messages").then(async (result) => {
            result.forEach(async (element) => {
                await getDocumentById(element).then((data) => {
                    this.setState((state) => ({ messages: [...state.messages, data] }));
                });
            });
        });
    }

    render() {
        return (
            <div id="all-messages" className="flex-col w-full p-8 my-14 bg-white">
                <h1 className="text-3xl font-bold mb-4">All Messages</h1>
                <ul className="space-y-2 m-0 p-0">
                    {this.state.messages.map((message) => (
                        (message.messages[0] &&
                        <Link to={`/response/${message.user}`} key={message.user} className=" text-sm flex w-full px-2 py-4 bg-gray-500 text-white rounded-sm">
                            {message.messages[message.messages.length-1].data}
                        </Link>)
                    ))}
                </ul>
            </div>
        );
    }
}

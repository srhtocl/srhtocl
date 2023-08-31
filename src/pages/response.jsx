import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import MessageField from "../components/message-field";
import { getDocumentsByUsername, setDocument } from "../services/db-methods";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../context/auth-context";

function Response() {

    const navigate = useNavigate();
    
    const [draft, setDraft] = useState("");
    
    const [messages, setMessages] = useState([]);
    
    const [user, setUser] = useState((new Date()).getTime().toString(16));
    
    const { userid } = useParams();

    const authContext = useAuth();

    useEffect(() => {

        if (!authContext.user) { navigate("/"); }

        Cookies.set('user', userid, { expires: 7 });

        setUser(Cookies.get('user'));
        
        (async () => {

            const resDoc = await getDocumentsByUsername(Cookies.get('user'));

            const resData = resDoc.data();

            setMessages([...resData.messages]);
        
        })();
    
    }, []);

    const handleChange = (event) => {
        setDraft(event.target.value);
    };

    const handleSubmit = async (event) => {
        
        event.preventDefault();

        if (draft !== "") {
            
            const updatedMessages = [...messages, { user: "admin", time: (new Date()).getTime(), data: draft } ];
            
            setDraft("");
            
            setMessages(updatedMessages);
            
            await setDocument(user, { user: user, messages: updatedMessages });
        }
    };

    return (
        <div className="sr-layout">
            <MessageField messages={messages} />
            <form id="visitor" className="border-2" onSubmit={handleSubmit}>
                <input type="text" value={draft} placeholder="Birşeyler yaz ve gönder..." onChange={handleChange} />
                <div id="send-button" className="border-l-2 icon" onClick={handleSubmit}>
                    <FiSend size={24} />
                </div>
            </form>
        </div>
    );
}

export default Response;

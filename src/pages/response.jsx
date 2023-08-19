import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import MessageField from "../components/message-field";
import { getDocumentsByUsername, insertDocument, setDocument } from "../services/db-methods";

export default function Response(props) {

    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState((new Date()).getTime().toString(16));

    const { userid } = useParams();

    useEffect(() => {

        (async () => {

            setUser(userid);

            Cookies.set('user', userid, { expires: 7 })

            if (!Cookies.get('user')) {

                Cookies.set('user', user, { expires: 7 })

                await insertDocument({ user: user, messages: messages })

            } else {

                setUser(Cookies.get('user'));

                await getDocumentsByUsername(Cookies.get('user'))

                    .then((resDoc) => {

                        setUser(resDoc.data().user);

                        setMessages([...resDoc.data().messages]);

                    })

            }
        })();

    }, [messages, user, userid]);


    const handleChange = (event) => { setDraft(event.target.value); }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (draft !== "") {

            messages.push({ user: "admin", time: (new Date()).getTime(), data: draft });

            setDraft("");

            await setDocument(user, { user: user, messages: messages });
        }
    }

    return (

        <div className="form-card">

            <MessageField messages={messages} />

            <form id="visitor" onSubmit={handleSubmit}>

                <input type="text" value={draft} placeholder="Birşeyler yaz ve gönder..." onChange={handleChange} ></input>

                <div id="send-button" className="fas fa-paper-plane" onClick={handleSubmit}></div>

            </form>

        </div>

    );





}
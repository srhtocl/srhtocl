import React, { useEffect, useState } from "react";
import { getAllDocumentsIds, getDocumentById } from "../services/db-methods";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function AllMessage() {
    const [messages, setMessages] = useState([]);
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (!authContext.user) { navigate("/"); }

        (async () => {

            const result = await getAllDocumentsIds("messages");

            const messagePromises = result.map(async (element) => {
                const data = await getDocumentById(element);
                return data;
            });

            const messageData = await Promise.all(messagePromises);

            setMessages(messageData);
        })();

    }, []);

    return (
        <div className=" sr-layout flex-col w-full px-2 bg-white">
            {authContext.user ? (
                <ul className="space-y-2 m-0 p-0">
                    {messages.map((message) =>
                        message.messages[0] && (
                            <Link
                                
                                to={`/response/${message.user}`}
                                
                                key={message.user}
                                
                                className={ message.messages.at(-1).user === "admin" ?

                                    `text-sm flex w-full mt-2 px-2 py-4 rounded-sm text-white bg-green-500`
                                    :
                                    `text-sm flex w-full mt-2 px-2 py-4 rounded-sm text-white bg-blue-500`
                                }>
                                {message.messages.at(-1).data}
                            </Link>
                        )
                    )}
                </ul>) : (<p>Not Authorized</p>)
            }
        </div>
    );
}

export default AllMessage;

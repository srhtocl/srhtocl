import React, { useEffect, useState } from "react";
import { getAllDocumentsIds, getDocumentById } from "../services/db-methods";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function AllMessage() {
    const [messages, setMessages] = useState([]);
    const authContext = useAuth();

    useEffect(() => {

        
        if (!authContext.user) { throw new Error("Not Authorized"); }

        (async () => {
            const result = await getAllDocumentsIds("messages");
            const messagePromises = result.map(async (element) => {
                const data = await getDocumentById(element);
                return data;
            });
            const messageData = await Promise.all(messagePromises);
            setMessages(messageData);
        })();
    }, [authContext.user]);

    return (
        <div id="all-messages" className="flex-col w-full p-8 my-14 bg-white">
            <h1 className="text-3xl font-bold mb-4">All Messages</h1>
            {authContext.user ? (
            <ul className="space-y-2 m-0 p-0">
                {messages.map((message) =>
                    message.messages[0] && (
                        <Link
                            to={`/response/${message.user}`}
                            key={message.user}
                            className="text-sm flex w-full px-2 py-4 bg-gray-500 text-white rounded-sm"
                        >
                            {message.messages[message.messages.length - 1].data}
                        </Link>
                    )
                )}
            </ul>):(<p>Not Authorized</p>)}
        </div>
    );
}

export default AllMessage;

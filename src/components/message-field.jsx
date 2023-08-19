import React from "react";
import { useAuth } from "../context/auth-context";

function MessageField(props) {

    const authContext = useAuth();

    console.log(props.messages)


    return (
        <div id="message-field" className={authContext.user ? "my-16" : ""}>
            {

                !props.messages[0] ?

                    <div className="flex h-full justify-center items-center text-black text-center">
                        
                        <p className="text-xl mt-8 text-black antialiased">Mesajlar anonim olarak iletilir. Bu nedenle lütfen kendini tanıt.</p>
                        
                    </div>
                    
                    :

                    props.messages.map((msgObjs, index) => (

                        <div key={index} id={index} className={msgObjs.user !== props.messages[0]?.user ? "admin" : "user"}>

                            {msgObjs.data}

                        </div>
                    ))
            }
        </div>
    );
}

export default MessageField;

import React from "react";

function MessageField(props) {

    return (
        <div id="message-field">
            {

                !props.messages[0] ?

                    <div id="#wellcome">

                        <p className="my-8 text-black text-xs text-center">

                            Merhaba! Mesajlar anonim olarak iletilir ve tarama geçmişi temizlendiğinde silinir.

                        </p>

                    </div>

                    :

                    props.messages.map((msgObjs, index) => (

                        <div

                            key={index}

                            id={index}

                            className={msgObjs.user === "admin" ? "message admin" : "message user"}>

                            {msgObjs.data}

                        </div>
                    ))
            }
        </div>
    );
}

export default MessageField;

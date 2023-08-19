import React from "react";
import Cookies from "js-cookie";
import MessageField from "../components/message-field";
import { getDocumentsByUsername, insertDocument, setDocument } from "../services/db-methods";

export default class Message extends React.Component {

    constructor(props) {

        super(props);

        this.state = { draft: "", messages: [], user: (new Date()).getTime().toString(16) }

    }

    componentDidMount = async () => {

        // Hali hazırda bir çerez yok ise

        if (!Cookies.get('user')) {

            // user state değerini çereze ata

            Cookies.set('user', this.state.user, { expires: 7 })

            // yeni doküman oluştur

            await insertDocument({ user: this.state.user, messages: this.state.messages })

        } else {

            // çerezdeki değeri state'e ata

            this.setState({ user: Cookies.get('user') });

            // çerezin ömrünü uzat

            Cookies.set('user', Cookies.get('user'), { expires: 7 })

            // çerezdeki kullanıcı adına ait dokümanı getir

            await getDocumentsByUsername(Cookies.get('user'))

                .then((resDoc) => {

                    // doküman var ise state'i güncelle

                    this.setState({ user: resDoc.data().user, messages: [...resDoc.data().messages] });

                })

                .catch((err) => {

                    // doküman yok ise yeni doküman oluştur

                    insertDocument({ user: this.state.user, messages: this.state.messages })

                });

        }

    }


    handleChange = (event) => { this.setState({ draft: event.target.value }); }

    handleSubmit = async (event) => {

        event.preventDefault();

        if (this.state.draft !== "") {

            this.state.messages.push({ user: this.state.user, time: (new Date()).getTime(), data: this.state.draft });

            this.setState({ draft: "" });

            await setDocument(this.state.user, { user: this.state.user, messages: this.state.messages });
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
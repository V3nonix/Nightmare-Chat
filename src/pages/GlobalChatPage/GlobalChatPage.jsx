import { useState, useEffect} from "react";
import * as socket from "../../socket";
// Imports stylesheet(s):
import './GlobalChatPage.css';
// Imports Component(s):
import Header from "../../components/Header/Header";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesContainer from "../../components/MessagesContainer/MessagesContainer";

export default function GlobalChatPage({ user, alterUser, navigate }) {

    const [global, setGlobal] = useState(null);

    useEffect(() => {
        socket.registerSetGlobal(setGlobal);
        socket.enterGlobal();
        return () => {
            socket.exitGlobal();
        };
    }, []);

    return (
    <>
        <Header type={'Global'} alterUser={alterUser} navigate={navigate}/>
        <main className="chat-page" id='global'>
            <MessagesContainer global={global}/>
            <MessageInput user={user}/>
        </main>
    </>
    );
}


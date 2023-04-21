import { useState, useEffect } from "react";
import * as socket from "../../socket";
// Imports Component(s):
import Header from "../../components/Header/Header";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessagesContainer from "../../components/MessagesContainer/MessagesContainer";

export default function GlobalChatPage({ user, alterUser, navigate }) {

    const [global, setGlobal] = useState({ active: [], messages: []});

    useEffect(() => {
        socket.registerSetGlobal(setGlobal);
        if (user) {
            socket.connect();
            socket.enterGlobal();
        }
        return () => {
            socket.exitGlobal();
            socket.disconnect();
        };
    }, [user]);

    return (
    <>
        <Header type={'Global'} alterUser={alterUser} navigate={navigate}/>
        <main>
            <MessagesContainer messages={global.messages}/>
            <MessageInput sendGlobal={socket.sendGlobal} user={user}/>
        </main>
    </>
    );
}
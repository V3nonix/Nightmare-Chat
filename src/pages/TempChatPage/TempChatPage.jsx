// Imports stylesheet(s):
import './TempChatPage.css';
// Imports websocket:
import { socket } from '../../socket';
// Imports Users Utilities:


export default function TempChatPage() {
    // Websocket functions:
    function connect() {
        socket.connect();
    }
    function disconnect() {
        socket.disconnect();
    }
    // Event handler functions:

    // Rendered component:
    return (
        <main>
            <h1>TempChatPage</h1>
            <button onClick={ connect }>Connect</button>
            <button onClick={ disconnect }>Disconnect</button>
        </main>
    );
}
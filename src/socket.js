import { getToken } from './utilities/usersService';
import { io } from 'socket.io-client';
// Declares socket to
const socket = io({
    auth: {
        token: getToken()
    }
});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

socket.on("connect", () => {
    console.log(`Connected at ${socket.id}`);
});

// Initializes state setter to null:
let setGlobal = null;

// Registers state setter(s):
export function registerSetGlobal(fnct) {
    setGlobal = fnct;
}

/* Emits to server: */

// Enters public:
export function enterGlobal() {
    socket.emit('enter-global');
}

// Sends a message in public:
export function sendGlobal(msg) {
    socket.emit('send-global', {msg});
}

// Exits global (temp):
export function exitGlobal() {
    socket.emit('exit-global');
}

// Recieves from server:
socket.on('update-global', function(global) {
    setGlobal(global);
});


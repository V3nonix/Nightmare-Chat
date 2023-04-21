import { getToken } from './utilities/usersService';
import { io } from 'socket.io-client';
// Declares socket to
const socket = io({autoConnect: false});

// Socket connection:
export function connect() {
    console.log('Hit connect!');
    socket.connect();
}

export function disconnect() {
    console.log('Hit disconnect!');
    socket.disconnect();
}

// Initializes state setter to null:
let setGlobal = null;

// Registers state setter(s):
export function registerSetGlobal(fnct) {
    setGlobal = fnct;
}

/* Emits to server: */

// Enters public:
export function enterGlobal() {
    console.log('Hit enterGlobal!');
    socket.emit('enter-global', {
        token: getToken(),
    });
}

// Sends a message in public:
export function sendGlobal(msg) {
    socket.emit('send-global', {
        token: getToken(),
        msg
    });
}

// Exits global (temp):
export function exitGlobal() {
    socket.emit('exit-global', getToken());
}

// Recieves from server:
socket.on('update-global', function(global) {
    setGlobal(global);
});


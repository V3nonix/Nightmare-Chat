import { io } from 'socket.io-client';

const URL = 'http://localhost:3001/' 
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001/';

export const socket = io(URL, {
    transports: ['websocket'],
    autoConnect: false
});
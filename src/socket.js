import * as usersService from './utilities/usersService';

// Declares socket to
const socket = window.io();
// Initializes state setter to null:
let setChat = null;

// Registers state setter:
export function registerSetChat(fnct) {
    setChat = fnct;
}

// Emits to server:
export function joinChat(chatId) {
    socket.emit('join', {
        token: usersService.getToken(),
        chatId
    });
}
  
export function sendMsg(msg) {
    socket.emit('send-message', {
        token: usersService.getToken(),
        msg
    });
}
  
export function leaveChat() {
    socket.emit('leave', usersService.getToken());
}

// Recieves from server:
socket.on('update-game', function(game) {
    setGame(game);
});
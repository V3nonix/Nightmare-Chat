import * as usersService from './utilities/usersService';

// Declares socket to
const socket = window.io();
// Initializes state setter to null:
let setChat = null;

// Registers state setter:
export function registerSetChat(fnct) {
    setChat = fnct;
}

/* Emits to server: */


// Enters a chat:
export function enter(chatId) {
    socket.emit('enter', {
        token: usersService.getToken(),
        chatId
    });
}

// Sends a message in a chat:
export function send(msg) {
    socket.emit('send', {
        token: usersService.getToken(),
        msg
    });
}

// Adds a target user to a chat:
export function invite(tarUser) {
    socket.emit('invite', {
        token: usersService.getToken(),
        tarUser
    });
}

// Sets a target member to a role:
export function set(tarMember) {
    socket.emit('set', {
        token: usersService.getToken(),
        tarMember
    });
}


// Removes a target member from a chat:
export function remove(tarMember) {
    socket.emit('remove', {
        token: usersService.getToken(),
        tarMember
    });
}

// Exits a chat (temp):
export function exit() {
    socket.emit('exit', usersService.getToken());
}

// Leaves a chat (perm):
export function leave() {
    socket.emit('leave', usersService.getToken());
}


// Recieves from server:
socket.on('update-chat', function(chat) {
    setChat(chat);
});


// ICE BOX //
/* 

// Deletes a join Request in chat inbox:

export function remove(tarReq) {
    socket.emit('remove', {
        token: usersService.getToken(),
        tarReq
    });
}

// Revokes an Invite to join chat:

export function revoke(tarInv) {
    socket.emit('revoke', {
        token: usersService.getToken(),
        tarInv
    });
}

// Revokes an Invite to join chat:

export function deleteChat(chatId) {
    socket.emit('delete', {
        token: usersService.getToken(),
        chatId
    });
}

*/
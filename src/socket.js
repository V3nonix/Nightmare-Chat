import * as usersService from './utilities/usersService';

// Declares socket to
const socket = window.io();
// Initializes state setter to null:
// let setChat = null;
let setGloabl = null;

// Registers state setter(s):
export function registerSetGlobal(fnct) {
    setGlobal = fnct;
}

/* Emits to server: */

// Enters public:
export function enterGlobal() {
    socket.emit('enter-global', {
        token: usersService.getToken(),
    });
}

// Sends a message in public:
export function sendGlobal(msg) {
    socket.emit('send-global', {
        token: usersService.getToken(),
        msg
    });
}

// Exits global (temp):
export function exitGlobal() {
    socket.emit('exit-global', usersService.getToken());
}

// Recieves from server:
socket.on('update-global', function(global) {
    setGlobal(global);
});

// ICE BOX //
/* 

// Registers state setter(s):

export function registerSetChat(fnct) {
    setChat = fnct;
}

// Enters a chat:

export function enterChat({chatId, type}) {
    socket.emit('enter-chat', {
        token: usersService.getToken(),
        chatId,
        type
    });
}

// Sends a message in a chat:

export function sendChat(msg) {
    socket.emit('send-chat', {
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

export function exitChat() {
    socket.emit('exit-chat', usersService.getToken());
}

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

// Edits an editable on a chat:

export function edit(tarProp) {
    socket.emit('edit', {
        token: usersService.getToken(),
        tarProp
    });
}

// Leaves a chat (perm):

export function leave() {
    socket.emit('leave', usersService.getToken());
}

// Recieves from server:

socket.on('update-chat', function(chat) {
    setChat(chat);
});

*/
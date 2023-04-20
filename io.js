// Requires Mongoose Model(s):
const Room = require('./models/room');
const Group = require('./models/group');
// Requires JWT (JsonWebToken):
const jwt = require('jsonwebtoken');

const chats = {};

function init(server) {
    // Initializes socket.io at server instance:
    io = require('socket.io')(server);

    io.on('connection', function(socket) {
        console.log(`Connected at socket.io: ${socket.id}`);
      
        socket.on('enter', async function({token, chatId, type}){
            const user = await validateToken(token);
            if (!user) return;
            let chat = findLocalChat(chatId);
            if (!chat) chat = await fetchChat(chatId, type, user);
            if (chat) {
                socket.join(chat._id.toString());
                chats[chat._id.toString()] = chat;
                io.to(chat._id.toString()).emit('update-chat', chat);
            }
        });

        socket.on('send', async function({token, msg}){
            const user = await validateToken(token);
            if (!user) return;
        });

        socket.on('invite', async function({token, tarUser}){
            const user = await validateToken(token);
            if (!user) return;
        });

        socket.on('set', async function({token, tarMember}){
            const user = await validateToken(token);
            if (!user) return;
        });

        socket.on('remove', async function({token, tarMember}){
            const user = await validateToken(token);
            if (!user) return;
        });

        socket.on('exit', async function(token){
            const user = await validateToken(token);
            if (!user) return;
        });

        socket.on('leave', async function(token){
            const user = await validateToken(token);
            if (!user) return;
        });
    });
}


/* HELPERS: */

function findLocalChat(user) {
    let chatsArr = Object.values(chats);
    const chat = chatsArr.find(c => c.active.some(m => m.user == user._id));
    return chat;
}

async function fetchChat(chatId, type, user) {
    let chat;
    const temp = await (type === 'room' ? Room.findById(chatId) : Group.findById(chatId));
    if (temp.members.some(m => m.user.toString() === user._id.toString())) {
      chat = temp;
    }
    return chat;
}

// Ensures a token has not been altered by checking against SECRET.
// Then returns decoded user (Token is NOT in Auth header):
function validateToken(token) {
    return new Promise(function(resolve) {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (err) resolve(false);
                resolve(decoded.user);    
        });
    });
}

// Exports module methods:
module.exports = {
    init
}

// ICE BOX //
/* 
    socket.on('remove', async function({token, tarReq}){
        const user = await validateToken(token);
        if (!user) return; 
    });

    socket.on('revoke', async function({token, tarInv}){
        const user = await validateToken(token);
        if (!user) return;
    });

    socket.on('edit', async function({token, tarProp}){
        const user = await validateToken(token);
        if (!user) return; 
    });  

    socket.on('delete', async function({token, chatId}){
        const user = await validateToken(token);
        if (!user) return; 
    });    

*/
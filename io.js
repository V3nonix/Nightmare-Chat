// Requires Mongoose Model(s):

// Requires JWT (JsonWebToken):
const jwt = require('jsonwebtoken');
// Imports websocket (server):
const { Server } = require('socket.io');

function init(server) {
    io = require('socket.io')(server);
    // Listens on server:
    io.listen(3001);
    // Tracks 
    io.on("connection", (socket) => {
        console.log(`Connected: ${socket.id}`);
      
        socket.on("disconnect", () => {
          console.log(`Disconnected: ${socket.id}`);
        });
    });
}

// Exports module methods:
module.exports = {
    init
}
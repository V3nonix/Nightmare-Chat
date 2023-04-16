// Requires Mongoose Model(s):


// Requires JWT (JsonWebToken):
const jwt = require('jsonwebtoken');


const rooms = {};
const groups = {};

function init(server) {
    // Initializes socket.io at server instance:
    io = require('socket.io')(server);
    // Listens on server:
    io.listen(3001);
    // Tracks 
    io.on("connection", (socket) => {
        console.log(`Connected at room.io: ${socket.id}`);
      
        socket.on("disconnect", () => {
          console.log(`Disconnected at room.io: ${socket.id}`);
        });
    });
}

// Exports module methods:
module.exports = {
    init
}
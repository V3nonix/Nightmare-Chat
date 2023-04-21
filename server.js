const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
// Requires and configures 'dotenv':
require('dotenv').config();
// Requires database configuration:
require('./config/database');
// Requires global controllers:
const globalCtrl = require('./controllers/server/global');

// Creates express app:
const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configures static middleware:
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('./config/checkToken'));

const ensureLoggedIn = require('./config/ensureLoggedIn');

// Creates server:
const server = http.createServer(app);
// Initializes websockets on server:
const io = socketIO(server);
// Websocket middleware:
io.use(require('./config/checkSocket'));

/*-- GLOBAL --*/


io.on('connection', (socket) => {

    socket.on('enter-global', async function () {
        const global = await globalCtrl.fetchGlobal();
        console.log(`User ${socket.user.name} has connected to global at [${socket.id}]!`);
        socket.join('NIGHTMARE');
        io.to('NIGHTMARE').emit('update-global', global);
    });

    socket.on('send-global', async function({msg}) {
        const global = await globalCtrl.msgGlobal(msg);
        if (!global) return;
        socket.join('NIGHTMARE');
        io.to('NIGHTMARE').emit('update-global', global);
    });

});

// Router(s):
app.use('/server/users/', require('./routes/server/users'));

// Defines catch route:
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Sets development port if none exists:
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});



// 

// io.on('exit-global', async function(token){
//     const user = await validateToken(token);
//     if (!user) return;
// });
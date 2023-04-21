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
const io = socketIO(server);

// Initializes websockets on server:
const globalLocal = { global: null };

/*-- GLOBAL --*/

io.on('connection', (socket) => {
    console.log(`[${socket.id}] User '${socket}' connected`);

    socket.on('enter-global', async function (token) {
        console.log(io.engine.clientsCount);
        console.log(token);
        const user = await validateToken(token);
        if (!user) return;
        let global = globalLocal.global;
        console.log(`User ${user.name} has connected to global!`);
        if (!global) global = await globalCtrl.fetchGlobal();
        console.log(global);
        socket.to('NIGHTMARE').emit('update-global', global);
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

function validateToken(token) {
  return new Promise(function (resolve) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) resolve(false);
      resolve(decoded.user);
    });
  });
}


// io.on('send-global', async function({token, msg}){
//     const user = await validateToken(token);
//     if (!user) return;
//     let global = globalLocal.global;

// });

// io.on('exit-global', async function(token){
//     const user = await validateToken(token);
//     if (!user) return;
// });
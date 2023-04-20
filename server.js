const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
// Requires Io module:
const ioModule = require('./io');
// Requires and configures 'dotenv':
require('dotenv').config();
// Requires database configuration:
require('./config/database');

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

ioModule.init(io);

// Router(s):

app.use('/server/users/', require('./routes/server/users'));
// Protected router(s):
// app.use('/server/groups', ensureLoggedIn, require('./routes/server/groups'));
//app.use('/server/rooms', ensureLoggedIn, require('./routes/server/rooms'));
// app.use('server/api/assets', ensureLoggedIn, require('./routes/api/assets'));


// Defines catch route:
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Sets development port:
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`);
});

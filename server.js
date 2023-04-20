const express = require('express');
const path = require('path');
const logger = require('morgan');
// Requires and configures 'dotenv':
require('dotenv').config();
// Requires database configuration:
require('./config/database');
// Require 'http':
const http = require(`http`);

// Creates express app:
const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configures static middleware:
app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('./config/checkToken'));
const ensureLoggedIn = require('./config/ensureLoggedIn');

// Sets development port:
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`);
});

// Creates server:
const server = http.createServer(app);
// Initializes websocket:
require('./io').init(server)

/* MOUNT API & OTHER ROUTES HERE */

app.use('/server/users/', require('./routes/server/users'));

// Protected router(s):

/* SERVER */
// app.use('/server/groups', ensureLoggedIn, require('./routes/server/groups'));
//app.use('/server/rooms', ensureLoggedIn, require('./routes/server/rooms'));
/* API */
// app.use('server/api/assets', ensureLoggedIn, require('./routes/api/assets'));


// Defines catch route:
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
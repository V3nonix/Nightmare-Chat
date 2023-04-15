const express = require('express');
const path = require('path');
const logger = require('morgan');
// Requires and configures 'dotenv':
require('dotenv').config();
// Requires database configuration:
require('./config/database');

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

/* MOUNT API & OTHER ROUTES HERE */

app.use('/server/users', require('./routes/server/orders'));

// Protected router(s):

/* SERVER */
app.use('/server/groups', ensureLoggedIn, require('./routes/server/groups'));
app.use('/server/rooms', ensureLoggedIn, require('./routes/server/rooms'));
app.use('/server/users', ensureLoggedIn, require('./routes/server/users'));
/* API */
app.use('/api/assets', ensureLoggedIn, require('./routes/api/assets'));


// Defines catch route:
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
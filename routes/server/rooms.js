// Requires Express modules:
const express = require('express');
const router = express.Router();
// Requires router controller:
const roomsCtrl = require('../../controllers/server/users');
// Requires Auth middleware:
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /server/users
router.post('/new', roomsCtrl.create);



// Exports module as an Express router:
module.exports = router;
// Requires Express modules:
const express = require('express');
const router = express.Router();
// Requires router controller:
const usersCtrl = require('../../controllers/server/users');
// Requires Auth middleware:
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /server/users
router.post('/', usersCtrl.create);
// POST /api/server/login
router.post('/login', usersCtrl.login);

// Exports module as an Express router:
module.exports = router;
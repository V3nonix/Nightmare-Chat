// Requires Express modules:
const express = require('express');
const router = express.Router();
// Requires router controller:
const usersCtrl = require('../../controllers/server/users');
// Requires Auth middleware:
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /server/users
router.post('/', usersCtrl.create);
// POST /server/users/login
router.post('/login', usersCtrl.login);
// POST /server/users/find-many
router.post('/find', ensureLoggedIn, usersCtrl.findUsersPartial);

// PUT /server/users/data
router.put('/data', ensureLoggedIn, usersCtrl.updateData);

// GET /server/users/data
router.get('/data', ensureLoggedIn, usersCtrl.getData);

// Exports module as an Express router:
module.exports = router;
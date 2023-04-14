// Imports:
const path = require('path');
// Error handling:
module.exports = function errorHandler(functionName, error, statusError, res) {
    if (error) {
        // Error catch (Backend):
        console.error(`\x1B[31mError in ${path.basename(__dirname)}!!! \u001b[0m| Module: ${path.basename(__filename)} | Method: ${functionName} | \x1B[31m${error}!`);
    }
    if (error && statusError && res) {
        // Error catch (Frontend):
        res.status(statusError).json(error);
    }
}

// USE EXAMPLE:
/*
// Requires errorHandler:
const errorHandler = require('../../errorHandler');

function checkToken(req, res) {
    try {
        console.log('req.user', req.user); 
        res.json(req.exp);
    } catch (err) {
        // Error handler:
        errorHandler('checkToken', err, 500, res);
    }
}
        
*/

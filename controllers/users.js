// Requires Mongoose Model(s):
const User = require('../../models/user');
// Requires JWT (JsonWebToken):
const jwt = require('jsonwebtoken');
// Requires Bcrypt library:
const bcrypt = require('bcrypt');
// Requires errorHandler:
const errorHandler = require('../../errorHandler');

// Create Helper Functions:
function createJWT(user) {
    return jwt.sign(
        // Data payload:
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

// Create Function:
async function create(req, res) {
    try {
        // Creates new user in database:
        const user = await User.create(req.body);
        // Token that contains encoded User data:
        const token = createJWT(user);
        // Parses token to JSON:
        res.json(token);
    } catch (err) {
        // Error handler:
        errorHandler('create', err, 500, res);
    }
}

// Authenticate Helper Functions:
async function passwordCompare(password, hash) {
    // Stores outcomes of bcrypt compare:
    match = await bcrypt.compare(password, hash);
    // Returns outcome:
    return match;
}

// Authenticate Function:
async function login(req, res) {
    try {
        // Finds user in database:
        const user = await User.findOne({ email: req.body.email});
        // If user exists and password matches:
        if (user && passwordCompare(req.body.password, user.password)) {
            // Token that contains encoded User data:
            const token = createJWT(user);
            // Parses token to JSON:
            res.json(token);
        } else {
            // No actual error on the backend.
            // Returns 'Bad Credentials' to front end:
            res.status(400).json('Bad Credentials');
        }
    } catch (err) {
        // Error handler:
        errorHandler('login', err, 500, res);
    }
}

// Exports module methods:
module.exports = {
    create,
    login,
};
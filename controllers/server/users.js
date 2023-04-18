// Requires Mongoose Model(s):
const User = require('../../models/user');
const UserData = require('../../models/userData');


// Requires JWT (JsonWebToken):
const jwt = require('jsonwebtoken');
// Requires Bcrypt library:
const bcrypt = require('bcrypt');
// Requires errorHandler:
const errorHandler = require('../../errorHandler');

// GENERAL Helper Functions:
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
        // Creates new userData for user in database:
        await UserData.create({
            user: user._id,
            chatrooms: [],
            groups: [],
        });
        // Token that contains encoded User data:
        const token = createJWT(user);
        // Parses token to JSON:
        res.json(token);
    } catch (err) {
        // Error handler:
        errorHandler(__dirname, __filename, 'create', err, 500, res);
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
            res.status(400).json('Bad Credentials!');
        }
    } catch (err) {
        // Error handler:
        errorHandler(__dirname, __filename, 'login', err, 500, res);
    }
}

async function getData(req, res) {
    try {
        // Finds userData in database:
        const userData = await UserData.findOne({ user: req.user._id });
        // If userData appends to response:
        if (userData) {
            res.json(userData);
        // If no userData sets response status:
        } else {
            res.status(404).json('Resource not found!');
        }
    } catch(err) {
        // Error handler:
        errorHandler(__dirname, __filename, 'getData', err, 500, res);        
    }
}

async function updateData(req, res) {
    try {
        const userData = await UserData.updateUserData(req.body);
        console.log(userData[req.body.tar]);
        res.json(userData[req.body.tar]);
    } catch(err) {
        // Error handler:
        errorHandler(__dirname, __filename, 'updateData', err, 500, res);            
    }
}

// Exports module methods:
module.exports = {
    create,
    login,
    getData,
    updateData,
};

// ['friends', 'rooms', 'groups', 'invites', 'requests', 'friendReqs', 'friendInvs', 'about']
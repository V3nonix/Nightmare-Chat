// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;

// ChatroomsElement Schema:
const chatroomsElementSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chatroom",
        required: true
    },
    name: { type: String, required: true },
    thumb: { type: string }
});

// UserData Schema:
const userDataSchema = new Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    chatrooms: [userDataSchema],
    groups: 'startHere'
});

// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('UserData', userDataSchema);
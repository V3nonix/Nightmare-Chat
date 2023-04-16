// Requires Mongoose module:
const mongoose = require('mongoose');
// Requires mongoose Schema(s):
const memberSchema = require('./schemas/member');
const messageSchema = require('./schemas/message');
const inviteSchema = require('./schemas/invite');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;

// Chatroom Schema:
const roomSchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    thumb: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        maxLength: 3000,
        minLength: 1,
        default: ''
    },
    members: {
        type: [memberSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 30
            }, 
            message: 'Maximum members reached!'
        }
    }, 
    messages: {
        type: [messageSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 119
            }, 
            message: 'Maximum messages reached!'
        }
    },
    requests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Request",
    },
    invites: {
        type: [inviteSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 29
            }, 
            message: 'Maximum number of pending invatations!'
        }
    },

}, {
    timestamps: true
});


// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('Room', roomSchema);
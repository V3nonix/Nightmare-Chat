// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;
// Requires mongoose Schema(s):
const inviteSchema = require('./schemas/invite');
const requestSchema = require('./schemas/request');


// Friend Schema:
const friendSchema = new Schema({
    name: { type: String, required: true },
    avatar: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

// ChatroomsEntry Schema:
const roomsEntrySchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    name: { type: String, required: true },
    thumb: { type: String }
});

// ChatGroupsEntry Schema:
const groupsEntrySchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    name: { type: String, required: true },
    thumb: { type: String }
});

// UserData Schema:
const userDataSchema = new Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    friends: {
        type: [friendSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 50
            }, 
            message: 'Maximum friends reached!'
        }        
    },
    rooms: {
        type: [roomsEntrySchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 10
            }, 
            message: 'Maximum chatrooms reached!'
        }
    },
    groups: {
        type: [groupsEntrySchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 15
            }, 
            message: 'Maximum group chats reached!'
        }
    },
    invites: {
        type: [inviteSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 25
            }, 
            message: 'Maximum invites reached!'
        }
    },
    requests: {
        type: [requestSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 25
            }, 
            message: 'Maximum invites reached!'
        }
    },
    about: { type: String, default: '' }
});

/* UserData Schema VIRTUALS */

// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('UserData', userDataSchema);
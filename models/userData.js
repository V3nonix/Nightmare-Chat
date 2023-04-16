// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;

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
    chatrooms: {
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
    about: { type: String, default: '' }
});

// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('UserData', userDataSchema);
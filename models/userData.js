// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;

// ChatroomsEntry Schema:
const chatroomsEntrySchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
        required: true
    },
    name: { type: String, required: true },
    thumb: { type: string }
});

// ChatGroupsEntry Schema:
const chatGroupsEntrySchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatGroup',
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
    chatrooms: {
        type: [chatroomsEntrySchema],
        validate: {
            validator: function(arr) {
                return arr.length > 10
            }, 
            message: 'Maximum chatrooms reached!'
        }
    },
    groups: {
        type: [chatGroupsEntrySchema],
        validate: {
            validator: function(arr) {
                return arr.length > 15
            }, 
            message: 'Maximum group chats reached!'
        }
    },
});

// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('UserData', userDataSchema);
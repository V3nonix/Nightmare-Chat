// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;
// Requires mongoose Schema(s):
const memberSchema = require('./schemas/member');
const messageSchema = require('./schemas/message');
const inviteSchema = require('./schemas/invite');
const requestSchema = require('./schemas/request');

// Chatroom Schema:
const roomSchema = new Schema({
    name: {
        type: String, 
        required: true,
        maxLength: 64,
        minLength: 3,
        unique: [true, 'A chatroom with this name already exists!']
    },
    thumb: String,
    type: {type: String, default: 'room'},
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
        type: [requestSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 50
            }, 
            message: 'Maximum number of pending requests!'
        }
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
    active: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
}, {
    timestamps: true
});

/* Chatroom Schema VIRTUALS */

// 

/* Chatroom Schema STATICS */

//getChat

// Updates chat room invs and reqs:
roomSchema.statics.updateRoom = async function({ userId, tar, origin, data }) {
    try {
        const room = await this.findById(data.ext.id);
        if (origin === 'UDS') {
            room[tar].push(data);
            return room.save();         
        } else if (Array.isArray(room[tar])) {
            room[tar].push(data.ext);
            room.validate();
            const UserData = mongoose.model('UserData');
            await UserData.updateData({ userId, tar, origin: 'EXT', data: data.int });
            return room.save();
        } else {
            room[tar] = data;
            return room.save();            
        }
    } catch(err) {
        return err;
    } 
}

/* Chatroom Schema METHODS */

// addMember HELPER:
function filterAddDocs(userId, doc) {
    doc.invites = doc.invites.filter(inv => !inv.user.equals(userId));
    doc.requests = doc.requests.filter(req => !req.user.equals(userId));
}

// Adds a member to the chatroom:
roomSchema.methods.addMember = async function(userId) {
    const room = this;
    const User = mongoose.model('User');
    const user = await User.findById(userId);
    if (user) {
        const UserData = mongoose.model('UserData');
        const userData = await UserData.find({ user: user._id });
        if (room.members.length <= 30 && userData.groups.length <= 15) {
            try {
                userData.rooms.push({
                    id: room._id,
                    name: room.name,
                    thumb: room.thumb
                });
                filterAddDocs(user._id, userData);
                userData.save();
                room.members.push({
                    name: user.name,
                    user: user._id
                });
                filterAddDocs(user._id, room);
                return room.save();
            } catch(err) {
                return err;
            }
        } else {
            return new Error('A maximum limit was reached!')
        }
    } else {
        return new Error('No such user exists!');    
    }
}

// Removes a member from the chatroom:
roomSchema.methods.removeMember = async function(userId) {
    const room = this;
    const members = room.members;
    if (members.find(m => m.user.equals(userId))) {
        try {
            members = members.filter(mem => !mem.user.equals(userId));
            return room.save();
        } catch(err) {
            return err;
        }
    } else {
        return new Error('No such member exists!');
    }
}

// Sets a member's role:
roomSchema.methods.setMember = async function(userId, newRole) {
    const room = this;
    const member = room.members.find(mem => mem.user.equals(userId));
    if (member) {
        try {
            member.role = newRole;
            return room.save();
        } catch(err) {
            return err;
        }
    } else {
        return new Error('No such member exists!');
    }
}

// Updates a chatroom's misc fields:


// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('Room', roomSchema);
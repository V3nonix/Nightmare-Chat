// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;
// Requires mongoose Schema(s):
const memberSchema = require('./schemas/member');
const messageSchema = require('./schemas/message');
const inviteSchema = require('./schemas/invite');
const requestSchema = require('./schemas/request');

// Chat Group Schema:
const groupSchema = new Schema({
    name: {
        type: String, 
        required: true,
        maxLength: 64,
        minLength: 3,
        unique: [true, 'A chatgroup with this name already exists!']
    },
    thumb: String,
    type: {type: String, default: 'group'},
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
                return arr.length <= 10
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
                return arr.length <= 9
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

/* ChatGroup Schema VIRTUALS */

// 

/* ChatGroup Schema STATICS */

// Updates chat group invs and reqs:
groupSchema.statics.updateGroup = async function({ userId, tar, origin, data }) {
    try {
        const group = await this.findById(data.ext.id);
        if (origin === 'UDS') {
            group[tar].push(data);
            return group.save();         
        } else if (Array.isArray(room[tar])) {
            group[tar].push(data.ext);
            group.validate();
            const UserData = mongoose.model('UserData');
            await UserData.updateUserData({ userId, tar, origin: 'EXT', data: data.int });
            return group.save();
        } else {
            room[tar] = data;
            return group.save();            
        }
    } catch(err) {
        return err;
    } 
}

/* ChatGroup Schema METHODS */



// Exports groupSchema as Mongoose Model:
module.exports = mongoose.model('Group', groupSchema);
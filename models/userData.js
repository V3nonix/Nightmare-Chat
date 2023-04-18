// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;
// Requires mongoose Schema(s):
const inviteSchema = require('./schemas/invite');
const requestSchema = require('./schemas/request');
// Requires mongoose Model(s):
const Room = require('./room');
const Group = require('./group');


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

// Friend Reqest Schema:
const friendReqestSchema = new Schema({
    name: { type: String, required: true },
    avatar: String,
    message: {
        type: String,
        maxLength: 200,
        minLength: 3,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

// Friend Invite Schema:
const friendInviteSchema = new Schema({
    name: { type: String, required: true },
    avatar: String,
    message: {
        type: String,
        maxLength: 200,
        minLength: 3,
        default: ''
    },
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
    friendReqs: {
        type: [friendReqestSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 50
            }, 
            message: 'Maximum friend requests reached!'
        }
    },
    friendInvs: {
        type: [friendInviteSchema],
        validate: {
            validator: function(arr) {
                return arr.length <= 50
            }, 
            message: 'Maximum friend invites reached!'
        }
    },
    about: { type: String, maxLength: 750, default: '' }
}, {
    // Ensures virtuals are serialized:
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.invites;
            delete ret.requests;
            delete ret.friendReqs;
            delete ret.friendInvs;
        }
    }

});

/* UserData Schema STATICS */

/* UserData Schema METHODS */

// Updates user data:
userDataSchema.methods.updateUserData = async function({ _id, tar, origin, data }) {
    try {
        const userData = await this.findOne({ user: _id });
        if (origin === 'EXT') {
            userData[tar].push(data);
            return userData.save();         
        } else if (Array.isArray(userData[tar])) {
            userData[tar].push(data.int);
            userData.validate(); 
            if (data.type === 'room') {       
                await Room.updateRoom({ _id, tar, origin: 'UDS', data: data.ext });
                return userData.save();                
            } else if (data.ext.type === 'group') {
                await Group.updateGroup({ _id, tar, origin: 'UDS', data: data.ext });
                return userData.save();  
            } else {
                //friends 
            }
        } else {
            userData[tar] = data;
            return userData.save();
        }
    } catch(err) {
        return err;
    } 
}

/* UserData Schema VIRTUALS */

// Packages all reqs and invs:
userDataSchema.virtual('comPackage').get(function() {
    // Defines temps:
    let inboxTemp = [...this.friendInvs, ...this.invites];
    let sentTemp = [...this.friendReqs, ...this.requests];
    let infoTemp = {
        reqsNum: this.requests.length,
        invsNum: this.invites.length,
        fReqsNum: this.friendReqs.length,
        fInvsNum: this.friendInvs.length
    }
    // Manipulates temps (mapping):
    inboxTemp = inboxTemp.map(item => {
        return {
            item: item,
            type: item.type ? item.type : 'friendInv',
            created: new Date(item.createdAt)
        }
    });
    sentTemp = sentTemp.map(item => {
        return {
            item: item,
            type: item.type ? item.type : 'friendReq',
            created: new Date(item.createdAt)
        }
    });
    // Manipulates temps (sorting):
    inboxTemp.sort((a, b) => a.created.getTime() - b.created.getTime());
    sentTemp.sort((a, b) => a.created.getTime() - b.created.getTime());
    // Returns temp as package object:
    return {inbox: inboxTemp, sent: sentTemp, info: infoTemp};
});

// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('UserData', userDataSchema);
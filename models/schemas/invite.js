// Requires Mongoose module and sets Schema shortcut:
const Schema = require('mongoose').Schema;

// Invite Schema:
const inviteSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    thumb: {type: String, default: ''},
    id: {type: String, required: true},
    senderName: {type: String, required: true},
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

// Exports inviteSchema as mongoose Schema:
module.exports = inviteSchema;
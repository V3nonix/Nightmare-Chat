// Requires Mongoose module and sets Schema shortcut:
const Schema = require('mongoose').Schema;

// Invite Schema:
const inviteSchema = new Schema({
    name: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    id: String,
    senderName: {type: String, required: true},
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

// Exports inviteSchema as mongoose Schema:
module.exports = memberSchema;
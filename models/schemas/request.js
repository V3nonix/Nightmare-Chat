// Requires Mongoose module and sets Schema shortcut:
const Schema = require('mongoose').Schema;

// Request Schema:
const requestSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    thumb: {type: String, default: ''},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    id: String
}, {
    timestamps: true
});

// Exports inviteSchema as mongoose Schema:
module.exports = requestSchema;
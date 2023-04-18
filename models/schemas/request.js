// Requires Mongoose module and sets Schema shortcut:
const Schema = require('mongoose').Schema;

// Request Schema:
const requestSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    thumb: {type: String, default: ''},
    id: {type: String, required: true}
}, {
    timestamps: true
});

// Exports inviteSchema as mongoose Schema:
module.exports = requestSchema;
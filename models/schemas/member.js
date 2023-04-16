// Requires Mongoose module and sets Schema shortcut:
const Schema = require('mongoose').Schema;

// Member Schema:
const memberSchema = new Schema({
    name: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {type: String, required: true, default: 'Member'}
}, {
    timestamps: true
});

// Exports memberSchema as mongoose Schema:
module.exports = memberSchema;
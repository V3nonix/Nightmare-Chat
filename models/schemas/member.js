// Requires Mongoose module and sets Schema shortcut:
const Schema = require('mongoose').Schema;

// Member Schema:
const memberSchema = new Schema({
    name: {type: String, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String, 
        default: 'Member',
        enum: ['Member', 'Moderator', 'Admin', 'Creator', 'SUPER_USER']
    }
}, {
    timestamps: true
});

// Exports memberSchema as mongoose Schema:
module.exports = memberSchema;
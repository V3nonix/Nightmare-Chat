// Requires Mongoose module and sets Schema shortcut:
const Schema = require('mongoose').Schema;

// Member Schema:
const messageSchema = new Schema({
    name: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contents: {        
        type: String,
        maxLength: 1547,
        minLength: 1,
        required: true
    }
}, {
    timestamps: true
});

// Exports messageSchema as mongoose Schema:
module.exports = messageSchema;
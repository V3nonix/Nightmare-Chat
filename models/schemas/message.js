// Requires Mongoose module and sets Schema shortcut:
const Schema = require('mongoose').Schema;

// Member Schema:
const messageSchema = new Schema({
    name: {type: String, required: true},
    user: {
        type: Schema.Types.ObjectId,
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
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            ret.date = new Date(doc.createdAt);
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

// Exports messageSchema as mongoose Schema:
module.exports = messageSchema;
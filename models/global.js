// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;
// Requires mongoose Schema(s):
const messageSchema = require('./schemas/message');

const globalSchema = new Schema({
    messages: { 
        type : [messageSchema], 
        default : [],
        validate: {
            validator: function(arr) {
                return arr.length <= 300
            }, 
            message: 'Maximum messages reached!'
        }
    }
});

// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('Global', globalSchema);
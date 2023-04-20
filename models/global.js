// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;
// Requires mongoose Schema(s):

const globalSchema = new Schema({
    active: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    messages: { 
        type : Array , 
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
// Requires Mongoose module:
const mongoose = require('mongoose');
// Shortcut for mongoose.Schema:
const Schema = mongoose.Schema;
// Requires Bcrypt library:
const bcrypt = require('bcrypt');
// Hash processing number:
const SALT_ROUNDS = 6;

// User Schema:
const userSchema = new Schema({
    name: {
        type: String, 
        required: true,
        maxLength: 32,
        minLength: 3,
        unique: [true, 'An account with this name already exists!']
    },
    avatar: { type: String, default: ''},
    email: {
      type: String,
      unique: [true, 'An account with this email already exists!'],
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
        // Passord should not be sent:
          delete ret.password;
          return ret;
        }
    }
});

/* User Schema VIRTUALS */


// User save middleware:
userSchema.pre('save', async function(next) {
    // User document is bound to 'this':
    if (!this.isModified('password')) return next();
    // Updates the password with the computed hash:
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

// Exports userSchema as Mongoose Model:
module.exports = mongoose.model('User', userSchema);
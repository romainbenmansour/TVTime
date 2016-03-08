var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    facebook_id: String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    gender: String,
    auth_tokens: [{
        value: String,
        create_time: {
            type: Date,
            default: Date.now
        }
    }],
    favorites: [Number]
});

module.exports = mongoose.model('User', UserSchema);

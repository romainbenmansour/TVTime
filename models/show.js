var mongoose = require('mongoose');

var ShowSchema = mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    data: String
});

module.exports = mongoose.model('Show', ShowSchema);

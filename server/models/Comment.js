const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment: String,
    name: String,
    createAt: {
        type: Date,
        default: Date.now,
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = { Comment }
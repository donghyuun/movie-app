const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment: String,
    name: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
    movieId: String
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = { Comment }
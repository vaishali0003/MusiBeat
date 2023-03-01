const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: String,
    songs: {
        type: Array,
        default: []
    }
})
const Playlist = mongoose.model('playlist', playlistSchema);
module.exports = Playlist;

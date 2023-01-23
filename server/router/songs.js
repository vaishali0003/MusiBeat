const express = require('express');
const router = express.Router();
const Song = require('../models/songSchema');

// to set songs
router.post('/addsong', async (req, res) => {
    try {
        const { song_audio, category } = req.body;

        const song = new Song({
            songAudio: song_audio,
            category: category
        })
        const savedSong=await song.save();
        console.log(savedSong);
    }
    catch (err) {
        console.log('some error occured');
    }
})

module.exports=router;
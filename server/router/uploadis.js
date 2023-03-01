const express = require('express');
const router = express.Router();
const Song = require('../models/songSchema');
const { upload, s3 } = require('../utility/utility');
const { v4: uuidv4 } = require('uuid');
var jsmediatags = require("jsmediatags");
const awsBucketName = process.env.awsBucketName;

router.post('/addsong', upload, async (req, res) => {
    try {
        let success = false;
        const myFile = req.file.originalname;
        console.log(myFile);
        const fileType = myFile.split(".")[myFile.split(".").length - 1];
        const body = req.file.buffer;
        const params = {
            Bucket: awsBucketName,
            Key: `${uuidv4()}.${fileType}`,
            Body: body
        };
        const uploadSong = await s3.upload(params).promise();
        success = true;
        const category = req.body.category;
        res.json({ uploadSong, category, success });

        const fileUrl = uploadSong.Location;
        jsmediatags.read(fileUrl, {
            onSuccess: async function (tag) {
                var title = tag.tags.title.replace('_128-(DJMaza)', '');
                var artist = tag.tags.artist;
                var st = tag.tags.picture.description
                var newStr = st.replace('..', '')
                var img_url = tag.tags.TPE2.data + newStr;

                const song = new Song({
                    title: title,
                    artist: artist,
                    img_url: img_url,
                    category: category,
                    song_url: fileUrl
                })

                const songdata = await song.save();
                console.log(songdata);
            },
            onError: function (error) {
                console.log(':(', error.type, error.info);
            }
        });
    }
    catch (err) {
        console.log(err);
        console.log('some error occured');
    }
})

router.get('/getallsongs', async (req, res) => {
    try {
        let category = req.query.category;
        let search = req.query.search;

        if (category === 'all' || category === '') {
            if (search === "") {
                var allsongs = await Song.find({})
            }
            else {
                allsongs = await Song.find({ title: { $regex: new RegExp(search, "i") } });
            }
        }
        else {
            allsongs = await Song.find({ category: category, title: { $regex: new RegExp(search, "i") } });
        }
        res.json(allsongs);
    }
    catch (err) {
        console.log('some internal error occured');
    }
})

router.put('/editsong/:id', async (req, res) => {
    const { title, artist, img_url, category, song_url } = req.body;
    let success = false;
    try {
        let newsong = {};
        if (title) {
            newsong.title = title;
        }
        if (artist) {
            newsong.artist = artist;
        }

        if (img_url) {
            newsong.img_url = img_url;
        }
        if (category) {
            newsong.category = category;
        }
        if (song_url) {
            newsong.song_url = song_url
        }

        let song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ type: "danger", message: "Song not found" });
        }
        song = await Song.findByIdAndUpdate(req.params.id, { $set: newsong }, { new: true });
        success = true
        res.json({ song, success });
    }
    catch (err) {
        console.log('some internal error occured');
    }
})

router.delete('/deletesong/:id', async (req, res) => {
    let success = false;
    try {
        let song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ type: "danger", message: "Note not found" });
        }
        song = await Song.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ song, success });
    }
    catch (err) {
        console.log('some internal error occured');
    }
})


module.exports = router;
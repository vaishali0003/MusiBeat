const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')
const favouriteSong = require('../models/favouritesSchema');
const Playlist = require('../models/createallPlaylists');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fetchuser = require('../middleware/fetchuser');
JWT_SECRET = 'goodthingstaketimehopeforthebest';

router.post('/signup', async (req, res) => {
    let success = false;
    const { name, email, password, conf_password, role } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if (user) {
            return res.status(401).json({ type: "danger", message: "Sorry a user with this email already exists", success: success })
        }
        if (password != conf_password) {
            return res.status(401).json({ type: "danger", message: "Password and confirm password do not match", success: success })
        }

        user = new User({
            name: name,
            email: email,
            password: password,
            role: role
        })

        const response = await user.save();
        success = true;
        res.json({ response, success: success });
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    let success = false;
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ type: "danger", message: "Please Login using correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ type: "danger", message: "Please Login using correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ authToken, success: success });
    }
    catch (err) {
        console.log(err);
    }
});

// get logged in user details login required
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.json(user);
    }
    catch (err) {
        res.status(501).json({ message: 'Internal server error' })
    }
});

// save users favourite songs login required
router.post('/addfavourite', fetchuser, async (req, res) => {
    let success = false;
    const userId = req.user.id;
    try {
        const { song } = req.body;
        var playlist = await favouriteSong.findOne({ user_id: req.user.id });

        if (playlist) {
            var newplaylist = playlist.favouritesongs.concat(song)

            playlist = await favouriteSong.findOneAndUpdate({ user_id: req.user.id }, { $set: { favouritesongs: newplaylist } }, { new: true });
            return res.json({ playlist });
        }
        else {
            const newsongs = new favouriteSong({
                user_id: userId,
                favouritesongs: [song]
            })
            const resp = await newsongs.save();
            success = true;
            return res.json({ resp, success: success });
        }
    }
    catch (err) {
        console.log(err);
        res.status(501).json({ type: "danger", message: "Some internal error occured" })
    }
});

router.post('/removeFavourite/:id', fetchuser, async (req, res) => {
    let success = false;
    const userId = req.user.id;
    const song_id = req.params.id;
    try {
        const allfavsongs = await favouriteSong.find({ user_id: userId });
        let arr = allfavsongs[0].favouritesongs;
        let ind = arr.findIndex(x => x._id === song_id);
        arr.splice(ind, 1);
        let updatedfavsongs = arr;
        const updatedFavSongsList = await favouriteSong.findOneAndUpdate({ user_id: userId }, { $set: { favouritesongs: updatedfavsongs } }, { new: true });
        success = true;
        return res.json({ updatedFavSongsList, success: success });
    }
    catch (err) {
        return res.status(500).send({ type: "danger", message: "Some internal error occured" });
    }
})

router.get('/allfavourites', fetchuser, async (req, res) => {
    let success = false;
    let userId = req.user.id;

    try {
        const favouritesonglist = await favouriteSong.find({ user_id: userId });
        return res.json(favouritesonglist[0].favouritesongs);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ type: "danger", message: "Some internal error occured" })
    }
})


router.post('/addplaylist', fetchuser, async (req, res) => {
    let success = false;
    let { playlistname, song } = req.body;
    let userId = req.user.id;
    try {
        const isPlaylist = await Playlist.findOne({ name: playlistname, user_id: userId });
        if (isPlaylist) {
            return res.json({ type: "danger", message: "A playlist with this name already exists" });
        }

        let newPlayList;
        if (song) {
            newPlayList = new Playlist({
                name: playlistname,
                user_id: userId,
                songs: [song]
            });
        }
        else {
            newPlayList = new Playlist({
                name: playlistname,
                user_id: userId,
                songs: []
            });
        }
        const savePlaylist = await newPlayList.save();
        success = true;
        res.json({ savePlaylist, success: success });
    }
    catch (err) {
        return res.status(500).send({ type: "danger", message: "Some internal error occured" });
    }
});

router.post('/addplaylistsongs/:id', fetchuser, async (req, res) => {
    let success = false;
    let userId = req.user.id;
    const playListId = req.params.id;
    const { song } = req.body;

    try {
        const d1 = await Playlist.findById(playListId);
        let updatedSongs = d1.songs.concat(song);

        const updatePlayList = await Playlist.findByIdAndUpdate(playListId, { $set: { songs: updatedSongs } }, { new: true });
        success = true;
        return res.json({ updatePlayList, success: success });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ type: "danger", message: "Some internal error occured" })
    }
});

router.get('/allplaylists', fetchuser, async (req, res) => {
    let userId = req.user.id;

    try {
        const allplaylists = await Playlist.find({ user_id: userId });
        return res.json(allplaylists);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ type: "danger", message: "Some internal error occured" })
    }
})

router.post('/deletesongs/:id', fetchuser, async (req, res) => {
    let success = false;
    let userId = req.user.id;
    const playListId = req.params.id;
    const { id } = req.body;
    try {
        const playlist = await Playlist.findById(playListId);
        let arr = playlist.songs;

        let ind = arr.findIndex(x => x._id === id);
        arr.splice(ind, 1);
        let updatedSongs = arr;

        const updatedSongsList = await Playlist.findByIdAndUpdate(playListId, { $set: { songs: updatedSongs } }, { new: true });
        success = true;
        return res.json({ updatedSongsList, success: success });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ type: "danger", message: "Some internal error occured" })
    }
})

router.delete('/deleteplaylist/:id', fetchuser, async (req, res) => {
    let success = false;
    let userId = req.user.id;
    const playListId = req.params.id;
    try {
        const playlist = await Playlist.findByIdAndDelete(playListId);
        success = true;
        return res.json({ playlist, success: success });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ type: "danger", message: "Some internal error occured" })
    }
})

router.post('/addadmin', async (req, res) => {
    const { name, email, password, conf_password, role } = req.body;
    try {
        if (password != conf_password) {
            return res.status(401).json({ type: "danger", message: "Password and confirm password do not match", success: success })
        }

        user = new User({
            name: name,
            email: email,
            password: password,
            role: role
        })
        const response = await user.save();
        res.json({ response });
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;
    let success=false;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ type: "danger", message: "Please Login using correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ type: "danger", message: "Please Login using correct credentials" });
        }
          console.log(user);
        if(user.role!=="admin"){
            return res.status(400).json({ type: "danger", message: "No history of admin found" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ authToken,user,success});

    }
    catch (err) {
    console.log(err);
    }
})

module.exports = router;

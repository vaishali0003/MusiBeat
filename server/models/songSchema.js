const mongoose=require('mongoose');

const songSchema=mongoose.Schema({
    songAudio:{
        type:String
    },
    category:{
        type:String
    }
})

const Song=mongoose.model('song',songSchema);
module.exports=Song;
const mongoose=require('mongoose');

const songSchema=mongoose.Schema({
    title:{
        type:String
    },
    artist:{
        type:String
    },
    img_url:{
      type:String
    },
    category:{
        type:String
    },
    song_url:{
        type:String
    }
})

const Song=mongoose.model('song',songSchema);
module.exports=Song;

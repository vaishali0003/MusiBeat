const mongoose = require('mongoose');

const favouritesSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    favouritesongs:{
        type:Array,
        default:[]
    }
})

const favouriteSong=mongoose.model('favouritesong',favouritesSchema);
module.exports=favouriteSong;
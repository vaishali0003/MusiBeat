const mongoose=require('mongoose');
const mongoURI='mongodb://localhost:27017/music_player';

mongoose.set("strictQuery", false);
mongoose.connect(mongoURI).then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log('database not connected');
})

const express=require('express');
const songs=require('./router/songs');
const app=express();
require('./db/conn');
var cors=require('cors');

app.use(cors());
app.use(express.json());
const port=process.env.port||5100;

// app.get('/home',async(req,res)=>{
// res.send('hello');
// })

app.use('/songs',songs);

app.listen(port,()=>{
console.log(`listening to port ${port}`);
})
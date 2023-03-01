require('dotenv').config();
const express = require('express');
const uploadis = require('./router/uploadis');
const auth=require('./router/auth');
const app = express();
require('./db/conn');
var jsmediatags = require("jsmediatags");
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 5100;

app.use('/uploads', express.static('uploads'));
app.use('/uploadis', uploadis);
app.use('/auth', auth);

const btoa = require('btoa');
const b64 = btoa("stringToEncode");
var base64 = require('base-64');

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})

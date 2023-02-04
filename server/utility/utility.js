const fs = require('fs');
const multer = require('multer');
const AWS = require('aws-sdk');
const awsID = process.env.awsID;
const awsSecret = process.env.awsSecret;
const bucketRegion = process.env.bucketRegion;

const s3 = new AWS.S3({
    region: bucketRegion,
    accessKeyId: awsID,
    secretAccessKey: awsSecret,
});

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Multer Setup
var storage = multer.memoryStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + new Date().getTime());
    },
});

const upload = multer({ storage }).single('songAudio');

const multiUpload = multer({ storage }).fields([
    {
        name: 'images',
        maxCount: 10
    }
])

module.exports = {
    upload,
    multiUpload,
    s3
};
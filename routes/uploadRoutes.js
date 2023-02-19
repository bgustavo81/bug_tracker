const express = require("express");
const router = express.Router();
const auth = require("../middlewares/requireLogin");
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const keys = require('../config/keys');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
    endpoint: 's3-us-east-2.amazonaws.com',
    signatureVersion: 'v4',
    region: 'us-east-2'
})

// @route    GET api/upload
// @desc     get presigned url
// @access   Private
router.get('/', auth, (req, res, next) => {
    const key = `${req.user.user_id}/${uuidv4()}.jpeg`;

    s3.getSignedUrl('putObject', {
        Bucket: 'my-foto-bucket-123',
        ContentType: 'image/jpeg',
        Key: key
    }, (err, url) => res.send({ key, url }));
})

module.exports = router;
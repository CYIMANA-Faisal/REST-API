const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const imgUpload = (req, res, next) => {
    console.log(req.file)
    next()
}

module.exports = imgUpload
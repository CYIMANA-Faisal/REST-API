const mongoose = require('mongoose');
const { stringify } = require('uuid');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:{
        type: String,
        required:[true, 'Title field is required.']
    },
    imageURL:{
        type: String,
        required: false
    },
    createdAt: Date,
    updateAt: Date,
    content:{
        type: String,
        required: [true, 'The content field is required.']

    }
});

const Article = mongoose.model('article', articleSchema)

module.exports = Article;

const Article = require('../models/article');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const fs = require('fs')



// GetArticles the articles
const getArticles = async (req, res) => {
    
    try{
        const articles = await Article.find({});
        res.status(200).json(articles);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

// Get a particular article function
const getArticle = async (req, res) => {
    const article = await Article.findOne({_id:req.params.id});
    try {
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

// PostArticle function function
const postArticle = async function (req, res) {
    try {
        cloudinary.uploader.upload(req.file.path, { tags: 'basic_sample' },async function (err, image) {
            if (err) { console.warn(err); }
            req.body.imageURL = image.url
            const article = await Article.create(req.body);
            fs.unlinkSync(req.file.path)
            res.status(200).json({message: "Article creatred successfully", articleID: article._id });
        });
          
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

// Update article function
const updateArticle = async (req, res) => {
    try {
        await Article.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message:'The article was updated successfully'})
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

// DeleteArticle function
const deleteArticle = async (req, res) => {
    try{
        const article = await Article.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Article deleted successfully."});
    }
    catch (err) {
        res.status(500).json({error:err.message});
    }
};

// EXPORT SECTION
module.exports = {
    getArticles,
    getArticle,
    postArticle,
    updateArticle,
    deleteArticle
};
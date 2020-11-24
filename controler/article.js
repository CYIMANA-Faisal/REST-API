
const Article = require('../models/article');

// GetArticles the articles
const getArticles = async (req, res) => {
    const articles = await Article.find({});
    try{
        res.send(articles);
    }
    catch(err){
        res.send({error:err.message});
    }
};

// Get a particular article function
const getArticle = async (req, res) => {
    const article = await Article.findOne({_id:req.params.id});
    try {
        res.send(article);
    } catch (err) {
        res.send({error:err.message});
    }
}

// PostArticle function function
const postArticle = async function (req, res) {
    try {
        req.body.imageURL = req.file.path;
        const article = await Article.create(req.body);
        res.send(article);
    } catch (err) {
        res.send({error:err.message});
    }
};

// Update article function
const updateArticle = async (req, res) => {
    try {
        await Article.findByIdAndUpdate(req.params.id, req.body)
        await Article.save()
        res.send('The article was updated successfully')
    } catch (err) {
        res.send({error:err.message});
    }
};

// DeleteArticle function
const deleteArticle = async (req, res) => {
    try{
        const article = await Article.findByIdAndDelete(req.params.id)
        // if (!article) res.status(404).send("No article found");
        res.send("Article deleted successfully.");
    }
    catch (err) {
        res.send({error:err.message});
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
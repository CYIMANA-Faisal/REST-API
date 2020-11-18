
const { response } = require('express');
const express = require('express');
const Article = require('../models/article');
const router = express.Router();


// Get the articles
router.get('/blogs',async (req, res) => {
    const articles = await Article.find({});
    try{
        res.send(articles);
    }
    catch(error){
        res.status(500).send(error);
    }
});
// create the article
router.post('/blog', (req, res) => {
    Article.create(req.body).then((article) => {
        res.send(article);
    })
});
// Update the article.
router.put('/blog/:id', async (req, res) => {
    try {
        await Article.findByIdAndUpdate(req.params.id, req.body)
        await Article.save()
        res.status(200).send('The article was updated successfully')
    } catch (err) {
        res.status(500).send(err)
    }
});
// Delete the article
router.delete('/blog/:id', async (req, res) => {
    try{
        const article = await Article.findByIdAndDelete(req.params.id)
        if (!article) res.status(404).send("No article found");
        res.status(200).send("Article deleted successfully.");
    }
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
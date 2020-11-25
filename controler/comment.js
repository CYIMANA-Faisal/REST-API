const { request } = require('express')
const Comment = require('../models/comment')

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({commentID: req.params.id})
        res.send(comments)
    } catch (err) {
        res.send({error: err.message})
    }
}

const postComment = async (req, res) => {
    try {
        req.body.commentID = req.params.id
        const comment = await Comment.create(req.body)
        res.send('comment added')
    } catch (err) {
        res.send({error: err.message});
    }
}


module.exports = {
    getComments,
    postComment
}
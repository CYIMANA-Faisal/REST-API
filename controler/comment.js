const { request } = require('express')
const Comment = require('../models/comment')

const getComments = async (req, res) => {
        const comments = await Comment.find({commentID: req.params.id})
        res.status(200).send(comments)
}

const postComment = async (req, res) => {
    try {
        req.body.commentID = req.params.id
        const comment = await Comment.create(req.body)
        res.status(200).json({message:'comment added'})
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    getComments,
    postComment
}
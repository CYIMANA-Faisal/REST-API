const express = require('express');
const router = express.Router();
const {
    getComments,
    postComment
} = require('../controler/comment');
const { route } = require('./articles');

router.get('/:id', getComments)
router.post('/:id', postComment)

module.exports = router
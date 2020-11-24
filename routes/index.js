const express = require('express');
const router = express.Router();
const articleRoute = require('./articles');
const commentRoute = require('./comment')
const messageRoute = require('./message')
const subscribeRoute = require('./subscriber')

router.use('/articles', articleRoute)
router.use('/comment', commentRoute)
router.use('/message', messageRoute)
router.use('/subscribe', subscribeRoute)
module.exports = router;
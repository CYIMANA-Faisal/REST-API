const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware')
const {
    createMessage,
    getMessages,
    getMessage,
    deleteMessage
} = require('../controler/message');


router.get('/', getMessages);
router.get('/:id', getMessage)
router.post('/', createMessage);
router.delete('/:id', deleteMessage);

module.exports = router;

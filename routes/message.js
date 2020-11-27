const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware')
const {
    createMessage,
    getMessages,
    getMessage,
    deleteMessage
} = require('../controler/message');
const auth = require('../middlewares/authMiddleware');

router.get('/', getMessages);
router.get('/:id',auth, getMessage)
router.post('/', createMessage);
router.delete('/:id',auth, deleteMessage);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    signup, 
    signin
} = require('../controler/user');

router.post('/signup', signup);
router.get('/signin', signin)

module.exports = router;
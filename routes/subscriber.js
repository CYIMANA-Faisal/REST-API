const express = require('express')
const router = express.Router()
const subscribe = require('../controler/subscriber')

router.post('/', subscribe);

module.exports = router
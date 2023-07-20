const express = require('express')
const router = express.Router()
const resetController = require('../controllers/resetController')

router.post('/set_link_password', resetController.setPasswordLink)

router.post('/set_password_nolink',resetController.setPassword)

module.exports = router
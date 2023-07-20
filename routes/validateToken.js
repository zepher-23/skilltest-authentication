const express = require('express')
const router = express.Router()
const mailController = require('../controllers/mailController')

router.get('/', mailController.validateToken)



module.exports = router
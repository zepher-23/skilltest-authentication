const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
   res.render('ForgotPassword')
    console.log('forgot password')
})


module.exports = router
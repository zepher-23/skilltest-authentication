const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
   res.render('ResetPassword')
    console.log('reset password')
})


module.exports = router
const express = require('express')
const router = express.Router()
const Auth = require('../controllers/authenticate')
const resetController = require('../controllers/resetController')


router.post('/fp_reset_link', resetController.sendLink);


router.get('/', Auth.auth, (req, res) => {
   res.render('ResetPassword')
    console.log('Session created', req.session)
})



router.get('/new_password',Auth.auth, (req, res) => {
    res.render('NewPassword')
})


module.exports = router


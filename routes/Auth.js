const express = require('express');
const router = express.Router();
const Authenticate = require('../controllers/authenticate')


router.post('/signin', Authenticate.auth);


router.get('/google', Authenticate.googleAuth)

router.get('/google/callback',Authenticate.googleCallback)

module.exports = router;



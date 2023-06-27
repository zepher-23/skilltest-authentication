const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
   res.render('Home')
    console.log('home')
})


module.exports = router
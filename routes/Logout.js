const express = require('express')
const Router = express.Router()


Router.get('/', (req, res) => {
    delete req.session.user;
    req.session.notification = {
        type: 'success',
        message:'Logged out!'
    }
    console.log('session destroyed', req.session)
    res.redirect('/');
})





module.exports = Router
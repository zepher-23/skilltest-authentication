const User = require('../models/User')

const signup = (req, res) => {
    const { email, password } = req.body;
    const saveUser = new User({ email, password })
    saveUser.save().then(() => {
        console.log('user saved')
    })
        .catch(err => {
        console.log('Error saving user:',err)
    })
}
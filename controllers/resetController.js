const userController = require('./userController')
const mailController = require('./mailController')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const sendLink = async (req, res) => {
    const { email } = req.body
    console.log(email)
    console.log(await userController.checkUser(email));

    if (await userController.checkUser(email)) {
        console.log(email)
        const user =await User.findOne({ email})
        console.log("user Id: ",user._id)
        mailController.sendMail(user)
        res.session.notification = {
          type: 'success',
          message: 'Mail sent. Follow instructions in the mail.',
        };
       res.redirect('/')
    }
    else {
        res.session.notification = {
            type: 'error',
                message:'User not found!'
        }
        res.redirect('/forgot')
    }
    
}

const setPasswordLink = async (req, res) => {
    const {user,password} = req.body

    User.updateOne({ 'email': user }, { 'password': password }).then(() => {
        console.log('password updated')
         res.session.notification = {
           type: 'success',
           message: 'Password updated. Sign In',
         };
        res.redirect('/')
    }).catch(err => {
        console.log(err)
         res.session.notification = {
           type: 'error',
           message: 'Error updating password. Try again!',
        };
        res.redirect('/')
    })
    
}

const setPassword = async (req, res) => {
    
    console.log(req.session.user)
    const { currentPassword, newPassword } = req.body;
    const user = req.session.user
        //   const hashedPassword = await bcrypt.hash(currentPassword, 10);

    User.findOne({ email: user.email }).then(async userData => {
        const verifyCurrentPassword = await bcrypt.compare(currentPassword, userData.password)
        
        
        if (verifyCurrentPassword) {

            userData.password = newPassword
            userData.save().then(() => {
                console.log('password updated')
                console.log(res.session)
                 res.session.notification = {
                   type: 'success',
                   message: 'Password updated!',
                };
                res.redirect('/')
            }).catch(err => {
                res.send(err+" ERROR SAVING ")
                console.log("ERROR SAVING :",err)
            })
        }
        else {
            console.log('password dont match')
             res.session.notification = {
               type: 'error',
               message: 'Password does not match!',
            };
            res.redirect('/')
        }
        
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
}

module.exports = {sendLink,setPasswordLink,setPassword} 
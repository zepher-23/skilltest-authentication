const User = require('../models/User')
const Authenticate = require('../controllers/authenticate')
const bcrypt = require('bcrypt')

const checkUser = async (email) => {
    let userFound =false
   await User.findOne({email} ).then(async user => {
        if (user)
        {
            console.log("user found")
            userFound = true;
        }
        else
        {
            console.log('user not found');
            userFound = false;
            }
    }).catch(err => {
        console.log(err);
        return false;
    })
    return  userFound;
}

const signup =async (req, res) => {
    const {
      email,
      password,
      'g-recaptcha-response': recaptchaToken,
    } = await req.body;
    const verifyCaptcha =await Authenticate.verifyCaptcha(recaptchaToken)
    console.log(verifyCaptcha)
    if (await checkUser(email)) {
        console.log("user exists")
        
         req.session.notification = {
           type: 'error',
           message: 'User exists! Try signing in.',
         };
        res.redirect('/signup')
    } else {

        if (verifyCaptcha) {
            const saveUser = new User({ email, password })
            saveUser.save().then(() => {
                console.log('user saved')
                 res.session.notification = {
                   type: 'success',
                   message: 'User saved!',
                 };
                res.redirect('/')
                console.log(req.session)

            }).catch(err => {
                console.log('Error saving user:', err)
                res.send(err)
            })
        } else {
             res.session.notification = {
               type: 'error',
               message: ' reCaptcha verification failed!',
             };
            res.redirect('/signup')
        }
    }
   
}

const signin = async (req, res) => {

    const { email, password, 'g-recaptcha-response': recaptchaToken } = req.body
    if (await Authenticate.verifyCaptcha(recaptchaToken)) {
        if (await checkUser(email)) {
            const user = await User.findOne({ email })
            if (await bcrypt.compare(password, user.password)) {
                req.session.user = user;
                console.log(req.session.user)
                res.render('ResetPassword')
            } else {

                req.session.notification = {
                    type: 'error',
                    message:'Wrong Password'
                }
                res.redirect('/')
            }
      } else {
            console.log('user not found, sign up');
            req.session.notification = {
                type: 'error',
                message:'User not found!'
            }
        res.redirect('/signup');
      }
    } else {
        req.session.notification = {
            type: 'error',
            message:'reCaptcha verification failed !'
        }
        res.redirect('/') 
    }
     
}

module.exports = {signup,checkUser,signin}
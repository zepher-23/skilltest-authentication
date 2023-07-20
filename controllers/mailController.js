const nodemailer = require('nodemailer')
const crypto = require('crypto')
const Token = require('../models/Token')
const User = require('../models/User')
const queryString = require('querystring')

const sendMail = async (user) => {
 // Create the transporter using the Ethereal SMTP settings
 const transporter = nodemailer.createTransport({
   host: 'smtp.mailgun.org',
   port: 587,
   
   auth: {
     user: 'postmaster@sandbox7d63cad8d1b34123945c8c363b6a2078.mailgun.org',
     pass: "5c13e5ebe0beb640c063df62d91ae968-262b213e-184d88ac",
   },
 });

 const token = crypto.randomBytes(20).toString('hex');
 const saveToken = new Token({"user":user._id,token});
 saveToken.save().then(() => {
   const resetLink = `http://localhost:4000/validate_token?token=${token}`;

   const mailOptions = {
      from: 'postmaster@sandbox7d63cad8d1b34123945c8c363b6a2078.mailgun.org',
      to: user.email,
      subject: 'Reset password link',
     text: 'Click on the link to reset password' + " Reset: " + resetLink,
      
   };
   
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
       
        console.error('Error:', error);
      } else {
       
        console.log('Email sent:', info);
      }
    });

 });
    

   
}

const validateToken = async (req, res) => {
  const url = req.url
  
  const token = queryString.parse(url.split('?')[1]);
  console.log(token.token)


  
  console.log('token validating')

  Token.findOne({'token':token.token}).then(async token => {
    const user = await User.findById(token.user)
    const userMail = user.email
    res.render('setPassword',{userMail})

  }).catch(err => {
    console.log(err)
    res.send(err)
  })


}

module.exports = {sendMail, validateToken}
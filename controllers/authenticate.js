const axios = require('axios')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const googleUsers = require('../models/GoogleUsers')

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET;

const auth = (req, res,next) => {
  if(req.session.user)
    next();
  else
    res.redirect('/')
}
const user = async (email, password) => {
  const user = await User.finOne({ email })
  
  const userVerified =await bcrypt.compare(password, user.password)
  return userVerified;
}

const verifyCaptcha = async(token) => {
   try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: '6LeEZdImAAAAAL0MfxSjt0Xzbsu-WN9F1jUKtZrl',
          response: token,
        },
      }
     );

    // Check the response from the reCAPTCHA API
    if (response.data.success) {
      // reCAPTCHA verification successful
      return true;
    } else {
      // reCAPTCHA verification failed
      return false
    }
  } catch (error) {
    // Error occurred during reCAPTCHA verification
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

const googleAuth = (req, res) => {

  const origin = 'https://authentication-4bb9.onrender.com';
     const redirectURI ='https://authentication-4bb9.onrender.com/auth/google/callback';
     const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
     const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&scope=${scope}`;



  
     res.redirect(url);

    
}
const googleCallback =async (req, res) => {
    const { code } = req.query
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', client_id);
    params.append('client_secret', client_secret);
    params.append(
      'redirect_uri',
      'https://authentication-4bb9.onrender.com/auth/google/callback'
    );
    params.append('grant_type', 'authorization_code');

    try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', params);
    const accessToken = tokenResponse.data.access_token;

    // Get user profile using access token
    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const user = {
      id: profileResponse.data.id,
      name: profileResponse.data.name,
      email: profileResponse.data.email
        };
        
      console.log(user)

      googleUsers.findOne({ GId: user.id }).then(async gUser => {
        if (!gUser) {
          console.log( gUser)
          const gUsers = new googleUsers({ GId: user.id, email: user.email })
      
      gUsers.save().then(() => {
        console.log('google user saved in db')
      }).catch(err => {
        console.log(err)
      })
        } else {
          console.log('google user is already stored in database')
        }
      })
      
      

    // Store user details in session
      req.session.user = user;
      req.session.notification = {
        type: 'success',
        message:'Signed in from Google'
      }

        res.redirect('/reset')
    } catch (error) {
      console.error('Error:', error.response.data);
      req.session.notification = {
        type: 'error',
        message: 'Error signing in, Try again! ',
      };
    res.redirect('/signin');
  }

  


}




module.exports = {auth,googleAuth,googleCallback,verifyCaptcha,user}
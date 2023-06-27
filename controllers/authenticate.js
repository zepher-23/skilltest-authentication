const axios = require('axios')
const client_id = "226320137550-nahjpluvitclqlsrf2do3ft290u20jn6.apps.googleusercontent.com"
const client_secret = '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';

const auth = (req, res) => {
    res.send("auth")
}


const googleAuth = (req, res) => {
     const redirectURI = 'http://localhost:4000/auth/google/callback';
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
    params.append('redirect_uri', 'http://localhost:4000/auth/google/callback');
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

    // Store user details in session
    req.session.user = user;

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error:', error.response.data);
    res.redirect('/login');
  }



    console.log(code)
    res.send('authenticated by google')
}




module.exports = {auth,googleAuth,googleCallback}
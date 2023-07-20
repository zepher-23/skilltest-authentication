const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const Home = require('./routes/Home')
const ForgotPassword = require('./routes/ForgotPassword')
const ResetPassword = require('./routes/ResetPassword')
const Signin = require('./routes/Signin')
const mime = require('mime')
const flash = require('connect-flash')
const validateToken = require('./routes/validateToken')
const Signup = require('./routes/Signup')
const Auth = require('./routes/Auth')
const Logout = require('./routes/Logout')
const setPassword = require('./routes/setPassword')


const { connectDb } = require('./db')
app.use(flash());




app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());




connectDb()

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.notification = req.session.notification;
  req.session.notification = null;
  next();
});



app.use('/', Home);
app.use('/signup', Signup)
app.use('/signin', Signin)
app.use('/forgot', ForgotPassword)
app.use('/reset', ResetPassword)
app.use('/auth', Auth);
app.use('/logout', Logout)
app.use('/reset/fp_reset_link', ResetPassword);
app.use('/validate_token', validateToken)
app.use('/set_new_password',setPassword)








app.listen(4000, () => {
    console.log("Server listening on port 4000")
})


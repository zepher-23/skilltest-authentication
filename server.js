const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const Home = require('./routes/Home')
const ForgotPassword = require('./routes/ForgotPassword')
const ResetPassword = require('./routes/ResetPassword')
const Signin = require('./routes/Signin')

const Signup = require('./routes/Signup')
const Auth = require('./routes/Auth')


const { connectDb } = require('./db')


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

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


app.use('/', Home);
app.use('/signup', Signup)
app.use('/signin', Signin)
app.use('/forgot', ForgotPassword)
app.use('/reset', ResetPassword)
app.use('/auth', Auth);











app.listen(4000, () => {
    console.log("Server listening on port 4000")
})
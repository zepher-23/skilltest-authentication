NOTE:

1. The .env file is not included in the git commits. You might encounter errors if you try to run it without the keys.
2. The project is hosted on a free hosting platform `render.com`
3. Password reset link will be stored in spam folder in some cases, please check and continue.


This is a portable authenticator webapp, you can sign up and sign in through name and password alternatively you can sign in using google.
If you forgot your password you can request for a reset link using the forgot password link.
Once logged in you can reset your password using the reset button

## RUNNING THIS PROJECT

1. Clone the project from `github` using this link `https://github.com/zepher-23/skilltest-authentication.git`
2. After cloning navigate into the project folder and run `npm install`
3. Then `npm start`

Both the server and front end are set up to automatically reload when changes are made to the code using libraries.

Database connection is handled from `db.js` file.

## USING THE WEB APP

Once the web app is up and running on your localhost, you can sign in or sign up
On successful sign up you will see a notification for the same , and for sign in too.
When signing in or signing up you will be prompted to provide verification for reCaptcha.

After sign up your data will be stored in database
When signing in, your password is compared to the one in database using `bcrypt`.
After sign in you will see a reset button and logout button.
The express-session module will handle the session for the user and store user specific data in the session object.

When signed in with google, user data received from google will be stored in the database along with the user id from google.
When logged out the session is destroyed.

When requesting for a reset password link, you will receive a link to reset your password on your login mail id.
CHECK SPAM FOLDER IN CASE YOU DON'T FIND IT IN THE INBOX.

-----------------------------------------------------------------------------------------------------------------------------------
The app is hosted on `https://authentication-4bb9.onrender.com`
It will take few seconds to load as it is a free hosting service.

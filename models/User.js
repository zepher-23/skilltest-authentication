const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
  password: {
      type: String,
      required: true
    }
});

// Hash password before storing in database
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});
 
const User = mongoose.model('User', userSchema);

module.exports = User;

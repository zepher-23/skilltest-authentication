const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  token: {type: String},
  expireAt: {
    type: Date,
    required: true,
    default: () => new Date((Date.now() + 60 * 60 * 1000)).toISOString(), // Set expiry time to 1 hour from now
  },
});

const Token = mongoose.model("Token", tokenSchema)

module.exports = Token
const mongoose = require('mongoose');
const url =
  'mongodb+srv://auth2:erINp3lhkFOjf1g8@cluster0.nmn5cih.mongodb.net/?retryWrites=true&w=majority';

const connectDb = async () => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to mongodb');
  } catch (err) {
    console.error('Error connecting to Mongodb', err);
  }
};

module.exports = {connectDb};

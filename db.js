const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/auth"

const connectDb = async () => {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to mongodb")
    } catch (err) {
        console.error('Error connecting to Mongodb',err)
        
        
    }    
}

module.exports = { connectDb}
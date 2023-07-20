const mongoose = require('mongoose')

const GUserSchema = new mongoose.Schema({
    GId:{type:String,required:true},
    email: { type: String, required: true }
    
})

const GUsers = mongoose.model('GUsers', GUserSchema)

module.exports = GUsers
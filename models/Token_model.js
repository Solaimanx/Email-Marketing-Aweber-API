const mongoose = require('mongoose')

const tokensSchema = new mongoose.Schema({
    accessToken : {
        type: String,
        required: true
    }
})



mongoose.model('token', tokensSchema)
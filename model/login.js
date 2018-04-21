var mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true
    },
    password : String
})

mongoose.model('Login', loginSchema);

module.exports = mongoose.model('Login');
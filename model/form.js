var mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
    fname : String,
    lname: String,
    email : {
        type : String,
        unique : true
    },
    phone : Number,
    address : String,
    city : String,
    postal : String,
    country : String,
    Comments : String
})

mongoose.model('Form', formSchema);

module.exports = mongoose.model('Form');
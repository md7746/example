const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const users = mongoose.model('users',userSchema);

module.exports = users;
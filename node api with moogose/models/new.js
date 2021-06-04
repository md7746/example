const mongoose = require('mongoose');
const schema = mongoose.Schema;

const newSchema = new schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const news = mongoose.model('news',newSchema);

module.exports = news;
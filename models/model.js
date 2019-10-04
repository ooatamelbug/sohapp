var mongoose = require('mongoose');

mongoose.Promise = global.Promise;



mongoose.connect('mongodb://localhost:27017/shoapp',{ useNewUrlParser: true });

//var Schema = mongoose.Schema;

var newSchema = mongoose.Schema({
    title:String,
    body:String,
    img:String,
    date:Date,
    comments: [{
        name:String,
        email:String,
        textcomment:String,
        datec:Date
    }]
},{collection:'news'});

var news = module.exports = mongoose.model('news',newSchema);
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/shoapp',{ useNewUrlParser : true});

//mongoose.set('useCreateIndex',true);

var newSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    password :{
        type:String,
        bcrypt:true,
        trim:true,
        require:true
    },
    email:{
        type:String,
        require:true,
        trim:true
        //unique:true
    },
    img:String,
    dateReg:Date,
    userGroup:{
        type:Number,
        default:0
    }
},{ collection:'users'});

var usernew = module.exports = mongoose.model('usernew',newSchema);
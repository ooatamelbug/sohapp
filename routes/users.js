var express = require('express');
var router = express.Router();
var multer = require('multer');
//var passport = require('passport');
var bcrypt = require('bcryptjs');
var usernew = require('../models/users.js');
const {check,validationResult} = require('express-validator/check');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

//var upload = multer({ storage: storage }).single('profimg');
var upload = multer({ storage: storage });


/* GET users listing. */
router.get('/regester', (req, res, next) => {
    error = [];
    res.render('regester',{
    title:'Regester',
    errors:error
  });
});


router.post('/regester',[
  check('name1').not().isEmpty().withMessage('fullname is require'),
  check('email1').not().isEmpty().withMessage('email is require'),
  check('email1').isEmail().withMessage('email is not format'),
  check('pass').not().isEmpty().withMessage('password is require'),
  check('repeat_pass','two password is not same').not().custom((value, {req}) => value === req.body.pass)
  ],(req,res,next) =>{

    if(req.body){
      var name = req.body.name1,
          email = req.body.email1,
          password = req.body.pass,
          datec = new Date();
    };

    let error = validationResult(req);

    if(!error.isEmpty()){
      res.render('regester',{
        title:'Regester',
        errors:error.array()
      });
    }else{
      var newuser = new usernew({
        'name':name,
        'email':email,
        'password':password,
        'dateReg':datec
      });

      bcrypt.genSalt(10,(err, salt) =>{
        bcrypt.hash(newuser.password, salt,(err,hash) =>{
          if(err){
            console.log(err);
          }
          newuser.password = hash;
          newuser.save((err) => {
            if(err){
              throw err;    
            }else{
              res.redirect('/users/login');
            }
          })
        })
      });
    }
});
/*
router.post('/login', (req, res, next) => {
  passport.authenticate('local',(err, user, info) =>{
    if(err) {return next(err);}

    if(!user) {return res.redirect('/users/regester');}
    
    req.logIn(user, err => {
      if(err) {return next(err);}
      
      res.redirect('/users/' + user.name);
    });
  })(req, res, next);
});
*/
router.get('/login',(req,res,next) => {
  var errorslogin = [];
  res.render('login',{
    title :'login',
    errorslogin:errorslogin
  })
});

module.exports = router;

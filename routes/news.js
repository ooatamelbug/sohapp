const express = require('express');
const news = require('../models/model.js');
const {check , validationResult} = require('express-validator/check');
const contrl =require('../controller/new');
const router = express.Router();

router.get('/',(req,res,next) =>{
    news.find({}).then((result) =>{
        res.render('news',{
            "title":"News",
            "allnew": result
        });
    });
});

router.get('/fullnew/:id',contrl.getnew);
router.post('/coment',contrl.postnew);
/*
router.post('/coment',[
    check('name','name field cannot empty').not().isEmpty(),
    check('email','email field cannot empty').not().isEmpty(),
    check('email','email field not email').isEmail(),
    check('text1','comment field cannot empty').not().isEmpty()
    ],(req,res,next) =>{
    if(req.body){
        var Name = req.body.name;
        var Email = req.body.email;
        var Comment1 = req.body.text1;
        var Newid = req.body.id;
        var datec = new Date();
    }
    let errors = validationResult(req);
    //var error = errors.mapped();

    if(!errors.isEmpty()){
        news.findOne({ _id:Newid }).then((data) => {
            res.render('fullnew',{
                title:'News',
                fullnew:data,
                errors :errors.array(),
            });
        });
    }else{
        var coment = {"name":Name,"email":Email,"textcomment":Comment1,"datec":datec};
        news.update({"_id":Newid},{ $push: {"comments":coment} },(err,doc) => {
            if (err){
                throw err ;
            }else{
                req.flash('success', 'comment is added');
            console.log(req.flash('success'));
            res.location('/news/fullnew/'+Newid);
                res.redirect('/news/fullnew/'+Newid);
            }
        });
    }
});
*/
module.exports = router;

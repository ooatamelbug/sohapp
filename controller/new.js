const news = require('../models/model.js');

module.exports.getnew = (req,res,next)=>{
    errors1 = [];
    news.findOne({ _id: req.params.id })
    .then((data) => {
        let message = req.flash('success_messages');
        if (message.length > 0) {
          message = message[0];
        } else {
          message = null;
        }
            res.render('fullnew',{
            title:'News',
            fullnew:data,
            errors : errors1,
            message:message
        });
    }).catch(err => console.log(err));
    
}
module.exports.postnew = (req,res,next)=>{
    req.flash('success_messages','reqest');
    var Newid = req.body.id;
    res.redirect('/news/fullnew/'+Newid);
}

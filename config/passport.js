const localStrategy = require('passport-local').Strategy;
const usernew = require('../models/users.js');
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = (passport) =>{
    passport.use(new localStrategy(/*{passReqToCallback:true}*/{usernameField:'email', passwordField:'password'},(email, password, done) => {

        let quer = {email:email};

        usernew.findOne(quer, (err, user) =>{

            if(err) throw err;

            if(!user){
                return done(null, false, {message : 'not user'});
            }

            bcrypt.compare(password, user.password, (err, isMatch) =>{
                if(err) throw err;

                if(isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, {message : 'not password'});
                }
            })
        })
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}

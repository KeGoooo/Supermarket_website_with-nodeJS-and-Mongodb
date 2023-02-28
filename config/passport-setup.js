const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const customer = require('../models/customer')

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    customer.findById(id, function(err, user) {
      done(err, user);
    });
  });
  

  //register customer
  passport.use('local.signup', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,useremail,password, done)=> {
    if (req.body.password != req.body.confirm_password) {
        return done(null, false,console.log("Error: the password not match"))
    }else {
        customer.findOne({email: useremail}, (err,user)=> {
            if(err) {
                return done(err)
            }
            if(user) {
                return done(null, false,console.log('Error email is used'))
            }
            
            if (!user) {
                //create user
                let newUser = new customer()
                newUser.email = req.body.email
                newUser.password = newUser.hashPassword(req.body.password),
                newUser.name = req.body.name,
                newUser.save ((err,user)=> {
                    if(!err) {
                        return done(null, user, console.log('success user added'))
                    } else {
                        console.log(err)
                    }
                })
            }
        })
    }
    
}))


  //login 

  passport.use('local.login', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,useremail,password, done)=> {

    //find user
    customer.findOne({email: useremail}, (err,user)=> {

        if (err) {
            return done(null, false, console.log('somthing is happen'))
        } 
        if(!user) {
            return done(null, false, console.log('user was not found'))
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null,user,console.log('welcome back'))

            } else {
                return done(null,false,console.log('wrong password'))

            }
        }
    })
}))

let express = require('express');
const router=express.Router();
let customer = require('../models/customer');
const passport = require('passport')


//login 
router.get('/login',(req,res)=>{
    res.render('users/login')
})

//login post requist 
router.post('/login',
  passport.authenticate('local.login', {
    successRedirect: '/',
      failureRedirect: '/customer_log/login',
      })
      )

//signup form
router.get('/signup',(req,res)=>{
    res.render('users/signup')

})

//signup post requist
router.post('/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/',
      failureRedirect: '/customer_log/signup',
       })
      )





//logout
router.get('/logout',(req,res)=>{
    req.logOut({keepSessionInfo: false}, (err)=>{
      if(err){
        console.log(err)
      }else {
        res.redirect('/customer_log/login')
      }
      
    })
    
})

module.exports  = router;
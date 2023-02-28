const express=require('express');
const db=require('./config/database.js')
const app=express();
const bodyParser = require('body-parser')
const passport = require('passport')
app.use(express.json());

const session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport-setup')

app.get('*', (req,res,next)=> {
    res.locals.user = req.user || null
    next();
})

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('node_modules'))
app.use(express.static('public'))
app.use(express.static('uploads'))
const product=require('./routers/product')
app.use('/',product);



let customer =require('./routers/customer-router');
app.use('/customer_log',customer)






app.listen(3000);
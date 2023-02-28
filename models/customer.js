const mongoose=require("mongoose")
const bcrypt=require('bcrypt-nodejs')
const customerSchema=mongoose.Schema({
   name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
customerSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

customerSchema.methods.comparePasswords = (password, hash) => {
    return bcrypt.compareSync(password,hash)
}

var customer=mongoose.model('customer',customerSchema,'customer')

module.exports=customer;
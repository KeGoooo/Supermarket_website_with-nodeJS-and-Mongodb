const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({

    pname:{type:String},

    price:{type:String},

    photo:{type:String},

    total: {type:Number}
    
})

let cart=mongoose.model('cart',cartSchema,'cart');
module.exports=cart
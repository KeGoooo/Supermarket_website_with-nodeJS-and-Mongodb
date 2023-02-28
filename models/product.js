const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    idProduct:{type:Number },

    nameProduct:{type:String},

    priceProduct:{type:String},

    photoProduct:{type:String}


    
})

let product=mongoose.model('product',productSchema,'product');
module.exports=product
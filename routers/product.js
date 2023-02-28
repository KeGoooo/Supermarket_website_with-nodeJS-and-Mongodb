const express = require('express');
const router = express.Router()
const Product = require('../models/product')
const cart = require("../models/cart");


router.get('/', (req, res) => {

    Product.find({}, (err, products) => {

        let chunk = []
        let chunkSize = 4
        for (let i = 0; i < products.length; i += chunkSize) {
            chunk.push(products.slice(i, chunkSize + i))
        }

        res.render('customer/terminalpage2', {
            chunk: chunk
        })
    })



})



router.get('/addPage', (req, res) => {

    res.render('admin/addPage')

})


router.post('/create', (req, res) => {

    let newProduct = new Product({
        idProduct: req.body.idProduct,
        nameProduct: req.body.nameProduct,
        priceProduct: req.body.priceProduct,
        photoProduct: req.body.photoProduct
    })

    newProduct.save((err) => {
        if (!err) {
            console.log('product added')
            res.redirect('/')
        } else {
            console.log(err)
        }
    })
})


//update
router.get('/edit/:id', (req, res) => {

    Product.findOne({ _id: req.params.id }, (err, product) => {

        if (!err) {
            res.render('admin/editpage', {
                product: product,
            })

        } else {
            console.log(err)
        }

    })

})

/////////////////////////////////////////////ADD TO CART/////////////////////////////////////////////////////////////////////

// This method to add items to the carts 
router.get('/addtocart/:id', (req, res) => {
    Product.findOne({ _id: req.params.id }, (err, event) => {

        if (!err) {
            let newevent = new cart({
                pname: event.nameProduct,
                price: event.priceProduct,
                photo: event.photoProduct

            })
            


            newevent.save((err) => {
                if (!err) {
                    console.log('Add to cart succfuly')

                } else {
                    console.log(err)
                }
            })

            console.log(newevent)
        } else {
            console.log(err)
        }

    })


})
// this method is to view the cart 
router.get('/viewcart', (req, res) => {
    cart.find({}, (err, cart) => {

        let chunk = []
        let chunkSize = 4
        for (let i = 0; i < cart.length; i += chunkSize) {
            chunk.push(cart.slice(i, chunkSize + i))
        }

        res.render('customer/viewcart', {
            chunk: chunk
        })
    })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/update', (req, res) => {

    let newupdate = {
        idProduct: req.body.idProduct,
        nameProduct: req.body.nameProduct,
        priceProduct: req.body.priceProduct,
        photoProduct: req.body.photoProduct
    }

    let query = { _id: req.body.id }
    Product.updateOne(query, newupdate, (err) => {
        if (!err) {
            console.log('product updated')
            res.redirect('/')
        } else {
            console.log(err)
        }
    })
})
///////////////////////////////////DELETE FROM CART////////////////////////////////////////////
// this method to delete from the carts
router.get('/deletefromcart/:id', (req, res) => {

    let query = { _id: req.params.id }

    cart.deleteOne(query, (err) => {

        if (!err) {
            res.redirect('/viewcart')
            console.log("the elmente deleteed from the cart")
        } else {
            res.status(404).json('There was an error .event was not deleted')
        }
    })
})
///////////////////////////////////SEARCH// saerchitem //////////////////////////////////////////
router.post('/search', (req, res) => {


    let query = req.body.searchname;
    //console.log("the query looking for "+query);
    Product.findOne({ nameProduct: query }, (err, item) => {
        console.log("You are searching for.. " + item);

        res.render('customer/saerchitem', {
            item : item
        })
    })

})




router.get('/delete/:id', (req, res) => {

    let query = { _id: req.params.id }

    Product.deleteOne(query, (err) => {

        if (!err) {
            res.redirect('/')
        } else {
            res.status(404).json('There was an error .event was not deleted')
        }
    })
})

module.exports = router;
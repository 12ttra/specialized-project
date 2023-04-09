const express = require('express');
const router = express.Router();

router.use('/cart',(req, res)=>{
    res.render('pages/cart');
})

app.use('/address',(req, res)=>{
    res.render('pages/checkout');
})

app.use('/payment',(req, res)=>{
    res.render('pages/payment');
})
module.exports = router;
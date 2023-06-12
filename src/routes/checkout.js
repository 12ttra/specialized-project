const express = require('express');
const route = require('.');
const router = express.Router();


router.use('/cart',(req, res)=>{
    res.render('pages/cart');
})

router.use('/address',(req, res)=>{
    res.render('pages/checkout');
})
router.use('/payment',(req, res)=>{
    res.render('pages/payment');
})
router.use('/successed',(req, res)=>{
    res.render('pages/successed');
})


module.exports = router;
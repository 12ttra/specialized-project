const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');

router.use('/view/:id',(req, res)=>{
    res.render('pages/sellpage');
})

module.exports = router;
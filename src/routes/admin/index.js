const express = require('express');
const router = express.Router();


router.use('/dashboard',(req, res)=>{
    res.render('admin/dashboard', { title: 'Dashboard', layout: 'admin' });
})



module.exports = router
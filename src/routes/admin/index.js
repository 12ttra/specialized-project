const express = require("express");
const router = express.Router();
const adminController = require("../../controller/AdminController");
const { loginCheck, isAuth, isAdmin } = require("../../middleware/auth_middleware");
const { accessLevelVerifier, isAdminVerifier } = require('../../middleware/auth_middleware');

router.use('/dashboard',(req, res)=>{
    res.render('admin/dashboard', { title: 'Dashboard', layout: 'admin' });
})

router.get('/newproduct',(req, res)=>{
    res.render('admin/newproduct',{ title: 'Dashboard', layout: 'admin' });
})
router.get('/newcategory',(req, res)=>{
    res.render('admin/newcategory',{ title: 'New Category', layout: 'admin' });
})
router.get('/category-grid',(req, res)=>{
    res.render('admin/category-grid',{ title: 'grid Category', layout: 'admin' });
})
router.get('/product-grid',(req, res)=>{
    res.render('admin/product-grid',{ title: 'edit product', layout: 'admin' });
})
router.get('/seller-grid',(req, res)=>{
    res.render('admin/seller-grid',{ title: 'edit product', layout: 'admin' });
})
router.get('/invoice-grid',(req, res)=>{
    res.render('admin/invoice-grid',{ title: 'edit product', layout: 'admin' });
})
router.get('/order-grid',(req, res)=>{
    res.render('admin/order-grid',{ title: 'edit product', layout: 'admin' });
})
router.get('/shipment-grid',(req, res)=>{
    res.render('admin/shipment-grid',{ title: 'edit product', layout: 'admin' });
})
router.get('/updateproduct',(req, res)=>{
    res.render('admin/updateproduct',{ title: 'edit product', layout: 'admin' });
})
 
router.get('/customer-grid',(req, res)=>{
    res.render('admin/customer-grid',{ title: 'edit product', layout: 'admin' });
})

router.post("/isadmin", adminController.isAdmin);
router.post("/user", function(req, res){
    loginCheck, isAuth, isAdmin, adminController.allUser
});
router.get('/', function(req, res){
    isAdminVerifier, adminController.get_users
});
router.get('/:id', function(req, res){
    isAdminVerifier, adminController.get_user
});
router.get('/stats', function(req, res){
    isAdminVerifier, adminController.get_stats
});
router.put('/:id', function(req, res){
    accessLevelVerifier, adminController.update_user
});
router.delete('/:id', function(req, res){
    isAdminVerifier, adminController.delete_user
});

module.exports = router;

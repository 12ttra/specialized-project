const express = require("express");
const router = express.Router();
const adminController = require("/Visual Studio Code/-n-chuy-n-ng-nh/src/controller/AdminController");
const { loginCheck, isAuth, isAdmin } = require("/Visual Studio Code/-n-chuy-n-ng-nh/src/middleware/auth_middleware");
const { accessLevelVerifier, isAdminVerifier } = require('/Visual Studio Code/-n-chuy-n-ng-nh/src/middleware/auth_middleware');

router.use('/dashboard',(req, res)=>{
    res.render('admin/dashboard', { title: 'Dashboard', layout: 'admin' });
})

router.get('/newproduct',(req, res)=>{
    res.render('admin/newproduct',{ title: 'Dashboard', layout: 'admin' });
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
const express = require("express");
const router = express.Router();
const adminController = require("../../controller/AdminController");
const { loginCheck, isAuth, isAdmin } = require("../../middleware/auth_middleware");
const { accessLevelVerifier, isAdminVerifier } = require('../../middlewares/verifyToken');

router.use('/dashboard',(req, res)=>{
    res.render('admin/dashboard', { title: 'Dashboard', layout: 'admin' });
})

router.get('/newproduct',(req, res)=>{
    res.render('admin/newproduct',{ title: 'Dashboard', layout: 'admin' });
})

router.post("/isadmin", adminController.isAdmin);
router.post("/user", loginCheck, isAuth, isAdmin, adminController.allUser);
router.get('/', isAdminVerifier, adminController.get_users);
router.get('/:id', isAdminVerifier, adminController.get_user);
router.get('/stats', isAdminVerifier, adminController.get_stats);
router.put('/:id', accessLevelVerifier, adminController.update_user);
router.delete('/:id', isAdminVerifier, adminController.delete_user);

module.exports = router;
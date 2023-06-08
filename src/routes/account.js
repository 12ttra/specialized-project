const express = require('express');
const router = express.Router();
const accountController = require("../controller/AccountController");
const shopController = require("../controller/ShopController");


router.post('/login', accountController.logIn)
router.post('/register',accountController.signUp)
router.get('/information',accountController.information)
router.get('/register-store', accountController.store)
router.get('/login', accountController.getLogIn)
router.get('/register',accountController.getSignUp)
router.get('/myshop',shopController.index)
module.exports = router;
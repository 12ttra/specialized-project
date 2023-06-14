const express = require('express');
const router = express.Router();
const accountController = require("../controller/AccountController");

router.post('/login', accountController.postSignin)
router.post('/register-post',accountController.postSignup)
router.get('/information',accountController.information)
router.get('/register-store', accountController.store)
router.get('/login', accountController.getLogIn)
router.get('/register',accountController.getSignUp)
module.exports = router;


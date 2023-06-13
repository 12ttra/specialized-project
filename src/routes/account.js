const express = require('express');
const router = express.Router();
const accountController = require("../controller/AccountController");

router.post('/login', accountController.logIn)
router.post('/register-post',accountController.signUp)
router.get('/information',accountController.information)
router.get('/register-store', accountController.store)
router.get('/login', accountController.getLogIn)
router.get('/register',accountController.getSignUp)
module.exports = router;
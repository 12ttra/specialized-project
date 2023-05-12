const express = require('express');
const router = express.Router();
const accountController = require("../controller/AccountController");

router.post('/login', accountController.logIn)
router.post('/register',accountController.signUp)
router.get('/information',accountController.information)
router.get('/register-store', accountController.store)

module.exports = router;
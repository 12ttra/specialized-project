const express = require('express');
const router = express.Router();
const accountController = require("../controller/AccountController");

router.post('/login', accountController.logIn)
router.post('/register',accountController.signUp)
//router.post('/information',AccountControler.information)




module.exports = router;
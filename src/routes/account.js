const express = require('express');
const router = express.Router();
const accountController = require("../controller/AccountController");
const accountControlers = require("../app/controllers/AccountController");

router.post('/login', accountController.logIn)
router.post('/register',accountController.signUp)
router.get('/information',accountControlers.information)
router.get('/register-store', accountControlers.store)




module.exports = router;
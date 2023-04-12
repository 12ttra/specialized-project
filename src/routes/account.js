const express = require('express');
const router = express.Router();
const AccountControler = require("../controller/AccountController");

router.post('/login', AccountControler.login)
router.post('/register',AccountControler.register)
router.post('/information',AccountControler.information)


module.exports = router;
const express = require('express');
const router = express.Router();
const accountControler = require("../app/controllers/AccountController");

router.use('/login', accountControler.login)
router.use('/register',accountControler.register)
router.use('/information',accountControler.information)
router.use('/register-store', accountControler.store)




module.exports = router;
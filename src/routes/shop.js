const express = require('express');
const router = express.Router();
const shopController = require("../controller/ShopController");

router.post('/shop/signup',shopController.signUp)


module.exports = router;
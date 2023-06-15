const express = require('express');
const router = express.Router();
const shopController = require("../controller/ShopController");

//signUp
router.post('/signup',shopController.signUp)
router.use('/myshop',shopController.index)

module.exports = router;
const express = require('express');
const router = express.Router();
const shopController = require("../controller/ShopController");

//signUp
router.post('/myshop/signup',shopController.signUp)
router.post('/myshop',shopController.index)

module.exports = router;
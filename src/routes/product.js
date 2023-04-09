const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');

router.use('/view/:id', productController.detail);
module.exports = router;
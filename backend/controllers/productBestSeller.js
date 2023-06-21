const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// Get all products   =>   /api/v1/products/best-seller?best_seleer=1
exports.getBestSeller = catchAsyncErrors(async (req, res, next) => {

    let products = await Product.find(
        { best_seller: 1 }
    ).limit(20);

    return res.status(200).json({
        success: true,
        products
    })

})
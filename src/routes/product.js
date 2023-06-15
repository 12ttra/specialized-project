const express = require("express");
const router = express.Router();
const productController = require("../controller/ProductController");
const auth = require("../middleware/auth_middleware");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images/image-product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
})

const upload = multer({ storage: storage });

router.get("/all-product", function(req, res){
  productController.getAllProduct});
router.post("/product-by-category", function(req, res){
  productController.getProductByCategory});
router.post("/product-by-price", function(req, res){
  productController.getProductByPrice});
router.post("/wish-product", function(req, res){
  productController.getWishProduct});
router.post("/cart-product", function(req, res){
  productController.getCartProduct});

router.post("/add-product", function(req, res){
  upload.any(), productController.postAddProduct});
router.post("/edit-product", function(req, res){
  upload.any(), productController.postEditProduct});
router.post("/delete-product", function(req, res){
  productController.getDeleteProduct});
router.post("/single-product", function(req, res){
  productController.getSingleProduct});

router.post("/add-review", function(req, res){
  productController.postAddReview});
router.post("/delete-review", function(req, res){
  productController.deleteReview});

module.exports = router;




router.use('/view/:id', (req,res)=>{
  return res.render('pages/productif');
});

// router
//   .use(auth)
//   .route("/product/:id")
//   .get(productController.getOneProduct)
//   .patch(productController.patchOneProduct)
//   .delete(productController.deleteOneProduct);

// router
//   .use(auth)
//   .route("/product")
//   .get(productController.getAllProducts)
//   .post(productController.createOneProduct);
const express = require("express");
const router = express.Router();
const cartController = require("../controller/CartController");
const auth = require("../middleware/auth_middleware");

router.use('/cart',(req, res)=>{
    res.render('pages/cart');
})

router.use('/address',(req, res)=>{
    res.render('pages/checkout');
})
router.use('/payment',(req, res)=>{
    res.render('pages/payment');
})
router
  .use(auth)
  .route("/:id")
  .get(cartController.getOne)
  .post(cartController.addOne);

module.exports = router;

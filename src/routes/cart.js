const express = require("express");
const router = express.Router();
const cartController = require("../controller/CartController");
const auth = require("../middleware/auth_middleware");
router
  .use(auth)
  .route("/add-to-cart/:id")
  .get(cartController.getOne)
  //.post(cartController.addOne);

router
  .use(auth)
  .route("/reduce/:id")
  .get(cartController.reduce);

router
  .use(auth)
  .route("/removeAll/:id")
  .get(cartController.remove)


module.exports = router;

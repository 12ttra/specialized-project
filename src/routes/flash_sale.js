const express = require("express");
const router = express.Router();
const categoryController = require("../controller/FlashSaleController");
const auth = require("../middleware/auth_middleware");

router
  .use(auth)
  .route("/")
  .get(categoryController.getAllFalshProducts);

router
  .use(auth)
  .route("/:id")
  .get(categoryController.getOneFlashProduct);

module.exports = router;

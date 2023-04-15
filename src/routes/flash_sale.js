const express = require("express");
const router = express.Router();
const flashSaleController = require("../controller/FlashSaleController");
const auth = require("../middleware/auth_middleware");

router
  .use(auth)
  .route("/")
  .get(flashSaleController.getAllFalshProducts);

router
  .use(auth)
  .route("/:id")
  .get(flashSaleController.getOneFlashProduct);

module.exports = router;

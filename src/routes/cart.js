const express = require("express");
const router = express.Router();
const cartController = require("../controller/CartController");
const auth = require("../middleware/auth_middleware");
router
  .use(auth)
  .route("/:id")
  .get(cartController.getOne)
  .post(cartController.addOne);

module.exports = router;

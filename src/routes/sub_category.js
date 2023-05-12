const express = require("express");
const router = express.Router();
const subCategoryController = require("../controller/SubCategoryController");
const auth = require("../middleware/auth_middleware");

router
  .use(auth)
  .route("/")
  .get(subCategoryController.getAllSubCategories);

router
  .use(auth)
  .route("/:id")
  .get(subCategoryController.getOneSubCategory);

module.exports = router;

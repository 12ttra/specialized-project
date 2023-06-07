const express = require("express");
const router = express.Router();
const categoryController = require("../controller/CategoryController");
const auth = require("../middleware/auth_middleware");

router.use('/view/:id',(req, res)=>{
  res.render('pages/sellpage');
})

router
  .use(auth)
  .route("/:id")
  .get(categoryController.getOneCategory);

router
.use(auth)
.route("/")
.get(categoryController.getAllCategories);

module.exports = router;

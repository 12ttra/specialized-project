const express = require("express");
const router = express.Router();
const categoryController = require("../controller/CategoryController");
const auth = require("../middleware/auth_middleware");
const multer = require("multer");
const { loginCheck } = require("../middleware/auth_middleware");

router.use('/view/:id',(req, res)=>{
  res.render('pages/sellpage');
})

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images/image-category");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-category", categoryController.getAllCategory);
router.post("/add-category", function(req, res){
  loginCheck,
  upload.single("cImage"),
  categoryController.postAddCategory
});
router.post("/edit-category", function(req, res){
  loginCheck, 
  categoryController.postEditCategory
});
router.post("/delete-category", function(req, res){
  loginCheck,
  categoryController.getDeleteCategory
});


module.exports = router;



// router
// .use(auth)
// .route("/:id")
// .get(categoryController.getOneCategory)
// .put(categoryController.postEditCategory)
// .delete(categoryController.getDeleteCategory);

// router
// .use(auth)
// .route("/")
// .get(categoryController.getAllCategory)
// .post(categoryController.createCategory);
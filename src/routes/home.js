const express = require("express");
const fs = require('fs');
const path = require('path')
const router = express.Router();
const homeController = require("../controller/HomepageController");
const multer = require("multer");
const auth = require("../middleware/auth_middleware")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/images', '../public/img_slider');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/get-slide-image", homeController.getImages);
router.post("/delete-slide-image", homeController.deleteSlideImage);
router.post(
  "/upload-slide-image",
  upload.single("image"),
  homeController.uploadSlideImage
);
router.post("/dashboard-data", homeController.getAllData);


router.use('/',(req, res)=>{
    res.render('home');
})
module.exports = router;
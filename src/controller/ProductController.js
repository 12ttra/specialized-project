const { ObjectId } = require("mongodb");
const productModel = require("../model/product_model");
const categories_model = require("../model/category_model");
const flash_sale_model = require("../model/flash_sale_model");
const sub_categories_model = require("../model/sub_category_model");
const fs = require("fs");
const path = require("path");

class ProductController{
  
  // Delete Image from uploads -> products folder
  static deleteImages(images, mode) {
    var basePath =
      path.resolve(__dirname + "../../") + "/public/images/image-product/";
    console.log(basePath);
    for (var i = 0; i < images.length; i++) {
      let filePath = "";
      if (mode == "file") {
        filePath = basePath + `${images[i].filename}`;
      } else {
        filePath = basePath + `${images[i]}`;
      }
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        console.log("Exists image");
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          return err;
        }
      });
    }
  }

  async getAllProduct(req, res) {
    try {
      let Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      if (Products) {
        return res.json({ Products });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddProduct(req, res) {
    let { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } =
      req.body;
    let images = req.files;
    // Validation
    if (
      !pName |
      !pDescription |
      !pPrice |
      !pQuantity |
      !pCategory |
      !pOffer |
      !pStatus
    ) {
      Product.deleteImages(images, "file");
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 3000) {
      Product.deleteImages(images, "file");
      return res.json({
        error: "Name 255 & Description must not be 3000 charecter long",
      });
    }
    // Validate Images
    else if (images.length !== 2) {
      Product.deleteImages(images, "file");
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      try {
        let allImages = [];
        for (const img of images) {
          allImages.push(img.filename);
        }
        let newProduct = new productModel({
          pImages: allImages,
          pName,
          pDescription,
          pPrice,
          pQuantity,
          pCategory,
          pOffer,
          pStatus,
        });
        let save = await newProduct.save();
        if (save) {
          return res.json({ success: "Product created successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditProduct(req, res) {
    let {
      pId,
      pName,
      pDescription,
      pPrice,
      pQuantity,
      pCategory,
      pOffer,
      pStatus,
      pImages,
    } = req.body;
    let editImages = req.files;

    // Validate other fileds
    if (
      !pId |
      !pName |
      !pDescription |
      !pPrice |
      !pQuantity |
      !pCategory |
      !pOffer |
      !pStatus
    ) {
      return res.json({ error: "All filled must be required" });
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({
        error: "Name 255 & Description must not be 3000 charecter long",
      });
    }
    // Validate Update Images
    else if (editImages && editImages.length == 1) {
      Product.deleteImages(editImages, "file");
      return res.json({ error: "Must need to provide 2 images" });
    } else {
      let editData = {
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
      };
      if (editImages.length == 2) {
        let allEditImages = [];
        for (const img of editImages) {
          allEditImages.push(img.filename);
        }
        editData = { ...editData, pImages: allEditImages };
        Product.deleteImages(pImages.split(","), "string");
      }
      try {
        let editProduct = productModel.findByIdAndUpdate(pId, editData);
        editProduct.exec((err) => {
          if (err) console.log(err);
          return res.json({ success: "Product edit successfully" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getDeleteProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteProductObj = await productModel.findById(pId);
        let deleteProduct = await productModel.findByIdAndDelete(pId);
        if (deleteProduct) {
          // Delete Image from uploads -> products folder
          Product.deleteImages(deleteProductObj.pImages, "string");
          return res.json({ success: "Product deleted successfully" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getSingleProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let singleProduct = await productModel
          .findById(pId)
          .populate("pCategory", "cName")
          .populate("pRatingsReviews.user", "name email userImage");
        if (singleProduct) {
          return res.json({ Product: singleProduct });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getProductByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pCategory: catId })
          .populate("pCategory", "cName");
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Search product wrong" });
      }
    }
  }

  async getProductByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let products = await productModel
          .find({ pPrice: { $lt: price } })
          .populate("pCategory", "cName")
          .sort({ pPrice: -1 });
        if (products) {
          return res.json({ Products: products });
        }
      } catch (err) {
        return res.json({ error: "Filter product wrong" });
      }
    }
  }

  async getWishProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let wishProducts = await productModel.find({
          _id: { $in: productArray },
        });
        if (wishProducts) {
          return res.json({ Products: wishProducts });
        }
      } catch (err) {
        return res.json({ error: "Filter product wrong" });
      }
    }
  }

  async getCartProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let cartProducts = await productModel.find({
          _id: { $in: productArray },
        });
        if (cartProducts) {
          return res.json({ Products: cartProducts });
        }
      } catch (err) {
        return res.json({ error: "Cart product wrong" });
      }
    }
  }

  async postAddReview(req, res) {
    let { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      let checkReviewRatingExists = await productModel.findOne({ _id: pId });
      if (checkReviewRatingExists.pRatingsReviews.length > 0) {
        checkReviewRatingExists.pRatingsReviews.map((item) => {
          if (item.user === uId) {
            return res.json({ error: "Your already reviewd the product" });
          } else {
            try {
              let newRatingReview = productModel.findByIdAndUpdate(pId, {
                $push: {
                  pRatingsReviews: {
                    review: review,
                    user: uId,
                    rating: rating,
                  },
                },
              });
              newRatingReview.exec((err, result) => {
                if (err) {
                  console.log(err);
                }
                return res.json({ success: "Thanks for your review" });
              });
            } catch (err) {
              return res.json({ error: "Cart product wrong" });
            }
          }
        });
      } else {
        try {
          let newRatingReview = productModel.findByIdAndUpdate(pId, {
            $push: {
              pRatingsReviews: { review: review, user: uId, rating: rating },
            },
          });
          newRatingReview.exec((err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Thanks for your review" });
          });
        } catch (err) {
          return res.json({ error: "Cart product wrong" });
        }
      }
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body;
    if (!rId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let reviewDelete = productModel.findByIdAndUpdate(pId, {
          $pull: { pRatingsReviews: { _id: rId } },
        });
        reviewDelete.exec((err, result) => {
          if (err) {
            console.log(err);
          }
          return res.json({ success: "Your review is deleted" });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

}

module.exports = new ProductController;








// async getAllProducts(req, res){
  //   try {
  //     const products = await products_model.findAll();
  //     res.json({
  //       success: true,
  //       message: "Successfully found products",
  //       data: products,
  //     });
  //   } catch (error) {
  //     res.status(404).json({ success: false, message: "Something went worng !", data: error });
  //   }
  // };

  // async getOneProduct(req, res){
  //   try {
  //     const _id = ObjectId(req.params.id);
  //     const product = await products_model.findOne({ _id });
  //     res.status(200).send({
  //       success: true,
  //       message: 'Successfully found product',
  //       data: product,
  //     });
  //   } catch (error) {
  //     res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  //   }
  // };

  // async createOneProduct(req, res){
  //   try {
  //    const response = await products_model.create(req.body);
  //     if (req.body.flashsale == "true") {
  //       const teo = await flash_sale_model.find();
  //       if (teo[0]) {
  //         teo[0].productIds.push(response._id);
  //         teo[0].save();
  //       } else {
  //         await flash_sale_model.create({
  //           productIds: response._id
  //         });
  //       }
  //     }
  //     var subCategory = await sub_categories_model.findOne({
  //       subCategary: req.body.subCategary,
  //     });
  //     if (subCategory) {
  //       subCategory.productid.push(response._id);
  //       subCategory.save();
  //     }
  //     else {
  //       subCategory = await sub_categories_model.create({
  //         productid: response._id,
  //         subCategary: response.subCategary,
  //       });
  //     }
  //     const category = await categories_model.findOne({
  //       categary: req.body.categary,
  //     });
  //     if (category) {
  //       const subCategoryItem = category.subCategoryIds.includes(subCategory.id);
  //       if (!subCategoryItem) {
  //         category.subCategoryIds.push(subCategory.id);
  //         category.save();
  //       }
  //     } else {
  //       await categories_model.create({
  //         subCategoryIds: subCategory._id,
  //         categary: response.categary,
  //       });
  //     }
  //     res.status(201).send({
  //       success: true,
  //       message: 'Product created successfully',
  //       data: [],
  //     });
  //     const newproduct= new products_model(req.body);
  //     await newproduct.save();
  //     res.status(201).json(newproduct);
  //   } catch (error) {
  //     res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  //   }
  // };

  // async patchOneProduct(req,res){
  //   try {
  //     const _id = ObjectId(req.params.id);
  //     await products_model.updateOne({ _id }, { $set: req.body });
  //     res.status(200).send({
  //       success: true,
  //       message: 'Successfully product updated',
  //       data: product,
  //     });
  //   } catch (error) {
  //     res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  //   }
  // };

  // async deleteOneProduct(req, res){
  //   try {
  //     const _id = ObjectId(req.params.id);
  //     await products_model.deleteOne({ _id });
  //     res.status(204).send({
  //       success: true,
  //       message: 'Successfully product deleted',
  //       data: product,
  //     });
  //   } catch (error) {
  //     res.status(404).json({ success: false, message: "Something went worng !", data: error.errors });
  //   }
  // }
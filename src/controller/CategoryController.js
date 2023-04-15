const { ObjectId } = require("mongodb");
const categories_model = require("../model/category_model");

class CategoryController{
  async getAllCategories(req, res){
    try {
      const categories = await categories_model.find();
      res.json({
        success: true,
        message: "Successfully found cart categorys",
        data: categories,
      });
      } catch (error) {
        res.status(404).json({ success: false , message: "Something went worng !", data: error });
      }
  };

  async getOneCategory(req, res){
    try {
      const _id = ObjectId(req.params.id);
      const category = await categories_model.findOne({ _id });
      res.json({
        success: true,
        message: "Successfully found cart category",
        data: category,
      });
    } catch (error) {
      res.status(404).json({ success: false , message: "Something went worng !", data: error });
    }
  }
}

module.exports = new CategoryController;



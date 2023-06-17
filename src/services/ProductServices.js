const productModel = require("../model/product_model");

class ProductServices {
    async getAllProduct(cateId){
        let products = [];
        if (!cateId) {
           return products;
        }
        try {
            products = await productModel
                .find({ pCategory: parseInt(cateId) })
                .populate("pCategory");
        } catch (err) {
            console.log(err);
        }
        return products;
    }
}

module.exports = new ProductServices;
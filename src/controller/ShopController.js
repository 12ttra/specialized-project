const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const shop_model = require("../model/shop_model")

class ShopController{
    index(req, res){
        return res.render('pages/myshop', { title: 'My Store' });
      }

    async signUp(name, email, password){
        // try{
        //     // step 1: check mail exists
        //     const holderShop = await shop_model.findOne({ email }).lean()
        //     if(holderShop){
        //         return {
        //             code: 'xxxx',
        //             message: 'Shop already registered!'
        //         }
        //     }
        //     const passwordHash = await bcrypt.hash(password, 10)
        //     const newShop = await shop_model.create({
        //         name, email, password, roles
        //     })
        // }   

    }
}

module.exports = new ShopController;